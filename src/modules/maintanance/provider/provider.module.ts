import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Provider } from "./provider.entity";
import { ProviderService } from "./provider.service";
import { ProviderController } from "./provider.controller";
import { DatabaseErrorService } from "src/shared/database-error.service";

@Module({
    imports: [TypeOrmModule.forFeature([Provider])],
    providers: [ProviderService, DatabaseErrorService],
    controllers: [ProviderController],
    exports: [ProviderService, DatabaseErrorService],
})
export class ProviderModule { }