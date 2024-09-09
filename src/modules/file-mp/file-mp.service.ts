import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileMP } from './file-mp.entity';
import { CreateFileMPDto } from './dto/create-file-mp.dto';
import { PaymentDocumentService } from '../document-payment/document-payment.service';
import { PaymentDocumentMP } from '../document-payment/document-payment.entity';

@Injectable()
export class FileMPService {
    constructor(
        @InjectRepository(FileMP)
        private fileMPRepository: Repository<FileMP>,
        private documentPaymentService: PaymentDocumentService
    ) { }

    async getByOrderDocumentAndCompany(orderDocumentNumber: string, companyId: string): Promise<FileMP[]> {
        const files = await this.fileMPRepository.find({
            where: { orderDocumentNumber, companyId },
            select: ["fileTypeId", "fileName", "id"]
        });
        if (!files.length) {
            throw new NotFoundException('Files not found for this order document');
        }
        return files;
    }

    async getByOrder(correlative: string, orderTypeId: string, period: string, companyId: string): Promise<FileMP[]> {
        const files = await this.fileMPRepository.find({
            where: { correlative, companyId, orderTypeId, period },
            select: ["fileTypeId", "fileName", "id"]
        });
        if (!files.length) {
            throw new NotFoundException('Files not found for this order document');
        }
        return files;
    }

    async getPaymentByDocument(orderDocumentNumber: string, companyId: string): Promise<FileMP[]> {
        const payments = await this.documentPaymentService.findByDocument(companyId, orderDocumentNumber);
        const files = await Promise.all(payments.map(async (payment) => {
            const file = await this.fileMPRepository.findOne({
                where: { paymentId: payment.paymentId },
                select: ["fileTypeId", "fileName", "id"]
            });
            return file
        }));
        if (!files.length) {
            throw new NotFoundException('Files not found for this payment document');
        }
        return files;
        
    }

    async create(createFileMPDto: CreateFileMPDto): Promise<FileMP> {
        const newFile = this.fileMPRepository.create(createFileMPDto);
        return await this.fileMPRepository.save(newFile);
    }

    async checkFileExists(orderDocumentNumber: string, companyId: string, fileTypeId: string): Promise<boolean> {
        const file = await this.fileMPRepository.findOne({
            where: { orderDocumentNumber, companyId, fileTypeId },
        });
        return !!file;
    }

    async getFileById(id: number): Promise<FileMP> {
        const file = await this.fileMPRepository.findOne({ where: { id } });
        if (!file) {
            throw new NotFoundException('Archivo no encontrado');
        }
        return file;
    }

    async deleteFile(id: number): Promise<void> {
        const file = await this.fileMPRepository.findOne({ where: { id } });
        if (!file) {
            throw new NotFoundException('Archivo no encontrado');
        }
        await this.fileMPRepository.remove(file);
    }

}