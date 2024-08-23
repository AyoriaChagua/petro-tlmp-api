import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { OrderDetailService } from './order-det-mp.service';
import { CreateOrderDetailDto } from './dto/create-order-det.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('order-detail')
export class OrderDetailController {
    constructor(private readonly orderDetailService: OrderDetailService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
        return await this.orderDetailService.create(createOrderDetailDto);
    }

    @Get()
    async findAll() {
        return await this.orderDetailService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.orderDetailService.findOne(+id);
    }

    @Get(':companyId/:orderTypeId/:period/:correlative')
    async findByOrder(
        @Param('companyId') companyId: string,
        @Param('orderTypeId') orderTypeId: string,
        @Param('period') period: string,
        @Param('correlative') correlative: string
    ) {
        return await this.orderDetailService.findByOrder(companyId, orderTypeId, period, correlative);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateOrderDetailDto: Partial<CreateOrderDetailDto>) {
        return await this.orderDetailService.update(+id, updateOrderDetailDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.orderDetailService.remove(+id);
    }
}