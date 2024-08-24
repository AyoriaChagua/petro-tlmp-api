import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards } from '@nestjs/common';
import { ApprovalPersonnelService } from './approval-personnel.service';
import { ApprovalPersonnel } from './approval-personnel.entity';
import { CreateApprovalPersonnelDto } from './dto/create-approval-perssonel.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt.guard';

@Controller('approval-personnel')
export class ApprovalPersonnelController {
    constructor(private readonly approvalPersonnelService: ApprovalPersonnelService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<ApprovalPersonnel[]> {
        return this.approvalPersonnelService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ApprovalPersonnel> {
        return this.approvalPersonnelService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createApprovalPersonnelDto: CreateApprovalPersonnelDto): Promise<ApprovalPersonnel> {
        return this.approvalPersonnelService.create(createApprovalPersonnelDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateApprovalPersonnelDto: CreateApprovalPersonnelDto): Promise<ApprovalPersonnel> {
        return this.approvalPersonnelService.update(+id, updateApprovalPersonnelDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string): Promise<void> {
        await this.approvalPersonnelService.remove(+id);
    }
}