import { IsString, IsOptional } from 'class-validator';

export class UpdateCostCenterDto {
    @IsString()
    @IsOptional()
    companyId?: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    aliasReport: string;
}