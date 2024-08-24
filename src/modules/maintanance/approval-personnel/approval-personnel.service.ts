import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalPersonnel } from './approval-personnel.entity';
import { DatabaseErrorService } from 'src/shared/database-error.service';

@Injectable()
export class ApprovalPersonnelService {
    constructor(
        @InjectRepository(ApprovalPersonnel)
        private approvalPersonnelRepository: Repository<ApprovalPersonnel>,
        private databaseErrorService: DatabaseErrorService
    ) { }

    async findAll(): Promise<ApprovalPersonnel[]> {
        try {
            return this.approvalPersonnelRepository.find({
                where: { isActive: true },
            });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Approval Personnel');
        }
    }

    async findOne(id: number): Promise<ApprovalPersonnel> {
        try {
            return this.approvalPersonnelRepository.findOne({ where: { id } });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Approval Personnel');
        }
    }

    async create(approvalPersonnel: Partial<ApprovalPersonnel>): Promise<ApprovalPersonnel> {
        try {
            approvalPersonnel.systemDate = new Date();
            approvalPersonnel.isActive = true;
            const newApprovalPersonnel = this.approvalPersonnelRepository.create(approvalPersonnel);
            return this.approvalPersonnelRepository.save(newApprovalPersonnel);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Approval Personnel');
        }
    }

    async update(id: number, approvalPersonnel: Partial<ApprovalPersonnel>): Promise<ApprovalPersonnel> {
        try {
            approvalPersonnel.modificationDate = new Date();
            await this.approvalPersonnelRepository.update(id, approvalPersonnel);
            return this.approvalPersonnelRepository.findOne({ where: { id } });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Approval Personnel');
        }
    }

    async remove(id: number): Promise<void> {
        try {
            await this.approvalPersonnelRepository.update(id, { isActive: false });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Approval Personnel');
        }
    }
}