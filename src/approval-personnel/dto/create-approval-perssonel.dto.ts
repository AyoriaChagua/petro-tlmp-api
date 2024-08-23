import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateApprovalPersonnelDto {
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    systemUser?: string;

    @IsString()
    @IsOptional()
    companyId?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}