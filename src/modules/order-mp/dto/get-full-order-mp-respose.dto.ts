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
    orderDate: Date;

    @IsDate()
    issueDate: Date;

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
    documentStatus: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    currency: string;

    @IsOptional()
    @IsBoolean()
    isAffectedIGV: boolean;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    retention: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    tax: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    perception: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    detraction: number;


    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    retentionCalc: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    taxCalc: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    perceptionCalc: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    detractionCalc: number;

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
    subtotal: number;

    @IsOptional()
    @IsInt()
    requestingAreaId: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '3' })
    total: number;


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

    supplierAccountType: string;

    orderDetail: any[]
}
