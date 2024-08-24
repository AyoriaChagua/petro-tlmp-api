import { IsString, IsNumber, IsOptional, IsBoolean, IsDate, IsInt, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderMPDto {
    @IsString()
    companyId: string;

    @IsString()
    orderTypeId: string;

    @IsString()
    period: string;

    @IsString()
    correlative: string;

    @IsString()
    @IsOptional()
    providerRuc?: string;

    @IsInt()
    @IsOptional()
    bankAccountId?: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    date?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    emissionDate?: Date;

    @IsInt()
    @IsOptional()
    approvingStaffId?: number;

    @IsInt()
    @IsOptional()
    costCenterId?: number;

    @IsString()
    @IsOptional()
    paymentMethod?: string;

    @IsString()
    @IsOptional()
    relevance?: string;

    @IsString()
    currency?: string;

    @IsString()
    @IsOptional()
    documentStatusId?: string;

    @IsBoolean()
    @IsOptional()
    taxableIgv?: boolean;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    retentionPercentage?: number;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    taxPercentage?: number;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    perceptionPercentage?: number;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    detractionPercentage?: number;

    @IsBoolean()
    @IsOptional()
    automaticSignature?: boolean;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    totalAmount?: number;

    @IsInt()
    @IsOptional()
    requestingAreaId?: number;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    totalAmountWithTax?: number;

    @IsString()
    @IsOptional()
    systemUser: string;
}