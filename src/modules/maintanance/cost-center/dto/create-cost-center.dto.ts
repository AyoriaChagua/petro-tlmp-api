import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCostCenterDto {
    @IsString()
    @IsOptional()
    companyId?: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    aliasReport: string;

    @IsString()
    @IsOptional()
    systemUser: string;
}