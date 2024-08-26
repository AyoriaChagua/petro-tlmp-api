import { IsString, IsOptional, IsInt, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSunatDocumentTypeDto {

    @IsOptional()
    @IsString()
    sunatCode: string;

    @IsOptional()
    @IsString()
    modifiedUser: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDate()
    modifiedDate?: Date;

}
