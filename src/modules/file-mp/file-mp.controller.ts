import { Controller, Get, Post, Param, Body, UseInterceptors, UploadedFile, Res, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileMPService } from './file-mp.service';
import { CreateFileMPDto } from './dto/create-file-mp.dto';
import { diskStorage } from 'multer';
import { promises as fsPromises } from 'fs'

@Controller('file-mp')
export class FileMPController {
    constructor(private readonly fileMPService: FileMPService) { }
    @Get('check/:orderDocumentNumber/:companyId/:fileTypeId')
    async checkFileExists(
        @Param('orderDocumentNumber') orderDocumentNumber: string,
        @Param('companyId') companyId: string,
        @Param('fileTypeId') fileTypeId: string,
    ) {
        return this.fileMPService.checkFileExists(orderDocumentNumber, companyId, fileTypeId);
    }

    @Get('download/:id')
    async downloadFile(@Param('id') id: number, @Res() res: Response) {
        try {
            const file = await this.fileMPService.getFileById(id);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename=${file.fileName}`);
            res.setHeader('X-FileName', file.fileName);
            res.send(file.file);
        } catch (error) {
            if (error instanceof NotFoundException) {
                res.status(404).json({ error: 'Archivo no encontrado' });
            } else {
                res.status(500).json({ error: 'Error al obtener el archivo' });
            }
        }
    }

    @Get(':orderDocumentNumber/:companyId')
    async getByOrderDocumentAndCompany(
        @Param('orderDocumentNumber') orderDocumentNumber: string,
        @Param('companyId') companyId: string,
    ) {
        return this.fileMPService.getByOrderDocumentAndCompany(orderDocumentNumber, companyId);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
                cb(null, randomName + '-' + file.originalname);
            },
        })
    }))
    async create(@UploadedFile() file: Express.Multer.File, @Body() createFileMPDto: CreateFileMPDto) {
        if (file) {
            // console.log("file.buffer", file.buffer)
            // console.log("file.originalname", file.originalname)
            createFileMPDto.file = await fsPromises.readFile(file.path);
            createFileMPDto.fileName = file.originalname;

            // createFileMPDto.file = file.buffer;
            // createFileMPDto.fileName = file.originalname;
        } else {
            console.log("sin archivos... y sin ella 😖")
            createFileMPDto.file = null;
            createFileMPDto.fileName = null;
        }
        return this.fileMPService.create(createFileMPDto);
    }


}