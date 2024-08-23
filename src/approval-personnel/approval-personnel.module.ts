import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalPersonnelService } from './approval-personnel.service';
import { ApprovalPersonnelController } from './approval-personnel.controller';
import { ApprovalPersonnel } from './approval-personnel.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ApprovalPersonnel])],
    providers: [ApprovalPersonnelService],
    controllers: [ApprovalPersonnelController],
    exports: [ApprovalPersonnelService],
})
export class ApprovalPersonnelModule {}