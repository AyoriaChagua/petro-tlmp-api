import { Module } from "@nestjs/common";
import { DatabaseErrorService } from "./database-error.service";

@Module({
    providers: [DatabaseErrorService],
    exports: [DatabaseErrorService]
})
export class SharedModule { }