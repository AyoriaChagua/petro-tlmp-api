import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PaymentDocumentService } from './document-payment.service';
import { CreatePaymentDocumentDto } from './dto/create-document-payment.dto';
import { PaymentDocumentMP } from './document-payment.entity';

@Controller('payment-documents')
export class PaymentDocumentController {
    constructor(private readonly paymentDocumentService: PaymentDocumentService) {}

    @Post()
    create(@Body() createPaymentDocumentDto: CreatePaymentDocumentDto): Promise<PaymentDocumentMP> {
        return this.paymentDocumentService.create(createPaymentDocumentDto);
    }

    @Get()
    findAll(): Promise<PaymentDocumentMP[]> {
        return this.paymentDocumentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<PaymentDocumentMP> {
        return this.paymentDocumentService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePaymentDocumentDto: Partial<CreatePaymentDocumentDto>): Promise<PaymentDocumentMP> {
        return this.paymentDocumentService.update(+id, updatePaymentDocumentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.paymentDocumentService.remove(+id);
    }
}