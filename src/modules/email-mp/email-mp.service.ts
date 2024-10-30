import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmailMP } from "./email-mp.entity";
import { CreateEmailMPDto } from "./dto/create-email-mp.dto";

@Injectable()
export class EmailMPService {
    constructor(
        @InjectRepository(EmailMP)
        private readonly emailMPRepository: Repository<EmailMP>
    ) { }

    async getEmailsByUserId(userId: number): Promise<EmailMP[]> {
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

    async createEmail(createEmailDto: CreateEmailMPDto): Promise<EmailMP> {
        try {
            const email = this.emailMPRepository.create(createEmailDto);
            return await this.emailMPRepository.save(email);
        } catch (error) {
            throw new InternalServerErrorException('Error creating email');
        }
    }
}
