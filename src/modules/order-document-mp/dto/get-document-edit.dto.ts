export class getDocumentEditDto {
    annotation: string
    biorgeya: number
    providerRuc: string | null
    providerDescription: string | null
    detractionPerc: number | null
    detractionCalc: number | null
    documentType: string 
    documentTypeDescription: string | null
    dueDate: Date
    exchangeRate: number
    fise: number
    issueDate: Date
    issueType: string
    orderDocumentNumber: string
    otherPayments: number
    perceptionPerc: number | null
    perceptionCalc: number | null
    receiptDate: Date
    subtotal: number
    taxPerc: number | null
    taxCalc: number | null
    retentionPerc: number | null
    retentionCalc: number | null
    total: number
}