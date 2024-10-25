import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderMP } from './order-mp.entity';
import { CreateOrderMPDto } from './dto/create-order-mp.dto';
import { CorrelativeControlService } from 'src/modules/maintanance/correlative-control/correlative-control.service';
import { DuplicateOrderMPDto } from './dto/duplicate-order-mp.dto';
import { GetFullOrderMPResponseDto } from './dto/get-full-order-mp-respose.dto';
import { UpdateOrderMPDto } from './dto/update-order-mp.dto';
import { GetOrderDocumentDto, OrderDocumentDto, OrderManagement } from './dto/get-order-document.dto';
import { FileMP } from 'src/modules/file-mp/file-mp.entity';
import { OrderDetail } from 'src/modules/order-det-mp/order-det-mp.entity';
import { FieldsManagement, FieldsPDF, FilterFieldsDto } from './dto/filter-fields.dto';
import { PdfService } from '../pdf/pdf.service';
import { Detail, Order } from 'src/shared/interfaces/order.interface';
import { OrderPdfGenerator } from 'src/utils/pdf-generators/order-pdf.generator';
import { AccountTypeEnum, CurrencyEnum, OrderTypeEnum } from 'src/shared/types/order.type';
import { CiaService } from '../cia/cia.service';
import { formatCurrency } from 'src/utils/formatters/currency.formatter';

@Injectable()
export class OrderMPService {
    constructor(
        @InjectRepository(OrderMP)
        private readonly orderMPRepository: Repository<OrderMP>,
        private readonly correlativeControlService: CorrelativeControlService,
        private readonly ciaService: CiaService,
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(FileMP)
        private readonly fileMPRepository: Repository<FileMP>,
        private orderPdfGenerator: OrderPdfGenerator,

    ) { }


    async createPdfInOneFile(query: FieldsPDF): Promise<string[]> {
        const orderSearched = await this.orderMPRepository.findOne({
            where: {
                companyId: query.companyId,
                orderTypeId: query.orderTypeId,
                period: query.period,
                correlative: query.correlative,
            },
            relations: [
                'supplier',
                'supplierAccount',
                'approvalPersonnel',
                'costCenter',
                'resquestingArea',
                'orderDetail'
            ],
        });

        const cia = await this.ciaService.findOne(orderSearched.companyId);

        const order: Order = {
            companyRuc: cia.ruc,
            companyName: cia.description,
            companyAddress: cia.address.description,
            orderType: OrderTypeEnum[query.orderTypeId as keyof typeof OrderTypeEnum],
            orderNumber: orderSearched.correlative,
            date: orderSearched.orderDate.toString(),
            registrationDate: orderSearched.issueDate.toString(),
            approver: orderSearched.approvalPersonnel.description,
            user: orderSearched.systemUser,
            costCenter: orderSearched.costCenter.description,
            paymentMethod: orderSearched.paymentMethod,
            currency: CurrencyEnum[orderSearched.currency?.trim() as keyof typeof CurrencyEnum],
            requestingArea: orderSearched.resquestingArea.description,
            observations: orderSearched.observations,
            automaticSignature: orderSearched.automaticSignature,
            subtotal: orderSearched.subtotal,
            tax: orderSearched.taxCalc,
            perception: orderSearched.perceptionCalc,
            total: orderSearched.total,
            supplier: {
                ruc: orderSearched.providerRuc,
                description: orderSearched.supplier?.description,
                address: orderSearched.supplier?.address
            },
            bank: {
                name: orderSearched.supplierAccount?.bank,
                account: orderSearched.supplierAccount?.accountNumber,
                cci: orderSearched.supplierAccount?.cci,
                accountType: AccountTypeEnum[orderSearched.supplierAccount?.type.trim() as keyof typeof AccountTypeEnum]
            },
            details: orderSearched.orderDetail.map((detail, index) => ({
                numbering: String(index + 1).padStart(2, '0'),
                code: null,
                product: detail.product,
                quantity: detail.quantity,
                unit: detail.measurement,
                price: formatCurrency(detail.unitPrice),
                discount: null,
                amount: formatCurrency(detail.subtotal)
            }))
        };

        return [await this.orderPdfGenerator.generateOrderPdf(order), `${order.orderType} N° ${order.orderNumber}`];
    }



