import { IsString, IsOptional, IsInt, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSunatDocumentTypeDto {
    @IsString()
    documentTypeId: string;

    @IsOptional()
    @IsString()
    sunatCode?: string;

    @IsOptional()
    @IsString()
    systemUser?: string;

    @IsOptional()
    @IsString()
    description?: string;
}
