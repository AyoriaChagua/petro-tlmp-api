export type AccountType = "DETRACCION" | "CORRIENTE" | "AHORROS";
export type Currency = "PEN" | "EUR" | "USD";

export enum CurrencyEnum {
    PEN = 'PEN',
    USD = 'USD',
    EUR = 'EUR',
}

export enum OrderTypeEnum {
    "O/C" = 'ORDEN DE COMPRA',
    "O/P" = 'ORDEN DE PAGO',
    "O/S" = 'ORDEN DE SERVICIO',
}

export enum AccountTypeEnum {
    DETRACCION = 'DETRACCION',
    CORRIENTE = 'CORRIENTE',
    AHORROS = 'AHORROS',
}