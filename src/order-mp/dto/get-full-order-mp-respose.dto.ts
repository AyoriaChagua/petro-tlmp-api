import { IsString, IsNumber, IsBoolean, IsDate, IsOptional, IsDecimal, Length, MaxLength, IsInt, IsNotEmpty } from 'class-validator';

export class GetFullOrderMPResponseDto {
    @IsNotEmpty()
    @IsString()
    @Length(5, 5)
    companyId: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 4)
    orderTypeId: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 4)
    period: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 8)
    correlative: string;

    @IsOptional()
    @IsString()
    @Length(12, 12)
    providerRuc: string;

    @IsOptional()
    @IsInt()
    bankAccountId: number;

    @IsOptional()
    @IsString()
    @Length(20, 20)
    systemUser: string;

    @IsDate()
    date: Date;

    @IsDate()
    emissionDate: Date;

    @IsOptional()
    @IsInt()
    approvingStaffId: number;

    @IsOptional()
    @IsInt()
    costCenterId: number;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    paymentMethod: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    relevance: string;

    @IsOptional()
    @IsString()
    @Length(5, 5)
    documentStatusId: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    currency: string;

    @IsOptional()
    @IsBoolean()
    taxableIgv: boolean;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    retentionPercentage: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    taxPercentage: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    perceptionPercentage: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    detractionPercentage: number;

    @IsOptional()
    @IsBoolean()
    automaticSignature: boolean;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    modifiedUser: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    modifiedDate: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    systemDate: string;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    totalAmount: number;

    @IsOptional()
    @IsInt()
    requestingAreaId: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    totalAmountWithTax: number;


    @IsOptional()
    @IsString()
    providerDescription: string;

    @IsOptional()
    @IsString()
    providerAddress: string;
    

    @IsOptional()
    @IsString()
    supplierAccountBank: string;

    @IsOptional()
    @IsString()
    supplierAccountNumber: string;

    @IsOptional()
    @IsString()
    supplierAccountCII: string;

    @IsOptional()
    @IsString()
    approvalPersonnelDescription: string;

    @IsOptional()
    @IsString()
    costCenterDescription: string;

    @IsOptional()
    @IsString()
    requestingAreaDescription: string;
}
