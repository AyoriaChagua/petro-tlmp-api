import { IsString, IsOptional } from 'class-validator';

export class CreateRequestingAreaDto {
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    status?: string;
}