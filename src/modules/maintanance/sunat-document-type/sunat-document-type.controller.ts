import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Put, HttpCode } from '@nestjs/common';
import { SunatDocumentTypeService } from './sunat-document-type.service';
import { CreateSunatDocumentTypeDto } from './dto/create-sunat-document.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt.guard';
import { UpdateSunatDocumentTypeDto } from './dto/update-sunat-document.dto';

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
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDto: UpdateSunatDocumentTypeDto) {
        return await this.sunatDocumentTypeService.update(id, updateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async sumFrequency(@Param('id') id: string) {
        return await this.sunatDocumentTypeService.sumFrequency(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return await this.sunatDocumentTypeService.remove(id);
    }
}
