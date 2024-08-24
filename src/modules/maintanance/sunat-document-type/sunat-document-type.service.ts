import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SunatDocumentType } from './sunat-document-type.entity';
import { CreateSunatDocumentTypeDto } from './dto/create-sunat-document.dto';

@Injectable()
export class SunatDocumentTypeService {
    constructor(
        @InjectRepository(SunatDocumentType)
        private readonly sunatDocumentTypeRepository: Repository<SunatDocumentType>,
    ) { }

    async create(createDto: CreateSunatDocumentTypeDto): Promise<SunatDocumentType> {
        try {
            const newDocumentType = this.sunatDocumentTypeRepository.create(createDto);
            return await this.sunatDocumentTypeRepository.save(newDocumentType);
        } catch (error) {
            throw new Error(`Failed to create Sunat Document Type: ${error.message}`);
        }
    }

    async findAll(): Promise<SunatDocumentType[]> {
        try {
            return await this.sunatDocumentTypeRepository.find();
        } catch (error) {
            throw new Error(`Failed to retrieve Sunat Document Types: ${error.message}`);
        }
    }

    async findOne(id: string): Promise<SunatDocumentType> {
        try {
            const documentType = await this.sunatDocumentTypeRepository.findOne({
                where: { documentTypeId: id },
            });
            if (!documentType) {
                throw new NotFoundException(`Sunat Document Type with ID ${id} not found`);
            }
            return documentType;
        } catch (error) {
            throw new Error(`Failed to retrieve Sunat Document Type: ${error.message}`);
        }
    }

    async update(id: string, updateDto: Partial<CreateSunatDocumentTypeDto>): Promise<SunatDocumentType> {
        try {
            await this.sunatDocumentTypeRepository.update(id, updateDto);
            return this.findOne(id);
        } catch (error) {
            throw new Error(`Failed to update Sunat Document Type: ${error.message}`);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            const result = await this.sunatDocumentTypeRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Sunat Document Type with ID ${id} not found`);
            }
        } catch (error) {
            throw new Error(`Failed to delete Sunat Document Type: ${error.message}`);
        }
    }
}
