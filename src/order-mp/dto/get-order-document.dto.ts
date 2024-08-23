import { Type } from 'class-transformer';

export class FileDto {
    id: number;
    fileTypeId: string;
}

export class OrderDocumentDto {
    orderDocumentNumber: string;
    subtotal: number;
    igv: number;
    total: number;
    cia: string;
    correlative: string;
    period: string;
    orderTypeId: string;
    systemUser: string;
    date: Date;
    documentStatusId: string;
    annotation: string;
    sunatCode: string;
    

    @Type(() => FileDto)
    invoiceFile: FileDto;

    @Type(() => FileDto)
    paymentFile: FileDto;

    @Type(() => FileDto)
    otherFile: FileDto;
}

export class GetOrderDocumentDto {
    correlative: string;
    orderTypeId: string;
    date: Date;
    companyId: string;
    totalAmount: number;
    systemUser: string;
    providerRuc: string;
    providerDescription: string;
    currency: string;
    totalAmountWithTax: number;
    products: string;
    observations: string;
    
    @Type(() => OrderDocumentDto)
    documents: OrderDocumentDto[];
}