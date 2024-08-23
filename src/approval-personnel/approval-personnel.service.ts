import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalPersonnel } from './approval-personnel.entity';

@Injectable()
export class ApprovalPersonnelService {
    constructor(
        @InjectRepository(ApprovalPersonnel)
        private approvalPersonnelRepository: Repository<ApprovalPersonnel>,
    ) { }

    async findAll(): Promise<ApprovalPersonnel[]> {
        return this.approvalPersonnelRepository.find();
    }

    async findOne(id: number): Promise<ApprovalPersonnel> {
        return this.approvalPersonnelRepository.findOne({ where: { id } });
    }

    async create(approvalPersonnel: Partial<ApprovalPersonnel>): Promise<ApprovalPersonnel> {
        const newApprovalPersonnel = this.approvalPersonnelRepository.create(approvalPersonnel);
        return this.approvalPersonnelRepository.save(newApprovalPersonnel);
    }

    async update(id: number, approvalPersonnel: Partial<ApprovalPersonnel>): Promise<ApprovalPersonnel> {
        await this.approvalPersonnelRepository.update(id, approvalPersonnel);
        return this.approvalPersonnelRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.approvalPersonnelRepository.update(id, { isActive: false });
    }
}