import { IsNotEmpty, IsEmail, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateEmailMPDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    body: string;

    @IsEmail()
    @IsNotEmpty()
    senderEmail: string;

    @IsEmail()
    @IsNotEmpty()
    recipientEmail: string;

    @IsString()
    @IsOptional()
    sendStatus?: string;

    @IsOptional()
    systemDate?: Date;

    @IsString()
    @IsOptional()
    sendMessage?: string;

    @IsInt()
    @IsOptional()
    dailyBatch?: number;

    @IsInt()
    @IsOptional()
    emailId?: number;
}