    async getOrdersWithDocuments(filterFields: FilterFieldsDto): Promise<GetOrderDocumentDto[]> {
        const queryBuilder = this.orderMPRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.supplier', 'supplier')
            .leftJoinAndSelect('order.orderDocument', 'orderDocument')
            .leftJoinAndSelect('order.orderPayment', 'orderPayment')
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
                period: order.period,
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
                detraction: order.detraction,
                perception: order.perception,
                detractionCalc: order.detractionCalc,
                perceptionCalc: order.perceptionCalc,
                retention: order.retention,
                tax: order.tax,
                isAffectedIGV: order.isAffectedIGV,
                products: await this.findOrderDetail(order.companyId, order.orderTypeId, order.period, order.correlative),
                documents: await Promise.all((order.orderDocument || []).map(async (document) => {
                    const files = await this.fileMPRepository.find({
                        where: {
                            orderDocumentNumber: document.orderDocumentNumber,
                            companyId: order.companyId
                        },
                        select: ["id", "fileTypeId"]
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
                        otherFile: files.find(f => f.fileTypeId === 'OA'),

                    } as OrderDocumentDto;
                })),
                payments: await Promise.all((order.orderPayment || []).filter(payment => payment.isActive).map(async (payment) => {
                    const paymentFile = await this.fileMPRepository.findOne({
                        where: {
                            paymentId: payment.paymentId,
                        },
                        select: ["id", "fileTypeId"]
                    });
                    return {
                        companyId: payment.companyId,
                        paymentDate: payment.paymentDate,
                        paidAmount: payment.paidAmount,
                        isActive: payment.isActive,
                        paymentFile: paymentFile,
                        paymentId: payment.paymentId,
                        currency: payment.currency
                    }
                }))
            };

            return orderDto;
        }));
        return result;
    }

    async getOrderForManagement(filterFields: FieldsManagement): Promise<OrderManagement[]> {
        try {
            const { companyId, managementType, orderTypeId, period, correlative } = filterFields;

            const queryBuilder = this.orderMPRepository.createQueryBuilder('order')
                .leftJoinAndSelect('order.supplier', 'supplier')
                .where('order.companyId = :companyId', { companyId })
                .andWhere('order.period = :period', { period })
                .andWhere('order.orderTypeId = :orderTypeId', { orderTypeId });

            if (correlative) {
                queryBuilder.andWhere('order.correlative LIKE :correlative', { correlative: `%${correlative}%` });
            }

            if (managementType === 'document') {
                queryBuilder.leftJoinAndSelect('order.orderDocument', 'orderDocument');
            } else if (managementType === 'payment') {
                queryBuilder.leftJoinAndSelect('order.orderPayment', 'orderPayment');
            }

            const orders = await queryBuilder.getMany();

            if (!orders || orders.length === 0) {
                throw new Error('Orders not found');
            }

            const result: OrderManagement[] = orders.map((order) => {
                const baseOrder: OrderManagement = {
                    correlative: order.correlative,
                    providerDescription: order.supplier?.description,
                    providerRuc: order.supplier?.ruc,
                    user: order.systemUser,
                    currency: order.currency,
                    total: order.total,
                };

                if (managementType === 'document') {
                    baseOrder.documents = order.orderDocument?.map((doc) => ({
                        documentNumber: doc.orderDocumentNumber,
                        total: doc.total,
                        annotation: doc.annotation,
                    }));
                }

                if (managementType === 'payment') {
                    baseOrder.payments = order.orderPayment
                        ?.filter((payment) => payment.isActive)
                        .map((payment) => ({
                            payDate: payment.paymentDate,
                            paidAmount: payment.paidAmount,
                            currency: payment.currency,
                        }));
                }

                return baseOrder;
            });

            return result;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Error while getting the orders.');
        }
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
            console.log(error)
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