import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FileMPController } from './file-mp.controller';
import { FileMPService } from './file-mp.service';
import { FileMP } from './file-mp.entity';
import { OrderPaymentService } from '../order-payment/order-payment.service';
import { OrderPayment } from '../order-payment/order-payment.entity';
import { DatabaseErrorService } from 'src/shared/database-error.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([FileMP, OrderPayment]),
        MulterModule.register({
            dest: './uploads',
        }),
        
    ],
    controllers: [FileMPController],
    providers: [FileMPService, OrderPaymentService, DatabaseErrorService],
    exports: [FileMPService, OrderPaymentService, DatabaseErrorService],
})
export class FileMPModule { }