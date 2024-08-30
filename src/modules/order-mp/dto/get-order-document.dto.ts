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
    documentStatus: string;
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
    orderDate: Date;
    companyId: string;
    subtotal: number;
    systemUser: string;
    providerRuc: string;
    providerDescription: string;
    currency: string;
    total: number;
    products: string;
    observations: string;
    
    @Type(() => OrderDocumentDto)
    documents: OrderDocumentDto[];
}