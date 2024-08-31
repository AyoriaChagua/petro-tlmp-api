import { Controller, Get, Post, Put, Param, Body, HttpStatus, HttpException } from '@nestjs/common';
import { OrderDocumentMPService } from './order-document-mp.service';
import { CreateDocumentOrderDto } from './dto/create-order-document.dto';
import { OrderDocumentMP } from './order-document-mp.entity';

@Controller('order-documents')
export class OrderDocumentMPController {
    constructor(private readonly orderDocumentService: OrderDocumentMPService) { }

    @Get(':orderDocumentNumber/:companyId')
    async getOrderDocumentById(
        @Param('orderDocumentNumber') orderDocumentNumber: string,
        @Param('companyId') companyId: string
    ): Promise<OrderDocumentMP> {
        try {
            return await this.orderDocumentService.getOrderDocumentById(orderDocumentNumber, companyId);
        } catch (error) {
            if (error.status === HttpStatus.NOT_FOUND) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async createOrderDocument(@Body() createDto: CreateDocumentOrderDto): Promise<OrderDocumentMP> {
        try {
            return await this.orderDocumentService.createOrderDocument(createDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':orderDocumentNumber/:companyId')
    async updateOrderDocument(
        @Param('orderDocumentNumber') orderDocumentNumber: string,
        @Param('companyId') companyId: string,
        @Body() updateDto: Partial<CreateDocumentOrderDto>
    ): Promise<OrderDocumentMP> {
        try {
            return await this.orderDocumentService.updateOrderDocument(orderDocumentNumber, companyId, updateDto);
        } catch (error) {
            if (error.status === HttpStatus.NOT_FOUND) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}