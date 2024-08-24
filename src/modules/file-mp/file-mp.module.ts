import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FileMPController } from './file-mp.controller';
import { FileMPService } from './file-mp.service';
import { FileMP } from './file-mp.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([FileMP]),
        MulterModule.register({
            dest: './uploads',
        }),
    ],
    controllers: [FileMPController],
    providers: [FileMPService],
    exports: [FileMPService],
})
export class FileMPModule { }