import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderMP } from './order-mp.entity';
import { CreateOrderMPDto } from './dto/create-order-mp.dto';
import { CorrelativeControlService } from 'src/modules/maintanance/correlative-control/correlative-control.service';
import { DuplicateOrderMPDto } from './dto/duplicate-order-mp.dto';
import { GetFullOrderMPResponseDto } from './dto/get-full-order-mp-respose.dto';
import { UpdateOrderMPDto } from './dto/update-order-mp.dto';
import { GetOrderDocumentDto, OrderDocumentDto } from './dto/get-order-document.dto';
import { FileMP } from 'src/modules/file-mp/file-mp.entity';
import { OrderDetail } from 'src/modules/order-det-mp/order-det-mp.entity';

@Injectable()
export class OrderMPService {
    constructor(
        @InjectRepository(OrderMP)
        private readonly orderMPRepository: Repository<OrderMP>,
        private readonly correlativeControlService: CorrelativeControlService,
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(FileMP)
        private readonly fileMPRepository: Repository<FileMP>
    ) { }


    async findById(companyId: string, orderTypeId: string, period: string, correlative: string): Promise<GetFullOrderMPResponseDto> {
        const order = await this.orderMPRepository.findOne({
            where: {
                companyId,
                orderTypeId,
                period,
                correlative,
            },
            relations: [
                'supplier',
                'supplierAccount',
                'approvalPersonnel',
                'costCenter',
                'resquestingArea',
            ],
        });

        if (!order) {
            throw new NotFoundException(`Order not found with IDs: ${companyId}, ${orderTypeId}, ${period}, ${correlative}`);
        }

        const response: GetFullOrderMPResponseDto = {
            ...order,
            providerDescription: order.supplier?.description || null,
            providerAddress: order.supplier?.address || null,
            supplierAccountBank: order.supplierAccount?.bank || null,
            supplierAccountNumber: order.supplierAccount?.accountNumber || null,
            supplierAccountCII: order.supplierAccount?.cci || null,
            approvalPersonnelDescription: order.approvalPersonnel?.description || null,
            costCenterDescription: order.costCenter?.description || null,
            requestingAreaDescription: order.resquestingArea?.description || null,
        };

        return response;
    }

    async getOrdersWithDocuments(cia: string, period: string): Promise<GetOrderDocumentDto[]> {
        const orders = await this.orderMPRepository.find({
            relations: ['supplier', 'orderDocument', 'orderDocument.documentType'],
            where: { companyId: cia, period }
        });

        const result: GetOrderDocumentDto[] = [];

        for (const order of orders) {
            const orderDto: GetOrderDocumentDto = {
                correlative: order.correlative,
                orderTypeId: order.orderTypeId,
                date: order.date,
                companyId: order.companyId,
                totalAmount: order.totalAmount,
                systemUser: order.systemUser,
                observations: order.observations,
                providerRuc: order.providerRuc,
                providerDescription: order.supplier?.description,
                currency: order.currency,
                totalAmountWithTax: order.totalAmountWithTax,
                products: await this.findOrderDetail(order.companyId, order.orderTypeId, order.period, order.correlative),
                documents: [],
            };
            const documents = order.orderDocument || [];
            for (const document of documents) {
                const files = await this.fileMPRepository.find({
                    where: { orderDocumentNumber: document.orderDocumentNumber, companyId: order.companyId },
                });

                const documentDto: OrderDocumentDto = {
                    orderDocumentNumber: document.orderDocumentNumber,
                    subtotal: document.subtotal,
                    igv: document.igv,
                    total: document.total,
                    cia: document.companyId,
                    correlative: document.correlative,
                    period: document.period,
                    orderTypeId: document.orderTypeId,
                    systemUser: document.systemUser,
                    date: document.date,
                    documentStatusId: document.documentStatus,
                    annotation: document.annotation,
                    sunatCode: document.documentType?.description,
                    invoiceFile: files.find(f => f.fileTypeId === 'AF'),
                    paymentFile: files.find(f => f.fileTypeId === 'AP'),
                    otherFile: files.find(f => f.fileTypeId === 'OA'),
                };

                orderDto.documents.push(documentDto);
            }

            result.push(orderDto);
        }

        return result;
    }


