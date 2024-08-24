import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CorrelativeControl } from './correlative-control.entity';
import { Repository } from 'typeorm';
import { GetCorrelativeControlDto } from './dto/correlative-control.dto';
import { DatabaseErrorService } from 'src/shared/database-error.service';

@Injectable()
export class CorrelativeControlService {
    constructor(
        @InjectRepository(CorrelativeControl)
        private readonly correlativeControlRepository: Repository<CorrelativeControl>,
        private databaseErrorService: DatabaseErrorService

    ) { }

    async findById(companyId: string, orderTypeId: string, period: string): Promise<GetCorrelativeControlDto> {
        try {
            const result = await this.correlativeControlRepository
                .createQueryBuilder('cc')
                .leftJoinAndSelect('cc.company', 'cia')
                .select(['cc.company', 'cc.orderType', 'cc.correlative', 'cc.period', 'cc.companyId', 'cia.description', 'cc.orderTypeId', 'cc.systemUser', 'cc.active'])
                .where('cc.companyId = :companyId', { companyId })
                .andWhere('cc.orderTypeId = :orderTypeId', { orderTypeId })
                .andWhere('cc.period = :period', { period })
                .getOne();
            const formattedResults: GetCorrelativeControlDto = {
                orderTypeId: result.orderTypeId?.trim(),
                companyId: result.companyId,
                period: result.period,
                correlative: result.correlative,
                ciaDescription: result.company?.description,
                systemUser: result.systemUser,
                active: result.active
            };
            return formattedResults
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Correlative control');
        }
    }

    async findByCompany(companyId: string): Promise<GetCorrelativeControlDto[]> {
        try {
            const results = await this.correlativeControlRepository
                .createQueryBuilder('cc')
                .leftJoinAndSelect('cc.company', 'cia')
                .select(['cc.company', 'cc.orderType', 'cc.correlative', 'cc.period', 'cc.companyId', 'cia.description', 'cc.orderTypeId', 'cc.systemUser', 'cc.active'])
                .where('cc.companyId = :companyId', { companyId })
                .getMany();
            const formattedResults: GetCorrelativeControlDto[] = results.map(result => ({
                orderTypeId: result.orderTypeId.trim(),
                companyId: result.companyId,
                period: result.period,
                correlative: result.correlative,
                ciaDescription: result.company?.description,
                systemUser: result.systemUser,
                active: result.active
            }));
            return formattedResults
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Correlative control');
        }
    }

    async createCorrelative(correlativeControl: Partial<CorrelativeControl>): Promise<GetCorrelativeControlDto> {
        try {
            const newCorrelativeControl = this.correlativeControlRepository.create(correlativeControl);
            const correlativeControlSaved = await this.correlativeControlRepository.save(newCorrelativeControl);
            return await this.findById(correlativeControlSaved.companyId, correlativeControlSaved.orderTypeId, correlativeControlSaved.period);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Correlative control');
        }
    }

    async updateCorrelative(companyId: string, orderTypeId: string, period: string, newCorrelative: string): Promise<CorrelativeControl> {
        try {
            const existingCorrelativeControl = await this.correlativeControlRepository.findOne({ where: { companyId, orderTypeId, period } });
            if (!existingCorrelativeControl) {
                throw new Error('Correlative control not found');
            }
            existingCorrelativeControl.correlative = newCorrelative;
            return await this.correlativeControlRepository.save(existingCorrelativeControl);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Correlative control');
        }
    }

    async toggleCorrelative(companyId: string, orderTypeId: string, period: string): Promise<CorrelativeControl> {
        try {
            const correlativeControl = await this.correlativeControlRepository.findOne({
                where: { companyId, orderTypeId, period }
            });
            if (!correlativeControl) {
                throw new Error('Correlative control not found');
            }
            correlativeControl.active = !correlativeControl.active;
            return await this.correlativeControlRepository.save(correlativeControl);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Correlative control');
        }
    }

    async getNextCorrelative(companyId: string, orderTypeId: string, period: string): Promise<string> {
        try {
            const correlativeControl = await this.correlativeControlRepository.findOne({
                where: { companyId, orderTypeId, period }
            });

            if (!correlativeControl) {
                throw new NotFoundException('Correlative control not found');
            }

            const currentCorrelative = parseInt(correlativeControl.correlative, 10);
            const nextCorrelative = (currentCorrelative + 1).toString().padStart(8, '0');

            return nextCorrelative;
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Correlative control');
        }
    }

    async deleteCorrelative(companyId: string, orderTypeId: string, period: string): Promise<void> {
        try {
            const correlativeControl = await this.correlativeControlRepository.findOne({
                where: { companyId, orderTypeId, period }
            });
            if (!correlativeControl) {
                throw new Error('Correlative control not found');
            }
            await this.correlativeControlRepository.remove(correlativeControl);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Correlative control');
        }
    }


}
