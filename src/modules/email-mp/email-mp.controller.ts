import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EmailMPService } from './email-mp.service';
import { CreateEmailMPDto } from './dto/create-email-mp.dto';
import { EmailMP } from './email-mp.entity';

@Controller('emails')
export class EmailMPController {
    constructor(private readonly emailMPService: EmailMPService) {}

    @Get(':userId')
    async getEmailsByUserId(@Param('userId') userId: number): Promise<EmailMP[]> {
        return this.emailMPService.getEmailsByUserId(userId);
    }

    @Post()
    async createEmail(@Body() createEmailDto: CreateEmailMPDto): Promise<EmailMP> {
        return this.emailMPService.createEmail(createEmailDto);
    }
}
