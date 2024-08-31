import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePaymentDocumentDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    orderDocumentNumber: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(5)
    companyId: string;

    @IsNotEmpty()
    @IsNumber()
    paidAmount: number;

    @IsString()
    @MaxLength(20)
    systemUser?: string;
}