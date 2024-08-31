export class CreateFileMPDto {
    file: Buffer;
    fileName: string;
    systemUser: string;
    fileTypeId: string;
    orderDocumentNumber?: string;
    companyId?: string;
    orderTypeId?: string;
    correlative?: string;
    period?: string;
    paymentId?: number
}