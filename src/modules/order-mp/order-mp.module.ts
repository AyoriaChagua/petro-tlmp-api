import { Module } from '@nestjs/common';
import { OrderMPController } from './order-mp.controller';
import { OrderMPService } from './order-mp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMP } from './order-mp.entity';
import { CorrelativeControlService } from 'src/modules/maintanance/correlative-control/correlative-control.service';
import { OrderDetail } from 'src/modules/order-det-mp/order-det-mp.entity';
import { FileMP } from 'src/modules/file-mp/file-mp.entity';
import { CorrelativeControl } from 'src/modules/maintanance/correlative-control/correlative-control.entity';
import { DatabaseErrorService } from 'src/shared/database-error.service';
import { OrderDocumentMP } from '../order-document-mp/order-document-mp.entity';

@Module({
    controllers: [OrderMPController],
    providers: [OrderMPService, CorrelativeControlService, DatabaseErrorService],
    exports: [OrderMPService, DatabaseErrorService],
    imports: [TypeOrmModule.forFeature([OrderMP, OrderDetail, OrderDocumentMP, FileMP, CorrelativeControl])],
})
export class OrderMPModule { }