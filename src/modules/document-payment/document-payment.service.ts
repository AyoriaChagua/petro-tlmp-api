import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentDocumentMP } from "./document-payment.entity";
import { Repository } from "typeorm";
import { DatabaseErrorService } from "src/shared/database-error.service";
import { CreatePaymentDocumentDto } from "./dto/create-document-payment.dto";

@Injectable()
export class PaymentDocumentService {
    constructor(
        @InjectRepository(PaymentDocumentMP)
        private readonly paymentDocumentRepository: Repository<PaymentDocumentMP>,
        private databaseErrorService: DatabaseErrorService
    ) { }
    async create(createPaymentDocumentDto: CreatePaymentDocumentDto): Promise<PaymentDocumentMP> {
        try {
            const newPaymentDocument = this.paymentDocumentRepository.create({
                ...createPaymentDocumentDto,
                paymentDate: new Date(),
                isActive: true,
                systemDate: new Date()
            });
            return await this.paymentDocumentRepository.save(newPaymentDocument);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
        }
    }

    async findAll(): Promise<PaymentDocumentMP[]> {
        try {
            return await this.paymentDocumentRepository.find({ where: { isActive: true } });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
        }
    }

    async findOne(id: number): Promise<PaymentDocumentMP> {
        try {
            const paymentDocument = await this.paymentDocumentRepository.findOne({ where: { paymentId: id, isActive: true } });
            if (!paymentDocument) {
                throw new NotFoundException(`Payment document with ID ${id} not found`);
            }
            return paymentDocument;
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
        }
    }

    async findByDocument(companyId: string, orderDocumentNumber: string): Promise<PaymentDocumentMP[]> {
        try {
            const paymentDocument = await this.paymentDocumentRepository.find({ where: { companyId, orderDocumentNumber } });
            if (!paymentDocument) {
                throw new NotFoundException(`Payment document for company ${companyId} and document ${orderDocumentNumber} not found`);
            }
            return paymentDocument;
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
        }
    }

    async update(id: number, updatePaymentDocumentDto: Partial<CreatePaymentDocumentDto>): Promise<PaymentDocumentMP> {
        try {
            const paymentDocument = await this.findOne(id);
            Object.assign(paymentDocument, updatePaymentDocumentDto);
            return await this.paymentDocumentRepository.save(paymentDocument);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const paymentDocument = await this.findOne(id);
            paymentDocument.isActive = false;
            await this.paymentDocumentRepository.save(paymentDocument);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Document payment');
        }
    }

}