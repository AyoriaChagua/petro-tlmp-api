import { Controller, Get, Post, Put, Param, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OrderMPService } from './order-mp.service';
import { GetFullOrderMPResponseDto } from './dto/get-full-order-mp-respose.dto';
import { GetOrderDocumentDto } from './dto/get-order-document.dto';
import { CreateOrderMPDto } from './dto/create-order-mp.dto';
import { OrderMP } from './order-mp.entity';
import { DuplicateOrderMPDto } from './dto/duplicate-order-mp.dto';
import { UpdateOrderMPDto } from './dto/update-order-mp.dto';

@Controller('order-mp')
@UseGuards(JwtAuthGuard)
export class OrderMPController {
    constructor(private readonly orderMPService: OrderMPService) { }

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
    }

    @Get('with-documents/:companyId/:period')
    async getOrdersWithDocuments(
        @Param('companyId') companyId: string,
        @Param('period') period: string,
    ): Promise<GetOrderDocumentDto[]> {
        try {
            return await this.orderMPService.getOrdersWithDocuments(companyId, period);
        } catch (error) {
            console.log(error)
            throw new HttpException('Error getting orders with documents', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async create(@Body() createOrderMPDto: CreateOrderMPDto): Promise<OrderMP> {
        try {
            return await this.orderMPService.create(createOrderMPDto);
        } catch (error) {
            throw new HttpException('Error creating order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('duplicate')
    async duplicateOrder(@Body() duplicateOrderMPDto: DuplicateOrderMPDto): Promise<OrderMP> {
        try {
            return await this.orderMPService.duplicateOrder(duplicateOrderMPDto);
        } catch (error) {
            throw new HttpException('Error duplicating order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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