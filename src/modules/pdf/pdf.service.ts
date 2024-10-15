import { Injectable } from "@nestjs/common";
import { jsPDF } from "jspdf";
import { TableOptions, TextOptions } from "./pdf.interface";
import autoTable from "jspdf-autotable";
import * as fs from 'fs';

@Injectable()
export class PdfService {
  private doc: jsPDF;
  private readonly xMargin = 30;
  private readonly yMargin = 40;
  private x: number;
  private y: number;


  constructor() {
    this.doc = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: 'a4'
    })
    this.resetXandY();
    this.updatePointer();
  };

  async resetDocument() {
    this.doc = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: 'a4'
    });
    this.resetXandY();
    this.updatePointer();
  }

  private resetXandY() {
    this.x = this.xMargin;
    this.y = this.yMargin;
  };

  private updatePointer() {
    this.doc.moveTo(this.x, this.y)
  };

  async addNewPage() {
    this.doc.addPage();
    this.resetXandY();
    this.updatePointer();
  };

  async addText(text: string, options?: TextOptions) {
    this.doc.addFont('./assets/fonts/arial.ttf', 'Arial', 'normal');

    if (options?.fontSize) {
      this.doc.setFontSize(options.fontSize);
    }

    if (options?.isBlack) {
      this.doc.addFont('./assets/fonts/ariblk.ttf', 'Arial-Black', 'normal');
      this.doc.setFont('Arial-Black');
    }

    if (options?.isBold) {
      this.doc.addFont('./assets/fonts/arialbd.ttf', 'Arial-Bold', 'normal');
      this.doc.setFont('Arial-Bold');
    }


    if (options?.color) {
      if (options.color === 'primary') {
        this.doc.setTextColor(5, 92, 187);
      } else if (options.color === 'secondary') {
        this.doc.setTextColor(78, 78, 78);
      }
    }

    let xPos = options?.x || this.x;
    const pageWidth = this.doc.internal.pageSize.width;
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;

    if (options?.align === "center") {
      xPos = pageWidth / 2;
    }

    const lines = this.doc.splitTextToSize(text, maxWidth);

    this.doc.text(
      lines,
      xPos,
      options?.y || this.y,
      {
        align: options?.align || "left",
        maxWidth: options?.maxWidth || maxWidth
      }
    );

    this.doc.setFont('Arial');
    this.doc.setFontSize(12);
    this.doc.setTextColor(0, 0, 0);
    this.updatePointer();
  }

  async addNewLine(size: number = 25) {
    this.y += size;
    this.x = this.xMargin;
    this.updatePointer();
  };

  async addTable<T>(data: T[], headers: string[], options?: TableOptions) {
    const mergedOptions: TableOptions = {
      ignoreFields: [],
      ...options,
      startY: this.y + 10
    };

    const rows = Array(20).fill(null).map((_, index) => {
      if (index < data.length) {
        return Object.values(data[index]);
      } else {
        return headers.map(() => "");
      }
    });

    autoTable(this.doc, {
      head: [headers],
      body: rows,
      ...mergedOptions,
    });

    this.y = (this.doc as any).lastAutoTable.finalY + this.doc.getLineHeight();
    this.updatePointer();
  };


  async addAuthorizationBox(approver: string, withSignature: boolean = false) {
    const startX = this.x - 5;
    const startY = this.y - 5;
    const width = 350;
    const headerHeight = 15;
    const rowHeight = 70;
    const footerHeight = 15;

    this.doc.rect(startX, startY, width, headerHeight + rowHeight + footerHeight);

    this.doc.line(startX, startY + headerHeight, startX + width, startY + headerHeight);

    this.doc.line(startX, startY + headerHeight + rowHeight, startX + width, startY + headerHeight + rowHeight);
    this.doc.line(startX + width / 2, startY + headerHeight, startX + width / 2, startY + headerHeight + rowHeight);

    this.doc.line(startX + width / 2, startY + headerHeight + rowHeight, startX + width / 2, startY + headerHeight + rowHeight + footerHeight);

    this.doc.setFontSize(12);
    this.addText('AUTORIZACIONES', { x: startX + 5, y: startY + 10, fontSize: 7, isBlack: true, isBold: true });
    this.addText('AUTORIZADO POR:', { x: startX + 5, y: startY + headerHeight + rowHeight + 10, fontSize: 7, isBlack: true, isBold: true });
    this.addText('ROIMY MATOS', { x: startX + 75, y: startY + headerHeight + rowHeight + 10, fontSize: 7 });
    this.addText('AUTORIZADO POR:', { x: startX + width / 2 + 5, y: startY + headerHeight + rowHeight + 10, fontSize: 7, isBlack: true, isBold: true });

    if (approver === "JACKELYN VIERA") {
      this.addText(approver.toUpperCase(), { x: startX + width / 2 + 75, y: startY + headerHeight + rowHeight + 10, fontSize: 7 });

    }



    if (withSignature && approver === "JACKELYN VIERA") {

      const imgBuffer = fs.readFileSync('./assets/images/signature.png');
      const base64Image = imgBuffer.toString('base64');
      this.doc.addImage(
        base64Image,
        'JPEG',
        startX + width / 2 + 20,
        startY + headerHeight + 1,
        120,
        85
      );
    }

    this.x = startX + 5;
    this.y = startY + headerHeight + rowHeight + 20;
    this.updatePointer();
  }

  async render(fileName: string): Promise<string> {
    await this.addPageNumbers();
    return new Promise<string>((resolve, reject) => {
      this.doc.save(fileName);
      resolve(fileName);
    })
  };

  private async addPageNumbers() {
    const pageCount = (this.doc as any).internal.getNumberOfPages();
    for (let i = 0; i < pageCount; i++) {
      this.doc.setPage(i);
      const pageCurrent = (this.doc as any).internal.getCurrentPageInfo().pageNumber;
      this.doc.setFontSize(8);
      this.doc.text(
        'página: ' + pageCurrent + '/' + pageCount,
        this.xMargin,
        this.doc.internal.pageSize.height - this.yMargin / 2
      )
    }
  };
}