    private async findOrderDetail(cia: string, orderTypeId: string, period: string, correlative: string): Promise<string> {
        const details = await this.orderDetailRepository.find({
            where: {
                cia,
                orderTypeId,
                period,
                correlative,
            },
            select: ['product']
        });
        console.log(details)
        return details.map(det => det.product)?.join(' ||| ');
    }

    async create(createOrderMPDto: CreateOrderMPDto): Promise<OrderMP> {
        try {
            const newOrderMP = this.orderMPRepository.create(createOrderMPDto);

            const savedOrderMP = await this.orderMPRepository.save(newOrderMP);

            if (savedOrderMP) {
                const currentCorrelative = parseInt(createOrderMPDto.correlative, 10);
                const nextCorrelative = (currentCorrelative + 1).toString().padStart(8, '0');
                await this.correlativeControlService.updateCorrelative(
                    createOrderMPDto.companyId,
                    createOrderMPDto.orderTypeId,
                    createOrderMPDto.period,
                    nextCorrelative
                );
            }

            return savedOrderMP;
        } catch (error) {
            if (error.number === 2627 || error.number === 2601) {
                throw new ConflictException('An order with the same primary key already exists.');
            }
            throw new InternalServerErrorException('Error while creating the order.');
        }
    }


    async duplicateOrder(duplicateOrderMPDto: DuplicateOrderMPDto): Promise<OrderMP> {
        const {
            oldCompanyId,
            oldOrderTypeId,
            oldPeriod,
            oldCorrelative,
            newCompanyId,
            newOrderTypeId,
            newPeriod,
        } = duplicateOrderMPDto
        try {
            const originalOrder = await this.orderMPRepository.findOne({
                where: {
                    companyId: oldCompanyId,
                    orderTypeId: oldOrderTypeId,
                    period: oldPeriod,
                    correlative: oldCorrelative
                }
            });
            if (!originalOrder) {
                throw new NotFoundException('Original order not found');
            }
            const nextCorrelative = await this.correlativeControlService.getNextCorrelative(newCompanyId, newOrderTypeId, newPeriod);
            const newOrder = this.orderMPRepository.create({
                ...originalOrder,
                companyId: newCompanyId,
                orderTypeId: newOrderTypeId,
                period: newPeriod,
                correlative: nextCorrelative,
                emissionDate: new Date()
            });
            const saveOrder = await this.orderMPRepository.save(newOrder);
            if(saveOrder) await this.correlativeControlService.updateCorrelative(newCompanyId, newOrderTypeId, newPeriod, nextCorrelative);
            return saveOrder;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            if (error.number === 2627 || error.number === 2601) {
                throw new ConflictException('An order with the same primary key already exists.');
            }
            throw new InternalServerErrorException('Error while duplicating the order.');
        }
    }


    async updateTotal(amount: number, companyId: string, orderTypeId: string, period: string, correlative: string,): Promise<boolean> {
        try {
            const order = await this.orderMPRepository.findOne({
                where: {
                    companyId,
                    orderTypeId,
                    period,
                    correlative,
                },
            });
            if (!order) {
                throw new NotFoundException(`Order not found`);
            }
            order.totalAmount = amount;
            order.totalAmountWithTax = order.taxPercentage === 8.000
                ? amount
                : amount + (amount * (order.taxPercentage / 100));
            await this.orderMPRepository.save(order);
            return true;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error while updating the total amount.');
        }
    }

    async updateOrder(companyId: string, orderTypeId: string, period: string, correlative: string, updateOrderMPDto: UpdateOrderMPDto
    ): Promise<OrderMP> {
        try {
            const order = await this.orderMPRepository.findOne({
                where: {
                    companyId,
                    orderTypeId,
                    period,
                    correlative
                }
            });

            if (!order) {
                throw new NotFoundException('Order not found');
            }

            Object.assign(order, updateOrderMPDto);

            order.modifiedDate = new Date().toISOString();

            const updatedOrder = await this.orderMPRepository.save(order);
            return updatedOrder;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error updating the order');
        }
    }

}