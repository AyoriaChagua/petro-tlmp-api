import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailMP } from './email-mp.entity';
import { EmailMPService } from './email-mp.service';
import { EmailMPController } from './email-mp.controller';
import { EmailMPRepository } from './email-mp.repository';

@Module({
    imports: [TypeOrmModule.forFeature([EmailMP, EmailMPRepository])],
    controllers: [EmailMPController],
    providers: [EmailMPService],
})
export class EmailMPModule {}