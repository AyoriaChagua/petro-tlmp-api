import { Controller, Get, Post, Body, Param, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { EmailMPService } from './email-mp.service';
import { CreateEmailMPDto } from './dto/create-email-mp.dto';
import { EmailMP } from './email-mp.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('emails')
export class EmailMPController {
    constructor(private readonly emailMPService: EmailMPService) {}

    @Get(':userId')
    async getEmailsByUserId(@Param('userId') userId: string): Promise<EmailMP[]> {
        return this.emailMPService.getEmailsByUserId(userId);
    }

    @Post()
    async createEmail(@Body() createEmailDto: CreateEmailMPDto): Promise<EmailMP> {
        return this.emailMPService.createEmail(createEmailDto);
    }

    @Post('send')
    @UseInterceptors(FilesInterceptor('attachments'))
    async sendEmail(
        @Body('userId') userId: string,
        @Body('to') to: string,
        @Body('subject') subject: string,
        @Body('text') text: string,
        @UploadedFiles() attachments: Express.Multer.File[] 
    ): Promise<void> {
        await this.emailMPService.sendEmail(userId, to, subject, text, attachments);
    }
}
