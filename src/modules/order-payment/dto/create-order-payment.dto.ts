import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateOrderPaymentDto {
    @IsString()
    companyId: string;

    @IsString()
    orderTypeId: string;

    @IsString()
    period: string;

    @IsString()
    correlative: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    currency: string;

    @IsNotEmpty()
    @IsNumber()
    paidAmount: number;

    @IsString()
    @MaxLength(20)
    systemUser?: string;

    @IsDate()
    paymentDate: Date;
}