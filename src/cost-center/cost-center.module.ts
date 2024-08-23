import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostCenterService } from './cost-center.service';
import { CostCenterController } from './cost-center.controller';
import { CostCenter } from './cost-center.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CostCenter])],
    providers: [CostCenterService],
    controllers: [CostCenterController],
    exports: [CostCenterService],
})
export class CostCenterModule { }