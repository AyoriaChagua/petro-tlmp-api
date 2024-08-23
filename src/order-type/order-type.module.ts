import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderType } from './order-type.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderType])],
    exports: [TypeOrmModule],
})
export class OrderTypeModule { }
