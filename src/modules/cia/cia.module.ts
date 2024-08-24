import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cia } from './cia.entity';
import { CiaService } from './cia.service';
import { CiaController } from './cia.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Cia])],
    providers: [CiaService],
    controllers: [CiaController],
    exports: [TypeOrmModule, CiaService],
})
export class CiaModule { }
