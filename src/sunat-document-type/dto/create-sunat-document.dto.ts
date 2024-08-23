import { IsString, IsOptional, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSunatDocumentTypeDto {
    @IsString()
    documentTypeId: string;

    @IsString()
    companyId: string;

    @IsOptional()
    @IsString()
    statusId?: string;

    @IsOptional()
    @IsString()
    sunatCode?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    systemDate?: Date;

    @IsOptional()
    @IsString()
    systemUser?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    modifiedDate?: Date;

    @IsOptional()
    @IsString()
    modifiedUser?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    frequency?: number;
}
