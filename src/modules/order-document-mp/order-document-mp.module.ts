import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDocumentMPController } from './order-document-mp.controller';
import { OrderDocumentMPService } from './order-document-mp.service';
import { OrderDocumentMP } from './order-document-mp.entity';
import { DatabaseErrorService } from 'src/shared/database-error.service';
import { OrderDetail } from '../order-det-mp/order-det-mp.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderDocumentMP, OrderDetail])],
    controllers: [OrderDocumentMPController],
    providers: [OrderDocumentMPService, DatabaseErrorService],
    exports: [OrderDocumentMPService, DatabaseErrorService],
})
export class OrderDocumentMPModule { }