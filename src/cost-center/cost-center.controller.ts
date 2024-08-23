import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards } from '@nestjs/common';
import { CostCenterService } from './cost-center.service';
import { CostCenter } from './cost-center.entity';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('cost-centers')
export class CostCenterController {
    constructor(private readonly costCenterService: CostCenterService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<CostCenter[]> {
        return this.costCenterService.findAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CostCenter> {
        return this.costCenterService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createCostCenterDto: CreateCostCenterDto): Promise<CostCenter> {
        return this.costCenterService.create(createCostCenterDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCostCenterDto: CreateCostCenterDto): Promise<CostCenter> {
        return this.costCenterService.update(+id, updateCostCenterDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string): Promise<void> {
        await this.costCenterService.remove(+id);
    }
}