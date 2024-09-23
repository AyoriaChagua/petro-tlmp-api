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
import { PdfService } from '../pdf/pdf.service';
import { Detail, Order } from 'src/shared/interfaces/order.interface';
import { OrderPdfGenerator } from 'src/utils/pdf-generators/order-pdf.generator';

@Injectable()
export class OrderMPService {
    constructor(
        @InjectRepository(OrderMP)
        private readonly orderMPRepository: Repository<OrderMP>,
        private readonly correlativeControlService: CorrelativeControlService,
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(FileMP)
        private readonly fileMPRepository: Repository<FileMP>,
        private orderPdfGenerator: OrderPdfGenerator,

    ) { }


    async createPdfInOneFile(): Promise<string[]> {
        const order: Order =
        {
            companyName: "Tech Solutions Inc.",
            companyAddress: "1234 Silicon Valley, CA",
            orderType: "ORDEN DE COMPRA",
            orderNumber: "00202401",
            date: "2024-09-21",
            registrationDate: "2024-09-20",
            approver: "John Doe",
            user: "Jane Smith",
            costCenter: "Main Warehouse",
            paymentMethod: "Credit Card",
            currency: "USD",
            requestingArea: "IT Department",
            observations: "Urgent order for new servers",
            automaticSignature: true,
            subtotal: 5000,
            tax: 900,
            perception: 0,
            total: 5900,
            supplier: {
                ruc: "12345678901",
                description: "Server Suppliers Inc.",
                address: "5678 Hardware St, CA"
            },
            bank: {
                name: "Bank of America",
                account: "123456789",
                cci: "987654321",
                accountType: "CORRIENTE"
            },
            details: [
                {
                    "numbering": "1",
                    "code": null,
                    "product": "Dell PowerEdge R740",
                    "quantity": 2,
                    "unit": "units",
                    "price": 2500,
                    "discount": null,
                    "amount": 5000
                },
                {
                    "numbering": "2",
                    "code": null,
                    "product": "Financial Audit Q3",
                    "quantity": 1,
                    "unit": "service",
                    "price": 10000,
                    "discount": null,
                    "amount": 10000
                },
                {
                    "numbering": "3",
                    "code": null,
                    "product": "HP ProLiant DL380",
                    "quantity": 3,
                    "unit": "units",
                    "price": 2200,
                    "discount": null,
                    "amount": 6600
                },
                {
                    "numbering": "4",
                    "code": null,
                    "product": "Cisco Catalyst 9300",
                    "quantity": 5,
                    "unit": "units",
                    "price": 1500,
                    "discount": null,
                    "amount": 7500
                },
                {
                    "numbering": "5",
                    "code": null,
                    "product": "Microsoft Office 365 License",
                    "quantity": 10,
                    "unit": "licenses",
                    "price": 200,
                    "discount": null,
                    "amount": 2000
                },
                {
                    "numbering": "6",
                    "code": null,
                    "product": "Annual IT Support",
                    "quantity": 1,
                    "unit": "service",
                    "price": 12000,
                    "discount": null,
                    "amount": 12000
                },
                {
                    "numbering": "7",
                    "code": null,
                    "product": "Firewall Fortinet FG-100E",
                    "quantity": 2,
                    "unit": "units",
                    "price": 1800,
                    "discount": null,
                    "amount": 3600
                },
                {
                    "numbering": "8",
                    "code": null,
                    "product": "Backup Storage 10TB",
                    "quantity": 4,
                    "unit": "units",
                    "price": 500,
                    "discount": null,
                    "amount": 2000
                },
                {
                    "numbering": "9",
                    "code": null,
                    "product": "Lenovo ThinkPad X1 Carbon",
                    "quantity": 6,
                    "unit": "units",
                    "price": 1600,
                    "discount": null,
                    "amount": 9600
                },
                {
                    "numbering": "10",
                    "code": null,
                    "product": "Security Assessment",
                    "quantity": 1,
                    "unit": "service",
                    "price": 5000,
                    "discount": null,
                    "amount": 5000
                },
                {
                    "numbering": "11",
                    "code": null,
                    "product": "Red Hat Enterprise License",
                    "quantity": 4,
                    "unit": "licenses",
                    "price": 800,
                    "discount": null,
                    "amount": 3200
                },
                {
                    "numbering": "12",
                    "code": null,
                    "product": "Rack Server Maintenance",
                    "quantity": 1,
                    "unit": "service",
                    "price": 3500,
                    "discount": null,
                    "amount": 3500
                },
                {
                    "numbering": "13",
                    "code": null,
                    "product": "Apple MacBook Pro 16\"",
                    "quantity": 3,
                    "unit": "units",
                    "price": 2500,
                    "discount": null,
                    "amount": 7500
                },
                {
                    "numbering": "14",
                    "code": null,
                    "product": "Juniper SRX1500 Firewall",
                    "quantity": 2,
                    "unit": "units",
                    "price": 2200,
                    "discount": null,
                    "amount": 4400
                },
                {
                    "numbering": "15",
                    "code": null,
                    "product": "VMware vSphere License",
                    "quantity": 5,
                    "unit": "licenses",
                    "price": 1000,
                    "discount": null,
                    "amount": 5000
                },
                {
                    "numbering": "16",
                    "code": null,
                    "product": "Dell UltraSharp Monitor",
                    "quantity": 8,
                    "unit": "units",
                    "price": 600,
                    "discount": null,
                    "amount": 4800
                },
                {
                    "numbering": "17",
                    "code": null,
                    "product": "Network Security Audit",
                    "quantity": 1,
                    "unit": "service",
                    "price": 8000,
                    "discount": null,
                    "amount": 8000
                },
                {
                    "numbering": "18",
                    "code": null,
                    "product": "Cloud Storage 1TB",
                    "quantity": 20,
                    "unit": "service",
                    "price": 100,
                    "discount": null,
                    "amount": 2000
                },
                {
                    "numbering": "19",
                    "code": null,
                    "product": "HP LaserJet Printer",
                    "quantity": 4,
                    "unit": "units",
                    "price": 400,
                    "discount": null,
                    "amount": 1600
                },
                {
                    "numbering": "20",
                    "code": null,
                    "product": "Data Recovery Service",
                    "quantity": 1,
                    "unit": "service",
                    "price": 1500,
                    "discount": null,
                    "amount": 1500
                },
                {
                    "numbering": "21",
                    "code": null,
                    "product": "Cisco Webex Annual Subscription",
                    "quantity": 10,
                    "unit": "licenses",
                    "price": 120,
                    "discount": null,
                    "amount": 1200
                }
            ]
        };
        return [await this.orderPdfGenerator.generateOrderPdf(order), `${order.orderType} N° ${order.orderNumber}`];
    }


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
            .leftJoinAndSelect('orderDocument.documentPayment', 'documentPayment')
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
                        payments: await Promise.all((document.documentPayment || []).map(async (payment) => {
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
                                orderDocumentNumber: payment.orderDocumentNumber,
                                documentPaymentId: payment.paymentId,
                                paymentFile: paymentFile,
                                paymentId: payment.paymentId,
                                currency: payment.currency
                            }
                        }))
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