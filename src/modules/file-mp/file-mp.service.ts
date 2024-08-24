import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileMP } from './file-mp.entity';
import { CreateFileMPDto } from './dto/create-file-mp.dto';

@Injectable()
export class FileMPService {
    constructor(
        @InjectRepository(FileMP)
        private fileMPRepository: Repository<FileMP>,
    ) { }

    async getByOrderDocumentAndCompany(orderDocumentNumber: string, companyId: string): Promise<FileMP[]> {
        const files = await this.fileMPRepository.find({
            where: { orderDocumentNumber, companyId },
            select: ["fileTypeId", "fileName", "companyId", "correlative", "id", "orderDocumentNumber"]
        });
        if (!files.length) {
            throw new NotFoundException('Files not found for this order document');
        }
        return files;
    }

    async create(createFileMPDto: CreateFileMPDto): Promise<FileMP> {
        const newFile = this.fileMPRepository.create(createFileMPDto);
        return await this.fileMPRepository.save(newFile);
    }

    async checkFileExists(orderDocumentNumber: string, companyId: string, fileTypeId: string): Promise<boolean> {
        const file = await this.fileMPRepository.findOne({
            where: { orderDocumentNumber, companyId, fileTypeId },
        });
        return !!file;
    }

    async getFileById(id: number): Promise<FileMP> {
        const file = await this.fileMPRepository.findOne({ where: { id } });
        if (!file) {
            throw new NotFoundException('Archivo no encontrado');
        }
        return file;
    }
}