import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmailMP } from "./email-mp.entity";
import { CreateEmailMPDto } from "./dto/create-email-mp.dto";
import * as nodemailer from 'nodemailer';
import { emailCredentialsMap } from "src/utils/maps/email";
//import { EmailMPRepository } from "./email-mp.repository";

@Injectable()
export class EmailMPService {

    private readonly MAX_DAILY_EMAILS = 1200

    constructor(
        @InjectRepository(EmailMP)
        private readonly emailMPRepository: Repository<EmailMP>
    ) { }

    /*
    private async canSendMoreEmails(): Promise<boolean> {
        const emailsSentToday = await this.emailMPRepository.countEmailsSentToday();
        return emailsSentToday < this.MAX_DAILY_EMAILS;
    }*/

    async getEmailsByUserId(userId: string): Promise<EmailMP[]> {
        try {
            const emails = await this.emailMPRepository.find({ where: { userId } });
            if (!emails.length) {
                throw new NotFoundException(`No emails found for user with ID ${userId}`);
            }
            return emails;
        } catch (error) {
            throw new InternalServerErrorException('Error retrieving emails');
        }
    }

    async sendEmail(
        userId: string,
        to: string,
        subject: string,
        text: string,
        attachments?: Express.Multer.File[]
    ): Promise<void> {
       // const sendEmail = await this.canSendMoreEmails();
        const todayBatch = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));


        const email = this.emailMPRepository.create({
            userId,
            recipientEmail: to,
            subject,
            body: text,
            sendMessage: 'Enviado',
            dailyBatch: todayBatch,
            sendStatus: 'pendiente'
        })
        try {
            const credentials = emailCredentialsMap[userId];
            if(!credentials) throw new Error("No se encontraron credenciales para el remitente: " + userId);
           // if(!sendEmail) throw new Error("El limite de envios diarios ha sido alcanzado");
            email.senderEmail = credentials.user;
            const transporter = nodemailer.createTransport({
                host: credentials.host,
                port: credentials.port,
                secure: false,
                auth: {
                    user: credentials.user,
                    pass: credentials.pass
                }
            });

            await transporter.sendMail({
                from: credentials.user,
                to,
                subject,
                text,
                attachments: attachments?.map(attachment => ({
                    filename: attachment.originalname,
                    content: attachment.buffer
                }))
            });
            email.sendStatus = 'enviado';
        } catch (error) {
            email.sendStatus = 'no enviado',
            email.sendMessage = error.message;
        }
        await this.emailMPRepository.save(email);
    }

    async createEmail(createEmailDto: CreateEmailMPDto): Promise<EmailMP> {
        try {
            const email = this.emailMPRepository.create(createEmailDto);
            return await this.emailMPRepository.save(email);
        } catch (error) {
            throw new InternalServerErrorException('Error creating email');
        }
    }
}
