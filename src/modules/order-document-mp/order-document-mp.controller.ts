import { Controller, Get, Post, Put, Param, Body, HttpStatus, HttpException, UseGuards, Query, ValidationPipe } from '@nestjs/common';
import { OrderDocumentMPService } from './order-document-mp.service';
import { CreateDocumentOrderDto } from './dto/create-order-document.dto';
import { OrderDocumentMP } from './order-document-mp.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { FilterFieldsDto } from './dto/filter-fields.dto';
import { OrderDocumentDto } from './dto/get-order-document.dto';

@Controller('order-documents')
export class OrderDocumentMPController {
    constructor(private readonly orderDocumentService: OrderDocumentMPService) { }

    @UseGuards(JwtAuthGuard)
    @Get('report')
    async getOrdersWithDocuments(
        @Query(new ValidationPipe({ transform: true })) query: FilterFieldsDto
    ): Promise<OrderDocumentDto[]> {
        try {
            return await this.orderDocumentService.getDocumentReport(query);
        } catch (error) {
            throw new HttpException('Error getting orders with documents', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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