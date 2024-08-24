import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SunatDocumentTypeService } from './sunat-document-type.service';
import { SunatDocumentTypeController } from './sunat-document-type.controller';
import { SunatDocumentType } from './sunat-document-type.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SunatDocumentType])],
    controllers: [SunatDocumentTypeController],
    providers: [SunatDocumentTypeService],
})
export class SunatDocumentTypeModule { }
