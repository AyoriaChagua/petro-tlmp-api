import { IsString, IsOptional, IsEmail, Length, isBoolean, IsBoolean } from 'class-validator';

export class GetCorrelativeControlDto {

    @IsString()
    orderTypeId: string;

    @IsString()
    companyId: string;

    @IsString()
    period?: string;

    @IsString()
    correlative?: string;

    @IsOptional()
    @IsString()
    ciaDescription?: string;

    @IsOptional()
    @IsString()
    systemUser: string;

    @IsOptional()
    @IsBoolean()
    active: boolean;
}
