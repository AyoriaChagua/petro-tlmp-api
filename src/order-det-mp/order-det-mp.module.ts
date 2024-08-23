import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './order-det-mp.entity';
import { OrderDetailController } from './order-det-mp.controller';
import { OrderDetailService } from './order-det-mp.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],
    controllers: [OrderDetailController],
    providers: [OrderDetailService],
    exports: [OrderDetailService],
})

export class OrderDetailModule { }