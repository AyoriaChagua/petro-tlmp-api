import { Type } from 'class-transformer';

export class FileDto {
    id: number;
    fileTypeId: string;
}


export class PaymentDto {
    paymentId: number
    orderDocumentNumber: string
    companyId: string
    paymentDate: Date
    paidAmount: number
    isActive: boolean

    @Type(() => FileDto)
    paymentFile: FileDto;
}

export class OrderDocumentDto {
    currency: string;
    providerRuc: string;
    providerDescription: string;
    costCenterId: number;
    costCenterAlias: string;
    correlative: string;
    documentProviderRuc: string;
    documentDescriptionRuc: string;
    observations: string;
    chargeDate: Date;
    date: Date;
    total: number;
    exchangeRate: number;
    documentTypeId: string;
    orderDocumentNumber: string;
    dueDate: Date;
    product: string;
    biog: number;
    typeEmission: string;
    annotation: string;
    taxCalc: number;
    retentionCalc: number;
}
