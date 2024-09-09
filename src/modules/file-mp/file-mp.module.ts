import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FileMPController } from './file-mp.controller';
import { FileMPService } from './file-mp.service';
import { FileMP } from './file-mp.entity';
import { PaymentDocumentService } from '../document-payment/document-payment.service';
import { PaymentDocumentMP } from '../document-payment/document-payment.entity';
import { DatabaseErrorService } from 'src/shared/database-error.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([FileMP, PaymentDocumentMP]),
        MulterModule.register({
            dest: './uploads',
        }),
        
    ],
    controllers: [FileMPController],
    providers: [FileMPService, PaymentDocumentService, DatabaseErrorService],
    exports: [FileMPService, PaymentDocumentService, DatabaseErrorService],
})
export class FileMPModule { }