import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestingArea } from './requesting-area.entity';

@Injectable()
export class RequestingAreaService {
    constructor(
        @InjectRepository(RequestingArea)
        private requestingAreaRepository: Repository<RequestingArea>,
    ) { }

    async findAll(): Promise<RequestingArea[]> {
        return this.requestingAreaRepository.find({where: {isActive: true}});
    }

    async findOne(id: number): Promise<RequestingArea> {
        return this.requestingAreaRepository.findOne({ where: { id } });
    }

    async create(requestingArea: Partial<RequestingArea>): Promise<RequestingArea> {
        const newRequestingArea = this.requestingAreaRepository.create(requestingArea);
        return this.requestingAreaRepository.save(newRequestingArea);
    }

    async update(id: number, requestingArea: Partial<RequestingArea>): Promise<RequestingArea> {
        await this.requestingAreaRepository.update(id, requestingArea);
        return this.requestingAreaRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.requestingAreaRepository.update(id, { isActive: false});
    }
}