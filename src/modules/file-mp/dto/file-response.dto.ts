export class ResponseFileMPDto {
    id: number;
    fileName: string;
    fileTypeId: string;
}

export class SearchFiles {
    correlative: string;
    period: string;
    orderTypeId: string;
    companyId: string;
    fileTypeId: string;
}