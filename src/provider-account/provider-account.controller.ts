import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProviderAccountService } from "./provider-account.service";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { ProviderAccount } from "./provider-account.entity";

@Controller('provider-accounts')
export class ProvideAccountController {
    constructor(
        private readonly provideAccountService: ProviderAccountService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':ruc')
    async getAccountByRuc(
        @Param('ruc') ruc: string,
    ): Promise<ProviderAccount[] | { error?: string }> {
        return await this.provideAccountService.findByProvider(ruc);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async postAccounts(
        @Body() createProvider: Partial<ProviderAccount>[],
    ): Promise<{ error?: string }> {
        return await this.provideAccountService.createProviderAccounts(createProvider);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async putProviderAccount(
        @Param('id') id: number,
        @Body() createProvider: Partial<ProviderAccount>,
    ): Promise<{ error?: string }> {
        return await this.provideAccountService.updateProviderAccount(createProvider, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteProviderAccount(
        @Param('id') id: number,
    ): Promise<{
        message: string,
        error?: any
    }> {
        return await this.provideAccountService.deleteProviderAccount(id);
    }
}