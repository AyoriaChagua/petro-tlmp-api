import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDocumentMP } from './order-document-mp.entity';
import { CreateDocumentOrderDto } from './dto/create-order-document.dto';
import { DatabaseErrorService } from 'src/shared/database-error.service';
import { FilterFieldsDto } from './dto/filter-fields.dto';
import { OrderDocumentDto } from './dto/get-order-document.dto';
import { OrderDetail } from '../order-det-mp/order-det-mp.entity';

@Injectable()
export class OrderDocumentMPService {
    constructor(
        @InjectRepository(OrderDocumentMP)
        private orderDocumentRepository: Repository<OrderDocumentMP>,
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,
        private databaseErrorService: DatabaseErrorService,
    ) { };

    async getDocumentReport(filterFields: FilterFieldsDto): Promise<OrderDocumentDto[]> {
        try {
            const queryBuilder = this.orderDocumentRepository.createQueryBuilder('orderDocument')
                .leftJoinAndSelect('orderDocument.order', 'order')
                .leftJoinAndSelect('order.supplier', 'supplier')
                .leftJoinAndSelect('order.costCenter', 'costCenter')
                .leftJoinAndSelect('orderDocument.documentType', 'documentType')
                .leftJoinAndSelect('orderDocument.documentPayment', 'documentPayment')
                .andWhere('orderDocument.companyId = :companyId', { companyId: filterFields.companyId })
                .andWhere('orderDocument.date BETWEEN :startDate AND :endDate', {
                    startDate: filterFields.startDate,
                    endDate: filterFields.endDate,
                })

            if (filterFields.documentTypeId) {
                queryBuilder.andWhere('documentType.documentTypeId = :documentTypeId', { documentTypeId: filterFields.documentTypeId });
            };

            if (filterFields.isPettyCash) {
                queryBuilder.andWhere('orderDocument.isPettyCash = :isPettyCash', { isPettyCash: filterFields.isPettyCash });
                console.log(filterFields.isPettyCash)
            };

            if (filterFields.supplierRuc) {
                queryBuilder.andWhere('order.providerRuc = :supplierRuc', { supplierRuc: filterFields.supplierRuc });
            };

            if (filterFields.minAmount) {
                queryBuilder.andWhere('orderDocument.total >= :minAmount', { minAmount: filterFields.minAmount });
            };

            if (filterFields.maxAmount) {
                queryBuilder.andWhere('orderDocument.total <= :maxAmount', { maxAmount: filterFields.maxAmount });
            };

            const documents = await queryBuilder.getMany();
            const result: OrderDocumentDto[] = await Promise.all(documents.map(async document => ({
                currency: document.order.currency,
                providerRuc: document.order.providerRuc,
                providerDescription: document.order.supplier.description,
                costCenterId: document.order.costCenter.id,
                costCenterAlias: document.order.costCenter.aliasReport,
                correlative: document.order.correlative,
                code: document.code,
                observations: document.order.observations,
                chargeDate: document.chargeDate,
                date: document.date,
                total: document.total,
                exchangeRate: document.exchangeRate,
                documentTypeId: document.documentTypeId,
                orderDocumentNumber: document.orderDocumentNumber,
                dueDate: document.dueDate,
                product: await this.findOrderDetail(document.order.companyId, document.order.orderTypeId, document.order.period, document.order.correlative),
                biog: document.biog,
                typeEmission: document.typeEmission,
                annotation: document.annotation,
            })));
            return result;
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document');
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

    async getOrderDocumentById(orderDocumentNumber: string, companyId: string): Promise<OrderDocumentMP> {
        try {
            const orderDocument = await this.orderDocumentRepository.findOne({
                where: { orderDocumentNumber, companyId }
            });

            if (!orderDocument) {
                throw new NotFoundException('Documento de orden no encontrado');
            }

            return orderDocument;
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document');
        }
    };

    async createOrderDocument(createDto: CreateDocumentOrderDto): Promise<OrderDocumentMP> {
        try {
            const newOrderDocument = this.orderDocumentRepository.create(createDto);
            return await this.orderDocumentRepository.save(newOrderDocument);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document');
        }
    };

    async updateOrderDocument(
        orderDocumentNumber: string,
        companyId: string,
        updateDto: Partial<CreateDocumentOrderDto>
    ): Promise<OrderDocumentMP> {
        try {
            const result = await this.orderDocumentRepository.update({
                orderDocumentNumber, companyId
            }, updateDto);
            if (result.affected === 0) {
                throw new NotFoundException('Order document not found');
            }
            return this.orderDocumentRepository.findOne({
                where: { orderDocumentNumber, companyId }
            });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document');
        }
    };
}