import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cia } from "./cia.entity";
import { Repository } from "typeorm";

@Injectable()
export class CiaService {
    constructor(
        @InjectRepository(Cia)
        private readonly ciaRepository: Repository<Cia>
    ) { }

    async findAll(): Promise<Cia[]> {
        return await this.ciaRepository.find();
    }
}