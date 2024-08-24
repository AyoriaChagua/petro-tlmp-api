import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostCenterService } from './cost-center.service';
import { CostCenterController } from './cost-center.controller';
import { CostCenter } from './cost-center.entity';
import { DatabaseErrorService } from 'src/shared/database-error.service';

@Module({
    imports: [TypeOrmModule.forFeature([CostCenter])],
    providers: [CostCenterService, DatabaseErrorService],
    controllers: [CostCenterController],
    exports: [CostCenterService, DatabaseErrorService],
})
export class CostCenterModule { }