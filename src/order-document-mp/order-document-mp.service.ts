import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDocumentMP } from './order-document-mp.entity';
import { CreateDocumentOrderDto } from './dto/create-order-document.dto';
import { DatabaseErrorService } from 'src/shared/database-error.service';

@Injectable()
export class OrderDocumentMPService {
    constructor(
        @InjectRepository(OrderDocumentMP)
        private orderDocumentRepository: Repository<OrderDocumentMP>,
        private databaseErrorService: DatabaseErrorService,
    ) { }

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
    }

    async createOrderDocument(createDto: CreateDocumentOrderDto): Promise<OrderDocumentMP> {
        try {
            const newOrderDocument = this.orderDocumentRepository.create(createDto);
            return await this.orderDocumentRepository.save(newOrderDocument);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document');
        }
    }

    async updateOrderDocument(
        orderDocumentNumber: string,
        companyId: string,
        updateDto: Partial<CreateDocumentOrderDto>
    ): Promise<OrderDocumentMP> {
        try {
            const result = await this.orderDocumentRepository.update({
                orderDocumentNumber, companyId
            }, updateDto);
            if(result.affected === 0){
                throw new NotFoundException('Order document not found');
            }
            return this.orderDocumentRepository.findOne({
                where: { orderDocumentNumber, companyId }
            });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document');
        }
    }
}