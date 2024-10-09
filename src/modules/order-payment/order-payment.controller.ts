import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OrderPaymentService } from './order-payment.service';
import { CreateOrderPaymentDto } from './dto/create-order-payment.dto';
import { OrderPayment } from './order-payment.entity';
import { FieldsSearch } from './dto/query.dto';

@Controller('order-payment')
export class PaymentDocumentController {
    constructor(private readonly orderPaymentService: OrderPaymentService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createOrderPaymentDto: CreateOrderPaymentDto): Promise<OrderPayment> {
        return this.orderPaymentService.create(createOrderPaymentDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getPaymentsByOrder(
        @Query(new ValidationPipe({ transform: true })) query: FieldsSearch
    ): Promise<OrderPayment[]> {
        return await this.orderPaymentService.findByOrder(query);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updatePaymentDocumentDto: Partial<CreateOrderPaymentDto>): Promise<OrderPayment> {
        return this.orderPaymentService.update(+id, updatePaymentDocumentDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.orderPaymentService.remove(+id);
    }
}