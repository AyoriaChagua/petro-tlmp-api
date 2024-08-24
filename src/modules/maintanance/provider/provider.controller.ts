import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { Provider } from "./provider.entity";
import { UpdateProviderDto } from "./dto/udpate-provider.dto";
import { JwtAuthGuard } from "src/modules/auth/jwt.guard";

@Controller("providers")
export class ProviderController {
    constructor(private readonly providerService: ProviderService) { }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    async getAllProviders(
        @Query('numberPage') numberPage: number,
        @Query('numberPerPage') numberPerPage: number
    ): Promise<Provider[] | { error: string }> {
        return await this.providerService.findAllProviderWithAccounts(numberPage, numberPerPage);
    }

    @UseGuards(JwtAuthGuard)
    @Get('count')
    async getNumberProviders(
        @Query('querySearch') querySearch: string,
    ): Promise<{ quantity: number }> {
        if (querySearch === "all") {
            return await this.providerService.getNumberProviders();
        } else {
            return await this.providerService.getNumberProvidersByQuerySearch(querySearch);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('search')
    async searchProviders(
        @Query('querySearch') querySearch: string,
        @Query('numberPage') numberPage: number,
        @Query('numberPerPage') numberPerPage: number
    ): Promise<Provider[] | { error: string }> {
        return await this.providerService.findProvidersWithAccounts(querySearch, numberPage, numberPerPage);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProvider(@Body() createProveedorDto: CreateProviderDto): Promise<Provider> {
        try {
            return await this.providerService.createProvider(createProveedorDto);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'An error occurred while creating correlative control',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':ruc')
    async updateProvider(
        @Param('ruc') ruc: string,
        @Body() updateProveedorDto: UpdateProviderDto): Promise<Provider> {
        try {
            return await this.providerService.updateProvider(ruc, updateProveedorDto);
        } catch (error) {
            throw new HttpException(
                'An error occurred while creating correlative control',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':ruc')
    async deactivateProvider(@Param('ruc') ruc: string): Promise<{ message: string, error?: string }> {
        try {
            await this.providerService.deactivateProvider(ruc);
            return { message: 'Provider deactivated successfully' };
        } catch (error) {
            return { message: 'Error deactivating provider', error: error.message };
        }
    }
}