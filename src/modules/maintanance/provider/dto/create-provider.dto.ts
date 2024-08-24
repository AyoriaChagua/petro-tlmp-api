import { IsString, IsOptional, IsEmail, Length } from 'class-validator';

export class CreateProviderDto {
    @IsString()
    @Length(12, 12)
    ruc: string;

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
}
