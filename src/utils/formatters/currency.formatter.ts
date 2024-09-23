import { Currency } from "src/shared/types/order.type";

export const numberToText = (amount: number, currency: Currency) => {
    const units = ["", "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE"];
    const tens = ["DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISÉIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE"];
    const tens2 = ["", "", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
    const hundreds = ["", "CIENTO", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS", "QUINIENTOS", "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS"];

    const convertGroup = (n: number): string => {
        let result = "";
        if (n === 100) return "CIEN";
        if (n >= 100) {
            result += hundreds[Math.floor(n / 100)] + " ";
            n %= 100;
        };

        if (n >= 30) {
            result += tens2[Math.floor(n / 10)];
            if (n % 10 !== 0) result += " Y ";
            n %= 10;
        } else if (n >= 20) {
            result += "VEINTI";
            n %= 10;
        } else if (n >= 10) {
            return result + tens[n - 10]
        }

        if (n > 0) result += units[n];

        return result.trim();
    }

    const convertNumber = (n: number): string => {
        if (n === 0) return "CERO";

        const billions = Math.floor(n / 1000000000000);
        const millions = Math.floor((n % 1000000000000) / 1000000);
        const thousands = Math.floor((n % 1000000) / 1000);
        const units = Math.floor(n % 1000);

        let result = "";
        if (billions > 0) {
            result += convertGroup(billions) + " " + (billions === 1 ? "BILLÓN" : "BILLONES") + " ";
        }

        if (millions > 0) {
            result += convertGroup(millions) + " " + (millions === 1 ? "MILLÓN" : "MILLONES") + " ";
        }

        if (thousands > 0) {
            if (thousands === 1) {
                result += "MIL ";
            } else {
                result += convertGroup(thousands) + " MIL "
            }
        }

        if (units > 0 || result === "") {
            result += convertGroup(units);
        }

        return result.trim();
    }

    const [intPart, decimalPart] = amount.toFixed(2).split('.');
    const intAmount = parseInt(intPart, 10);
    const numberText = convertNumber(intAmount);

    let currencyText: string;

    switch (currency) {
        case "PEN":
            currencyText = "SOLES";
            break;
        case "EUR":
            currencyText = "EUROS";
            break;
        case "USD":
            currencyText = "DOLARES";
            break;
    }

    return `${numberText} ${decimalPart}/100 ${currencyText}`
}

export const formatCurrency = (amount: number = 0): string => {
    const roundedAmount = Math.round(amount * 100) / 100;
    const [integerPart, decimalPart = ''] = roundedAmount.toString().split('.');
    const formatIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedDecimalPart = decimalPart.padEnd(2, '0');
    return `${formatIntegerPart}.${formattedDecimalPart}`;
}
