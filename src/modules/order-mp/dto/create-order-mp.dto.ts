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
    orderDate: Date;

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
    currency?: string;

    @IsString()
    observations?: string;

    @IsBoolean()
    @IsOptional()
    isAffectedIGV?: boolean;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    retention?: number | null;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    tax?: number | null;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    perception?: number | null;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    detraction?: number | null;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    retentionCalc?: number | null;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    taxCalc?: number | null;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    perceptionCalc?: number | null;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    detractionCalc?: number | null;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    total?: number;

    @IsBoolean()
    @IsOptional()
    automaticSignature?: boolean;

    @IsBoolean()
    @IsOptional()
    isPettyCash?: boolean;

    @IsDecimal({ decimal_digits: '3' })
    @IsOptional()
    subtotal?: number;

    @IsInt()
    @IsOptional()
    requestingAreaId?: number;

    @IsString()
    @IsOptional()
    systemUser: string;
}