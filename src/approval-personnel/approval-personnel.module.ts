import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalPersonnelService } from './approval-personnel.service';
import { ApprovalPersonnelController } from './approval-personnel.controller';
import { ApprovalPersonnel } from './approval-personnel.entity';
import { DatabaseErrorService } from 'src/shared/database-error.service';

@Module({
    imports: [TypeOrmModule.forFeature([ApprovalPersonnel])],
    providers: [ApprovalPersonnelService, DatabaseErrorService],
    controllers: [ApprovalPersonnelController],
    exports: [ApprovalPersonnelService, DatabaseErrorService],
})
export class ApprovalPersonnelModule {}