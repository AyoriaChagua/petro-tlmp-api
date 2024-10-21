import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExchangeRate } from "./exchange-rate.entity";
import { ExchangeRateService } from "./exchange-rate.service";
import { DatabaseErrorService } from "src/shared/database-error.service";
import { ExchangeRateController } from "./exchange-rate.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ExchangeRate])],
    providers: [ExchangeRateService, DatabaseErrorService],
    controllers: [ExchangeRateController],
    exports: [ExchangeRateService, DatabaseErrorService]
})
export class ExchangeRateModule {}