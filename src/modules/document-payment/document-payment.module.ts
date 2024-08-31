import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {  PaymentDocumentMP } from "./document-payment.entity";
import { PaymentDocumentController } from "./document-payment.controller";
import { PaymentDocumentService } from "./document-payment.service";
import { DatabaseErrorService } from "src/shared/database-error.service";

@Module({
    imports: [TypeOrmModule.forFeature([PaymentDocumentMP])],
    controllers: [PaymentDocumentController],
    providers: [PaymentDocumentService, DatabaseErrorService],
    exports: [PaymentDocumentService, DatabaseErrorService]
})
export class PaymentDocumentModule { }