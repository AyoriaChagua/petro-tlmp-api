import { Type } from "class-transformer";
import { IsBoolean, isBoolean, IsDate, IsDecimal, IsString } from "class-validator";

export class CreateDocumentOrderDto {
    @IsString()
    companyId: string;

    @IsString()
    orderTypeId: string;

    @IsString()
    period: string;

    @IsString()
    correlative: string;

    @IsString()
    orderDocumentNumber: string;

    @IsDecimal({ decimal_digits: '3' })
    subtotal?: number;

    @IsDecimal({ decimal_digits: '3' })
    igv?: number;

    @IsDecimal({ decimal_digits: '3' })
    total?: number;

    @IsString()
    systemUser: string;

    @IsString()
    documentStatus: string;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsDate()
    @Type(() => Date)
    dueDate: Date;

    @IsDate()
    @Type(() => Date)
    chargeDate: Date;

    @IsString()
    documentTypeId: string;

    @IsString()
    code: string;

    @IsString()
    biog: number;

    @IsString()
    typeEmission: string;

    @IsDecimal({ decimal_digits: '3' })
    fise: number;

    @IsDecimal({ decimal_digits: '3' })
    otherPayments: number;

    @IsDecimal({ decimal_digits: '3' })
    exchangeRate: number;

    @IsString()
    annotation: string;

    @IsBoolean()
    noOrderFlag: boolean;

    @IsDecimal({ decimal_digits: '3' })
    retentionPercentage: number;

    @IsDecimal({ decimal_digits: '3' })
    taxPercentage: number;

    @IsDecimal({ decimal_digits: '3' })
    perceptionPercentage: number;

    @IsDecimal({ decimal_digits: '3' })
    detractionPercentage: number;
}