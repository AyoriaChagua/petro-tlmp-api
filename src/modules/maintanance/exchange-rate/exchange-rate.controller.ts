import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ExchangeRateService } from "./exchange-rate.service";
import { JwtAuthGuard } from "src/modules/auth/jwt.guard";
import { ExchangeRateDTO } from "./dto/exchange-rate.dto";

@Controller("exchange-rate")
@UseGuards(JwtAuthGuard)
export class ExchangeRateController {
    constructor(
        private readonly exchangeRateService: ExchangeRateService
    ) { }

    @Get()
    async getAllExchangeRates(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<ExchangeRateDTO[]> {
        return await this.exchangeRateService.findAll(page, limit);
    }

    @Get('total-number')
    async getTotalExchangeRates(): Promise<number> {
        return await this.exchangeRateService.getTotalNumber();
    }
}