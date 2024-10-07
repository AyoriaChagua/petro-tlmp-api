import { IsString } from "class-validator";

export class FieldsSearch {
    @IsString()
    companyId: string;
    @IsString()
    orderTypeId: string;
    @IsString()
    period: string;
    @IsString()
    correlative: string;
}