import { DataSource, EntityRepository, Repository } from "typeorm";
import { EmailMP } from "./email-mp.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailMPRepository extends Repository<EmailMP>  {

    async countEmailsSentToday(): Promise<number> {
        const todayBatch = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
        return this.createQueryBuilder('email_mp')
            .where('email_mp.dailyBatch = :batch', {batch: todayBatch})
            .andWhere('email_tracker.sendStatus = :status', {status: 'sent'})
            .getCount();
    }
}