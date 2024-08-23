import { IsString, IsOptional, IsEmail, Length, IsDate } from 'class-validator';

export class UpdateProviderDto {
    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    modifiedUser?: string;
    
    @IsOptional()
    @IsDate()
    modifiedDate?: Date;
}
