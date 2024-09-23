import { AccountType, Currency } from "../types/order.type"

export interface Order {
    companyName: string
    companyAddress: string
    orderType: string
    orderNumber: string
    date: string
    registrationDate: string
    approver: string
    user: string
    costCenter: string
    paymentMethod: string
    currency: Currency
    requestingArea: string
    observations: string
    automaticSignature: boolean
    subtotal: number
    tax?: number
    retention?: number
    perception?: number
    detraction?: number
    total: number
    supplier?: Supplier
    bank?: Bank
    details: Detail[]
}

export interface Supplier {
    ruc: string
    description?: string
    address?: string
}

export interface Bank {
    name: string
    account: string
    cci: string
    accountType: AccountType
}

export interface Detail {
    numbering: string
    code: null
    product: string
    quantity: number
    unit: string
    price: number
    discount: null
    amount: number
}
