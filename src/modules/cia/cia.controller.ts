import { Controller, Get, UseGuards } from "@nestjs/common";
import { CiaService } from "./cia.service";
import { Cia } from "./cia.entity";

@Controller("cia")
export class CiaController {
    constructor(
        private readonly ciaService: CiaService
    ) { }

    @Get()
    async getAll(): Promise<Cia[]> {
        return await this.ciaService.findAll();
    }
}