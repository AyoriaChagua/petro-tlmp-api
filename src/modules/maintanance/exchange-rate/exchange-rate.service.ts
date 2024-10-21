import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExchangeRate } from "./exchange-rate.entity";
import { Repository } from "typeorm";
import { DatabaseErrorService } from "src/shared/database-error.service";
import { ExchangeRateDTO } from "./dto/exchange-rate.dto";

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(ExchangeRate)
        private readonly exchangeRateRepository: Repository<ExchangeRate>,
        private databaseErrorService: DatabaseErrorService
    ) { }

    async findAll(): Promise<ExchangeRateDTO[]> {
        try {
            const results = await this.exchangeRateRepository
                .createQueryBuilder('exchange')
                .select('exchange.date AS date, exchange.purchase_price AS purchase_price, exchange.sale_price AS sale_price')
                .where('exchange.date >= :date', { date: '2024-01-01' })
                .groupBy('exchange.date, exchange.purchase_price, exchange.sale_price')
                .orderBy('exchange.date', 'DESC')
                .getRawMany() as ExchangeRateDTO[];

            return results.map(result => ({
                date: new Date(result.date),
                purchase_price: result.purchase_price,
                sale_price: result.sale_price,
            }));
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Exchange rate');
        }
    }
}
