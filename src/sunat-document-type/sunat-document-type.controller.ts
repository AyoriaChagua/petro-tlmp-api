import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { SunatDocumentTypeService } from './sunat-document-type.service';
import { CreateSunatDocumentTypeDto } from './dto/create-sunat-document.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('sunat-document-types')
export class SunatDocumentTypeController {
    constructor(private readonly sunatDocumentTypeService: SunatDocumentTypeService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createDto: CreateSunatDocumentTypeDto) {
        return await this.sunatDocumentTypeService.create(createDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.sunatDocumentTypeService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.sunatDocumentTypeService.findOne(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: Partial<CreateSunatDocumentTypeDto>) {
        return await this.sunatDocumentTypeService.update(id, updateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.sunatDocumentTypeService.remove(id);
    }
}
