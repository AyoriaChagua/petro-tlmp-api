import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostCenter } from './cost-center.entity';

@Injectable()
export class CostCenterService {
    constructor(
        @InjectRepository(CostCenter)
        private costCenterRepository: Repository<CostCenter>,
    ) { }

    async findAll(): Promise<CostCenter[]> {
        return this.costCenterRepository.find();
    }

    async findOne(id: number): Promise<CostCenter> {
        return this.costCenterRepository.findOne({ where: { id } });
    }

    async create(costCenter: Partial<CostCenter>): Promise<CostCenter> {
        const newCostCenter = this.costCenterRepository.create(costCenter);
        return this.costCenterRepository.save(newCostCenter);
    }

    async update(id: number, costCenter: Partial<CostCenter>): Promise<CostCenter> {
        await this.costCenterRepository.update(id, costCenter);
        return this.costCenterRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.costCenterRepository.update(id, { isActive: false });
    }
}