import { Controller, Get, Post, Put, Param, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateOrderMPDto } from 'src/order-mp/dto/create-order-mp.dto';
import { DuplicateOrderMPDto } from 'src/order-mp/dto/duplicate-order-mp.dto';
import { GetFullOrderMPResponseDto } from 'src/order-mp/dto/get-full-order-mp-respose.dto';
import { GetOrderDocumentDto } from 'src/order-mp/dto/get-order-document.dto';
import { UpdateOrderMPDto } from 'src/order-mp/dto/update-order-mp.dto';
import { OrderMP } from 'src/order-mp/order-mp.entity';
import { OrderMPService } from 'src/order-mp/order-mp.service';

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