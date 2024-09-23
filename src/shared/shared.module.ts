import { Module } from "@nestjs/common";
import { DatabaseErrorService } from "./database-error.service";
import { PdfModule } from "src/modules/pdf/pdf.module";

@Module({
    imports: [PdfModule],
    providers: [DatabaseErrorService],
    exports: [DatabaseErrorService, PdfModule],
})
export class SharedModule { }