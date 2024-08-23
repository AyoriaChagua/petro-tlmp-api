import { IsString, Length, IsNotEmpty } from 'class-validator';

export class DuplicateOrderMPDto {
    @IsNotEmpty()
    @IsString()
    @Length(5)
    oldCompanyId: string;

    @IsNotEmpty()
    @IsString()
    @Length(4)
    oldOrderTypeId: string;

    @IsNotEmpty()
    @IsString()
    @Length(4)
    oldPeriod: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    oldCorrelative: string;

    @IsNotEmpty()
    @IsString()
    @Length(5)
    newCompanyId: string;

    @IsNotEmpty()
    @IsString()
    @Length(4)
    newOrderTypeId: string;

    @IsNotEmpty()
    @IsString()
    @Length(4)
    newPeriod: string;
}