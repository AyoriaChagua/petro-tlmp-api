import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

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

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isPettyCash?: boolean;
}