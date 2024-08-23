import { Module } from '@nestjs/common';
import { OrderMPController } from './order-mp.controller';
import { OrderMPService } from './order-mp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMP } from './order-mp.entity';
import { CorrelativeControlService } from 'src/correlative-control/correlative-control.service';
import { OrderDetail } from 'src/order-det-mp/order-det-mp.entity';
import { OrderDocumentMP } from 'src/order-document-mp/order-document-mp.entity';
import { FileMP } from 'src/file-mp/file-mp.entity';
import { CorrelativeControl } from 'src/correlative-control/correlative-control.entity';
import { DatabaseErrorService } from 'src/shared/database-error.service';

@Module({
    controllers: [OrderMPController],
    providers: [OrderMPService, CorrelativeControlService, DatabaseErrorService],
    exports: [OrderMPService, DatabaseErrorService],
    imports: [TypeOrmModule.forFeature([OrderMP, OrderDetail, OrderDocumentMP, FileMP, CorrelativeControl])],
})
export class OrderMPModule { }