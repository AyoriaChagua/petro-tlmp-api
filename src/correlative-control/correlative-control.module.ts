import { Module } from '@nestjs/common';
import { CorrelativeControlService } from './correlative-control.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorrelativeControl } from './correlative-control.entity';
import { OrderType } from 'src/order-type/order-type.entity';
import { Cia } from 'src/cia/cia.entity';
import { CorrelativeControlController } from './correlative-control.controller';
import { DatabaseErrorService } from 'src/shared/database-error.service';

@Module({
  imports: [TypeOrmModule.forFeature([CorrelativeControl, OrderType, Cia])],
  providers: [CorrelativeControlService, DatabaseErrorService],
  controllers: [CorrelativeControlController],
  exports: [CorrelativeControlService, DatabaseErrorService]
})
export class CorrelativeControlModule { }
