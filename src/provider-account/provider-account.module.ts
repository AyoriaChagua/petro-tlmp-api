import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderAccount } from "./provider-account.entity";
import { ProviderAccountService } from "./provider-account.service";
import { ProvideAccountController } from "./provider-account.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ProviderAccount])],
    providers: [ProviderAccountService],
    controllers: [ProvideAccountController],
    exports: [ProviderAccountService],
})
export class ProviderAccountModule { }