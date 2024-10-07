import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentDocumentController } from "./order-payment.controller";
import { DatabaseErrorService } from "src/shared/database-error.service";
import { OrderPayment } from "./order-payment.entity";
import { OrderPaymentService } from "./order-payment.service";

@Module({
    imports: [TypeOrmModule.forFeature([OrderPayment])],
    controllers: [PaymentDocumentController],
    providers: [OrderPaymentService, DatabaseErrorService],
    exports: [OrderPaymentService, DatabaseErrorService]
})
export class OrderPaymentModule { }