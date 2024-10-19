import { Injectable } from "@nestjs/common";
import { PdfService } from "src/modules/pdf/pdf.service";
import { Detail, Order } from "src/shared/interfaces/order.interface";
import { formatDate } from "../formatters/date.formatter";
import { formatCurrency, getCurrencyDescription, numberToText } from "../formatters/currency.formatter";

@Injectable()
export class OrderPdfGenerator {
    constructor(
        private pdfService: PdfService,
    ){}

    async generateOrderPdf(order: Order){
        await this.pdfService.resetDocument();


        const getChunks = () => {
            const chunks: Detail[][] = [];
            for (let i = 0; i < order.details.length; i += 20) {
                chunks.push(order.details.slice(i, i + 20));
            }
            return chunks
        }

        const chunks = getChunks();

        for (let index = 0; index < chunks.length; index++) {
            await this.pdfService.addText(order.companyName, {
                fontSize: 13,
                isBlack: true,
                color: "primary",
                align: "center",
            });
            await this.pdfService.addNewLine();
            await this.pdfService.addText(order.companyAddress, {
                color: "primary",
                align: "center",
                fontSize: 8,
            });
            await this.pdfService.addNewLine();
            await this.pdfService.addText("RUC: " + order.companyRuc, {
                color: "primary",
                align: "center",
                fontSize: 8,
            });
            await this.pdfService.addNewLine();
            await this.pdfService.addNewLine();

            await this.pdfService.addText(`${order.orderType} N° ${order.orderNumber}`, {
                fontSize: 12,
                align: "center",
                isBlack: true,
            });
            await this.pdfService.addNewLine(35);

            // supplier ruc
            await this.pdfService.addText(`RUC:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addText(order.supplier?.ruc.toUpperCase() ?? "", {
                fontSize: 7,
                x: 95
            });

            // usuario registra
            await this.pdfService.addText(`USUARIO:`, {
                fontSize: 7,
                isBold: true,
                x: 390
            });

            await this.pdfService.addText(order.user.toUpperCase(), {
                fontSize: 7,
                x: 445
            });

            await this.pdfService.addNewLine(10);

            // razon del proveedor
            await this.pdfService.addText(`PROVEEDOR:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addText(order.supplier?.description?.toUpperCase() ?? "", {
                fontSize: 7,
                x: 95
            });

            // issue date
            await this.pdfService.addText(`EMISIÓN:`, {
                fontSize: 7,
                isBold: true,
                x: 390
            });

            await this.pdfService.addText(formatDate(order.date), {
                fontSize: 7,
                x: 445
            });

            await this.pdfService.addNewLine(10);

            // supplier address
            await this.pdfService.addText(`DIRECCIÓN:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addText(order.supplier?.address?.toUpperCase() ?? "", {
                fontSize: 7,
                x: 95
            });

            //aprovel personnel
            await this.pdfService.addText(`APROBADO:`, {
                fontSize: 7,
                isBold: true,
                x: 390
            });

            await this.pdfService.addText(order.approver.toUpperCase(), {
                fontSize: 7,
                x: 445
            });

            await this.pdfService.addNewLine(10);

            //date
            await this.pdfService.addText(`FECHA:`, {
                fontSize: 7,
                isBold: true,
                x: 390
            });

            await this.pdfService.addText(formatDate(order.date), {
                fontSize: 7,
                x: 445
            });

            await this.pdfService.addNewLine(10);

            // proforma (campo en blanco)
            await this.pdfService.addText(`PROFORMA:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addNewLine(10);

            // bank
            await this.pdfService.addText(`BANCO:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addText(order.bank?.name ?? "", {
                fontSize: 7,
                x: 95
            });

            // account type (ahorros, corriente, detracción)
            await this.pdfService.addText(`CUENTA:`, {
                fontSize: 7,
                isBold: true,
                x: 190
            });

            await this.pdfService.addText(order.bank?.accountType ?? "", {
                fontSize: 7,
                x: 230
            });

            //cost center
            await this.pdfService.addText(`DESTINO:`, {
                fontSize: 7,
                isBold: true,
                x: 390
            });

            await this.pdfService.addText(order.costCenter.toUpperCase(), {
                fontSize: 7,
                x: 445
            });

            await this.pdfService.addNewLine(10);

            // account number
            await this.pdfService.addText(`N° CUENTA:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addText(order.bank?.accountType !== "DETRACCION" && order?.bank.account, {
                fontSize: 7,
                x: 95
            });

            // cci
            await this.pdfService.addText(`CCI:`, {
                fontSize: 7,
                isBold: true,
                x: 190
            });

            await this.pdfService.addText(order.bank?.cci ?? "", {
                fontSize: 7,
                x: 230
            });

            await this.pdfService.addNewLine(10);

            // detraction account
            await this.pdfService.addText(`CTA. DETRACCIÓN:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addText((order.bank?.accountType === "DETRACCION") ? order?.bank.account : "", {
                fontSize: 7,
                x: 95
            });

            await this.pdfService.addNewLine(10);

            // payment method
            await this.pdfService.addText(`FORMA DE PAGO:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addText(order.paymentMethod, {
                fontSize: 7,
                x: 95
            });

            // currency
            await this.pdfService.addText(`MONEDA:`, {
                fontSize: 7,
                isBold: true,
                x: 190
            });

            await this.pdfService.addText(getCurrencyDescription(order.currency), {
                fontSize: 7,
                x: 230
            });

            this.pdfService.addTable(
                chunks[index],
                ["ITEM", "CÓDIGO", "DESCRIPCIÓN", "CANTIDAD", "UNIDAD", "PRECIO", "DSCT", "IMPORTE"],
                {
                    styles: {
                        cellPadding: 1.5,
                        fontSize: 6,
                    },
                    headStyles: {
                        fillColor: [5, 92, 187],
                    },
                    margin: {
                        horizontal: 25
                    }
                }
            );


            await this.pdfService.addNewLine(10);

            // supplier address
            await this.pdfService.addText(`ÁREA SOLICITANTE:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addText(order.requestingArea.toUpperCase(), {
                fontSize: 7,
                x: 100
            });

            //Subtotal
            await this.pdfService.addText(`SUBTOTAL`, {
                fontSize: 7,
                isBold: true,
                x: 390
            });

            await this.pdfService.addText(formatCurrency(order.subtotal), {
                fontSize: 7,
                x: 445
            });

            await this.pdfService.addNewLine(10);
            //afecto
            await this.pdfService.addText(`NO AFECTO`, {
                fontSize: 7,
                isBold: true,
                x: 390
            });

            await this.pdfService.addText(order.tax ? "SI" : "-", {
                fontSize: 7,
                x: 445
            });


            await this.pdfService.addNewLine(10);
            //IG
            await this.pdfService.addText(`${order.tax ? "IGV" : "RTA 4TA 8%"}`, {
                fontSize: 7,
                isBold: true,
                x: 390
            });

            await this.pdfService.addText(formatCurrency(order.tax ?? order.retention), {
                fontSize: 7,
                x: 445
            });

            await this.pdfService.addNewLine(10);
            //
            await this.pdfService.addText(`SON:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addText(numberToText(order.total, order.currency), {
                fontSize: 7,
                x: 100
            });

            //TOTAL
            await this.pdfService.addText(`TOTAL`, {
                fontSize: 7,
                isBold: true,
                x: 390
            });

            await this.pdfService.addText(formatCurrency(order.total), {
                fontSize: 7,
                x: 445
            });

            await this.pdfService.addNewLine(10);
            //peception 
            await this.pdfService.addText(`${order.detraction ? "DETRACCIÓN" : order.perception ? "PERCEPCIÓN" : ""}`, {
                fontSize: 7,
                isBold: true,
                x: 390
            });

            await this.pdfService.addText((order.detraction || order.perception) ? formatCurrency(order.detraction ?? order.perception) : "", {
                fontSize: 7,
                x: 445
            });


            await this.pdfService.addNewLine(20);

            // observations
            await this.pdfService.addText(`OBSERVACIONES:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addText(order.observations.toUpperCase(), {
                fontSize: 7,
                x: 100,
                maxWidth: 450
            });

            await this.pdfService.addNewLine(30);

            await this.pdfService.addAuthorizationBox(order.approver, order.automaticSignature);

            await this.pdfService.addNewLine(20);

            await this.pdfService.addText(`NOTA:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addText(`LA FECHA DE VENCIMIENTO DE LA FACTURA SE CALCULARÁ A PARTIR DE LA FECHA DE RECEPCIÓN DEL DOCUMENTO`.toUpperCase(), {
                fontSize: 7,
                x: 50,
                maxWidth: 450
            });

            await this.pdfService.addNewLine(12);
            await this.pdfService.addText(`IMPORTANTE:`, {
                fontSize: 7,
                isBold: true,
                x: 25
            });

            await this.pdfService.addNewLine(12);
            await this.pdfService.addText(`Adjuntar una copia de la Orden de Compra con la presentación de la factura`, {
                fontSize: 7,
                x: 25
            });

            await this.pdfService.addNewLine(10);
            await this.pdfService.addText(`Indicar el número de la Orden de Compra tanto en la Guía de Remisión como en la Factura`, {
                fontSize: 7,
                x: 25
            });

            await this.pdfService.addNewLine(10);
            await this.pdfService.addText(`De existir diferencias entre los precios acordados y los indicados en la Orden de Compra, debera coordinar y confirmar antes de atenderla`, {
                fontSize: 7,
                x: 25
            });

            await this.pdfService.addNewLine(10);
            await this.pdfService.addText(`Las clausulas generales de contratación adjuntas a la presente Orden, formaran parte integral de la presente orden`, {
                fontSize: 7,
                x: 25
            });

            if (index !== chunks.length - 1) {
                this.pdfService.addNewPage();
            }

        }

        return await this.pdfService.render(`${order.orderType} N° ${order.orderNumber}`);
    }
}