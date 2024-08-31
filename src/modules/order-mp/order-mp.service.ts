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
import { FilterFieldsDto } from './dto/filter-fields.dto';

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

    async getOrdersWithDocuments(filterFields: FilterFieldsDto): Promise<GetOrderDocumentDto[]> {
        const queryBuilder = this.orderMPRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.supplier', 'supplier')
            .leftJoinAndSelect('order.orderDocument', 'orderDocument')
            .leftJoinAndSelect('orderDocument.documentType', 'documentType')
            .leftJoinAndSelect('order.costCenter', 'costCenter')
            .where('order.companyId = :companyId', { companyId: filterFields.companyId })
            .andWhere('order.orderDate BETWEEN :startDate AND :endDate', {
                startDate: filterFields.startDate,
                endDate: filterFields.endDate,
            })

        if (filterFields.orderTypeIds && filterFields.orderTypeIds.length > 0) {
            queryBuilder.andWhere('order.orderTypeId IN (:...orderTypeIds)', { orderTypeIds: filterFields.orderTypeIds });
        };

        if (filterFields.documentTypeId) {
            queryBuilder.andWhere('documentType.documentTypeId = :documentTypeId', { documentTypeId: filterFields.documentTypeId });
        };

        if (filterFields.orderNumber) {
            queryBuilder.andWhere('order.correlative = :orderNumber', { orderNumber: filterFields.orderNumber });
        };

        if (filterFields.supplierRuc) {
            queryBuilder.andWhere('order.providerRuc = :supplierRuc', { supplierRuc: filterFields.supplierRuc });
        };

        if (filterFields.minAmount) {
            queryBuilder.andWhere('order.total >= :minAmount', { minAmount: filterFields.minAmount });
        }

        if (filterFields.maxAmount) {
            queryBuilder.andWhere('order.total <= :maxAmount', { maxAmount: filterFields.maxAmount });
        }

        const orders = await queryBuilder.getMany();

        const result: GetOrderDocumentDto[] = await Promise.all(orders.map(async (order) => {
            const orderDto: GetOrderDocumentDto = {
                correlative: order.correlative,
                orderTypeId: order.orderTypeId,
                orderDate: order.orderDate,
                companyId: order.companyId,
                systemUser: order.systemUser,
                observations: order.observations,
                providerRuc: order.providerRuc,
                providerDescription: order.supplier?.description,
                costCenterId: order.costCenter?.id,
                costCenterDescription: order.costCenter?.description,
                costcenterAlias: order.costCenter?.aliasReport,
                currency: order.currency,
                total: order.total,
                products: await this.findOrderDetail(order.companyId, order.orderTypeId, order.period, order.correlative),
                documents: await Promise.all((order.orderDocument || []).map(async (document) => {
                    const files = await this.fileMPRepository.find({
                        where: {
                            orderDocumentNumber: document.orderDocumentNumber,
                            companyId: order.companyId
                        }
                    });

                    return {
                        orderDocumentNumber: document.orderDocumentNumber,
                        subtotal: document.subtotal,
                        total: document.total,
                        cia: document.companyId,
                        correlative: document.correlative,
                        period: document.period,
                        orderTypeId: document.orderTypeId,
                        systemUser: document.systemUser,
                        date: document.date,
                        documentStatus: document.documentStatus,
                        annotation: document.annotation,
                        sunatCode: document.documentType?.sunatCode,
                        retentionCalc: document.retentionCalc,
                        taxCalc: document.taxCalc,
                        invoiceFile: files.find(f => f.fileTypeId === 'AF'),
                        paymentFile: files.find(f => f.fileTypeId === 'AP'),
                        otherFile: files.find(f => f.fileTypeId === 'OA'),
                    } as OrderDocumentDto;
                })),
            };

            return orderDto;
        }));
        return result;
    }


    private async findOrderDetail(companyId: string, orderTypeId: string, period: string, correlative: string): Promise<string> {
        const details = await this.orderDetailRepository.find({
            where: {
                companyId,
                orderTypeId,
                period,
                correlative,
            },
            select: ['product']
        });
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
                issueDate: new Date()
            });
            const saveOrder = await this.orderMPRepository.save(newOrder);
            if (saveOrder) await this.correlativeControlService.updateCorrelative(newCompanyId, newOrderTypeId, newPeriod, nextCorrelative);
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
            order.subtotal = amount;
            order.total = order.tax === 8.000
                ? amount
                : amount + (amount * (order.tax / 100));
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