import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-det.dto';
import { OrderDetail } from './order-det-mp.entity';

@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,
    ) { }

    async create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
        try {
            const orderDetail = this.orderDetailRepository.create(createOrderDetailDto);
            return await this.orderDetailRepository.save(orderDetail);
        } catch (error) {
            throw new InternalServerErrorException('Error creating order detail');
        }
    }

    async findAll(): Promise<OrderDetail[]> {
        try {
            return await this.orderDetailRepository.find();
        } catch (error) {
            throw new InternalServerErrorException('Error searching order detail');
        }
    }

    async findOne(id: number): Promise<OrderDetail> {
        try {
            const orderDetail = await this.orderDetailRepository.findOne({ where: { orderDetailId: id } });
            if (!orderDetail) {
                throw new NotFoundException(`Order detail not found`);
            }
            return orderDetail;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error searching the order detail');
        }
    }

    async findByOrder(companyId: string, orderTypeId: string, period: string, correlative: string): Promise<OrderDetail[]> {
        try {
            const orderDetails = await this.orderDetailRepository.find({
                where: {
                    cia: companyId,
                    orderTypeId,
                    period,
                    correlative,
                    deleted: false
                }
            });
            return orderDetails;
        } catch (error) {
            throw new InternalServerErrorException('Error searching the order detail by data order');
        }
    }

    async update(id: number, updateOrderDetailDto: Partial<CreateOrderDetailDto>): Promise<OrderDetail> {
        try {
            const orderDetail = await this.findOne(id);
            Object.assign(orderDetail, updateOrderDetailDto);
            return await this.orderDetailRepository.save(orderDetail);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error updating order detail');
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const orderDetail = await this.findOne(id);
            if (!orderDetail) {
                throw new NotFoundException(`Order detail with id:${id} not found`);
            }

            orderDetail.deleted = true;
            await this.orderDetailRepository.save(orderDetail);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error deleting the order detail');
        }
    }
}