import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards } from '@nestjs/common';
import { RequestingAreaService } from './requesting-area.service';
import { RequestingArea } from './requesting-area.entity';
import { CreateRequestingAreaDto } from './dto/create-requesting-area.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('requesting-areas')
export class RequestingAreaController {
    constructor(private readonly requestingAreaService: RequestingAreaService) { }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<RequestingArea[]> {
        return this.requestingAreaService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<RequestingArea> {
        return this.requestingAreaService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createRequestingAreaDto: CreateRequestingAreaDto): Promise<RequestingArea> {
        return this.requestingAreaService.create(createRequestingAreaDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRequestingAreaDto: CreateRequestingAreaDto): Promise<RequestingArea> {
        return this.requestingAreaService.update(+id, updateRequestingAreaDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string): Promise<void> {
        await this.requestingAreaService.remove(+id);
    }
}