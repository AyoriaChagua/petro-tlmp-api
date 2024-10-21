import { Controller, Get, UseGuards } from "@nestjs/common";
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
    async getAllExchangeRates(): Promise<ExchangeRateDTO[]> {
        return await this.exchangeRateService.findAll();
    }
}