export class ExchangeRateDTO {
    date: Date;
    purchase_price: number;
    sale_price: number;
}

export class ExchangeRatePaginationDTO {
    quantity: number;
    exchangeRates: ExchangeRateDTO[];
}