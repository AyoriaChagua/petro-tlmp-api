import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DatabaseErrorService } from "src/shared/database-error.service";
import { CreateOrderPaymentDto, UpdateOrderPaymentDto } from "./dto/create-order-payment.dto";
import { OrderPayment } from "./order-payment.entity";
import { FieldsSearch } from "./dto/query.dto";

@Injectable()
export class OrderPaymentService {
    constructor(
        @InjectRepository(OrderPayment)
        private readonly orderPaymentRepository: Repository<OrderPayment>,
        private databaseErrorService: DatabaseErrorService
    ) { }
    async create(createOrderPaymentDto: CreateOrderPaymentDto): Promise<OrderPayment> {
        try {
            const newPaymentDocument = this.orderPaymentRepository.create({
                ...createOrderPaymentDto,
                isActive: true,
                systemDate: new Date()
            });
            return await this.orderPaymentRepository.save(newPaymentDocument);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
        }
    }

    async findAll(): Promise<OrderPayment[]> {
        try {
            return await this.orderPaymentRepository.find({ where: { isActive: true } });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
        }
    }

    async findOne(id: number): Promise<OrderPayment> {
        try {
            const orderPayment = await this.orderPaymentRepository.findOne({ where: { paymentId: id, isActive: true } });
            if (!orderPayment) {
                throw new NotFoundException(`Payment document with ID ${id} not found`);
            }
            return orderPayment;
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
        }
    }

    async findByOrder(query: FieldsSearch): Promise<{ paymentId: number; fileId: number }[]> {
        try {
            const { companyId, correlative, orderTypeId, period } = query;
            const results = await this.orderPaymentRepository.find({
                where: { companyId, correlative, orderTypeId, period, isActive: true },
                relations: ['file']
            });
    
            return results.map(payment => ({
                paymentId: payment.paymentId,
                companyId: payment.companyId,
                orderTypeId: payment.orderTypeId,
                period: payment.period,
                correlative: payment.correlative,
                currency: payment.currency,
                paidAmount: payment.paidAmount,
                fileId: payment.file?.id,
                paymentDate: payment.paymentDate,
                systemUser: payment.systemUser.toUpperCase(),
                isActive: payment.isActive
            }));
        } catch (error) {
            console.log(error);
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
            return [];
        }
    }
    

    async update(id: number, updatePaymentDocumentDto: UpdateOrderPaymentDto): Promise<OrderPayment> {
        try {
            const orderPayment = await this.findOne(id);
            Object.assign(orderPayment, updatePaymentDocumentDto);
            return await this.orderPaymentRepository.save(orderPayment);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const orderPayment = await this.findOne(id);
            orderPayment.isActive = false;
            await this.orderPaymentRepository.save(orderPayment);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
        }
    }

}