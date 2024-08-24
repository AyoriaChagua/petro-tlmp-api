import { IsDecimal, IsInt, IsString } from "class-validator";

export class CreateOrderDetailDto {

    @IsString()
    product: string;

    @IsInt()
    quantity: number;

    @IsDecimal()
    unitPrice: number;

    @IsDecimal()
    subtotal: number;

    @IsString()
    user: string;

    @IsString()
    observations: string;

    @IsString()
    measurement: string;

    @IsString()
    companyId: string;

    @IsString()
    orderTypeId: string;

    @IsString()
    period: string;

    @IsString()
    correlative: string;

}