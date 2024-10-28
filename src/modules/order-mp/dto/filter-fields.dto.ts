import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class FilterFieldsDto {
    @IsString()
    companyId: string;

    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    orderTypeIds?: string[];

    @IsOptional()
    @IsString()
    documentTypeId?: string;

    @IsOptional()
    @IsString()
    orderNumber?: string;

    @IsOptional()
    @IsString()
    supplierRuc?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    minAmount?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    maxAmount?: number;
}

export class FieldsPDF {
    @IsString()
    companyId: string;
    @IsString()
    orderTypeId: string;
    @IsString()
    period: string;
    @IsString()
    correlative: string;
}

export class FieldsManagement {
    @IsString()
    orderTypeId: string;
    @IsString()
    correlative?: string;
    @IsString()
    managementType: "order" | "document" | "payment";
    @IsString()
    companyId: string;
    @IsString()
    period: string;
    @IsNumber()
    page: number;
    @IsNumber()
    limit: number;
}