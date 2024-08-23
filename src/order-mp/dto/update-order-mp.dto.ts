import { IsOptional, IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';

export class UpdateOrderMPDto {
    @IsOptional()
    @IsString()
    providerRuc?: string;

    @IsOptional()
    @IsNumber()
    bankAccountId?: number;

    @IsOptional()
    @IsDate()
    emissionDate?: Date;

    @IsOptional()
    @IsNumber()
    approvingStaffId?: number;

    @IsOptional()
    @IsNumber()
    costCenterId?: number;

    @IsOptional()
    @IsString()
    paymentMethod?: string;

    @IsOptional()
    @IsString()
    relevance?: string;

    @IsOptional()
    @IsString()
    documentStatusId?: string;

    @IsOptional()
    @IsBoolean()
    taxableIgv?: boolean;

    @IsOptional()
    @IsNumber()
    retentionPercentage?: number;

    @IsOptional()
    @IsNumber()
    taxPercentage?: number;

    @IsOptional()
    @IsNumber()
    perceptionPercentage?: number;

    @IsOptional()
    @IsNumber()
    detractionPercentage?: number;

    @IsOptional()
    @IsBoolean()
    automaticSignature?: boolean;

    @IsOptional()
    @IsNumber()
    totalAmount?: number;

    @IsOptional()
    @IsNumber()
    requestingAreaId?: number;

    @IsOptional()
    @IsNumber()
    totalAmountWithTax?: number;
}