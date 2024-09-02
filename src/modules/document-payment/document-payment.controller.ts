import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PaymentDocumentService } from './document-payment.service';
import { CreatePaymentDocumentDto } from './dto/create-document-payment.dto';
import { PaymentDocumentMP } from './document-payment.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('payment-documents')
export class PaymentDocumentController {
    constructor(private readonly paymentDocumentService: PaymentDocumentService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createPaymentDocumentDto: CreatePaymentDocumentDto): Promise<PaymentDocumentMP> {
        return this.paymentDocumentService.create(createPaymentDocumentDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<PaymentDocumentMP[]> {
        return this.paymentDocumentService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':companyId/:orderDocumentNumber')
    findByDocument(@Param('companyId') companyId: string, @Param('orderDocumentNumber') orderDocumentNumber: string): Promise<PaymentDocumentMP[]> {
        return this.paymentDocumentService.findByDocument(companyId, orderDocumentNumber);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<PaymentDocumentMP> {
        return this.paymentDocumentService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updatePaymentDocumentDto: Partial<CreatePaymentDocumentDto>): Promise<PaymentDocumentMP> {
        return this.paymentDocumentService.update(+id, updatePaymentDocumentDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.paymentDocumentService.remove(+id);
    }
}