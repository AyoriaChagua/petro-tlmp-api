import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostCenter } from './cost-center.entity';
import { DatabaseErrorService } from 'src/shared/database-error.service';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';

@Injectable()
export class CostCenterService {
    constructor(
        @InjectRepository(CostCenter)
        private costCenterRepository: Repository<CostCenter>,
        private databaseErrorService: DatabaseErrorService
    ) { }

    async findAll(): Promise<CostCenter[]> {
        try {
            return this.costCenterRepository.find();
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Cost center')   
        }
    }

    async findByCompany(companyId: string): Promise<CostCenter[]> {
        try {
            return this.costCenterRepository.find({ where: { companyId, isActive: true } });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document')
        }
    }

    async findOne(id: number): Promise<CostCenter> {
        try {
            return this.costCenterRepository.findOne({ where: { id } });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document')
        }
    }

    async create(costCenter: Partial<CostCenter>): Promise<CostCenter> {
        try {
            costCenter.isActive = true;
            costCenter.systemDate = new Date();
            const newCostCenter = this.costCenterRepository.create(costCenter);
            return this.costCenterRepository.save(newCostCenter);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document')
        }
    }

    async update(id: number, costCenter: UpdateCostCenterDto): Promise<CostCenter> {
        try {
            await this.costCenterRepository.update(id, costCenter);
            return this.costCenterRepository.findOne({ where: { id } });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document')
        }
    }

    async remove(id: number): Promise<void> {
        try {
            await this.costCenterRepository.update(id, { isActive: false });
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document')
        }
    }
}