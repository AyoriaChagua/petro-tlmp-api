import { Controller, Get, Post, Put, Param, Body, UseGuards, HttpException, HttpStatus, Query, ValidationPipe, Res } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OrderMPService } from './order-mp.service';
import { GetFullOrderMPResponseDto } from './dto/get-full-order-mp-respose.dto';
import { GetOrderDocumentDto, OrderManagement } from './dto/get-order-document.dto';
import { CreateOrderMPDto } from './dto/create-order-mp.dto';
import { OrderMP } from './order-mp.entity';
import { DuplicateOrderMPDto } from './dto/duplicate-order-mp.dto';
import { UpdateOrderMPDto } from './dto/update-order-mp.dto';
import { FieldsManagement, FieldsPDF, FilterFieldsDto } from './dto/filter-fields.dto';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('order-mp')
@UseGuards(JwtAuthGuard)
export class OrderMPController {
    constructor(
        private readonly orderMPService: OrderMPService
    ) { }


    @Get('pdf')
    async generatePdf(@Query(new ValidationPipe({ transform: true })) query: FieldsPDF, @Res() res: Response) {
        try {
            const [filePath, fileName] = await this.orderMPService.createPdfInOneFile(query);
            res.setHeader('Content-type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}.pdf`);
            res.sendFile(filePath, { root: process.cwd() }, (err) => {
                if (err) {
                    console.log(err);
                }
                fs.unlinkSync(filePath);
            })
        } catch (error) {
            console.error('error', error);
            throw error;
        }
    }

    @Get('management')
    async getOrderForManagement(
        @Query() query: FieldsManagement
    ): Promise<OrderManagement[]> {
        try {
            return await this.orderMPService.getOrderForManagement(query);
        } catch (error) {
            console.log(error)
            throw new HttpException('Error getting orders with documents', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('management/count')
    async countOrdersForManagement(
        @Query() query: FieldsManagement
    ): Promise<number> {
        try {
            return await this.orderMPService.countOrdersForManagement(query);
        } catch (error) {
            throw new HttpException('Error getting orders with documents', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


/*    @UseGuards(JwtAuthGuard)
    @Get(':companyId/:orderTypeId/:period/:correlative')
    async findById(
        @Param('companyId') companyId: string,
        @Param('orderTypeId') orderTypeId: string,
        @Param('period') period: string,
        @Param('correlative') correlative: string
    ): Promise<GetFullOrderMPResponseDto> {
        try {
            return await this.orderMPService.findById(companyId, orderTypeId, period, correlative);
        } catch (error) {
            throw new HttpException('Error finding order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/

    @Get('with-documents')
    async getOrdersWithDocuments(
        @Query(new ValidationPipe({ transform: true })) query: FilterFieldsDto
    ): Promise<GetOrderDocumentDto[]> {
        try {
            return await this.orderMPService.getOrdersWithDocuments(query);
        } catch (error) {
            throw new HttpException('Error getting orders with documents', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createOrderMPDto: CreateOrderMPDto): Promise<OrderMP> {
        try {
            return await this.orderMPService.create(createOrderMPDto);
        } catch (error) {
            throw new HttpException('Error creating order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('duplicate')
    async duplicateOrder(@Body() duplicateOrderMPDto: DuplicateOrderMPDto): Promise<OrderMP> {
        try {
            return await this.orderMPService.duplicateOrder(duplicateOrderMPDto);
        } catch (error) {
            throw new HttpException('Error duplicating order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-total/:companyId/:orderTypeId/:period/:correlative')
    async updateTotal(
        @Param('companyId') companyId: string,
        @Param('orderTypeId') orderTypeId: string,
        @Param('period') period: string,
        @Param('correlative') correlative: string,
        @Body('amount') amount: number
    ): Promise<boolean> {
        try {
            return await this.orderMPService.updateTotal(amount, companyId, orderTypeId, period, correlative);
        } catch (error) {
            throw new HttpException('Error updating total', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':companyId/:orderTypeId/:period/:correlative')
    async updateOrder(
        @Param('companyId') companyId: string,
        @Param('orderTypeId') orderTypeId: string,
        @Param('period') period: string,
        @Param('correlative') correlative: string,
        @Body() updateOrderMPDto: UpdateOrderMPDto
    ): Promise<OrderMP> {
        try {
            return await this.orderMPService.updateOrder(companyId, orderTypeId, period, correlative, updateOrderMPDto);
        } catch (error) {
            throw new HttpException('Error updating order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}