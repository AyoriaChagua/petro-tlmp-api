import { Controller, Get, Post, Patch, Delete, Body, Param, HttpException, HttpStatus, UseGuards, Put } from "@nestjs/common";
import { CorrelativeControlService } from "./correlative-control.service";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { CorrelativeControl } from "./correlative-control.entity";
import { GetCorrelativeControlDto } from "./dto/correlative-control.dto";

@Controller('correlative-control')
export class CorrelativeControlController {
    constructor(
        private readonly correlativeControlService: CorrelativeControlService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':companyId/:orderTypeId/:period')
    async getById(
        @Param('companyId') companyId: string,
        @Param('orderTypeId') orderTypeId: string,
        @Param('period') period: string
    ): Promise<GetCorrelativeControlDto> {
        try {
            return await this.correlativeControlService.findById(companyId, orderTypeId, period);
        } catch (error) {
            throw new HttpException(
                'An error occurred while fetching correlative controls',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':companyId')
    async getByCompany(
        @Param('companyId') companyId: string
    ): Promise<GetCorrelativeControlDto[]> {
        try {
            return await this.correlativeControlService.findByCompany(companyId);
        } catch (error) {
            throw new HttpException(
                'An error occurred while fetching correlative controls',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() correlativeControl: Partial<CorrelativeControl>): Promise<GetCorrelativeControlDto> {
        return await this.correlativeControlService.createCorrelative(correlativeControl);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':companyId/:orderTypeId/:period')
    async updateCorrelative(
        @Param('companyId') companyId: string,
        @Param('orderTypeId') orderTypeId: string,
        @Param('period') period: string,
        @Body('correlative') newCorrelative: string
    ): Promise<CorrelativeControl> {
        try {
            return await this.correlativeControlService.updateCorrelative(companyId, orderTypeId, period, newCorrelative);
        } catch (error) {
            throw new HttpException(
                'An error occurred while updating correlative control',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch('toggle/:companyId/:orderTypeId/:period')
    async toggleCorrelative(
        @Param('companyId') companyId: string,
        @Param('orderTypeId') orderTypeId: string,
        @Param('period') period: string
    ): Promise<CorrelativeControl> {
        try {
            return await this.correlativeControlService.toggleCorrelative(companyId, orderTypeId, period);
        } catch (error) {
            throw new HttpException(
                'An error occurred while deactivating correlative control',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':companyId/:orderTypeId/:period')
    async deleteCorrelativeControl(
        @Param('companyId') companyId: string,
        @Param('orderTypeId') orderTypeId: string,
        @Param('period') period: string
    ): Promise<void> {
        try {
            console.log("llega")
            await this.correlativeControlService.deleteCorrelative(companyId, orderTypeId, period);
        } catch (error) {
            throw new HttpException(
                'An error occurred while deactivating correlative control',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
