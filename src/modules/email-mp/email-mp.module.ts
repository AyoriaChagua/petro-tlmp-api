import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailMP } from './email-mp.entity';
import { EmailMPService } from './email-mp.service';
import { EmailMPController } from './email-mp.controller';

@Module({
    imports: [TypeOrmModule.forFeature([EmailMP])],
    controllers: [EmailMPController],
    providers: [EmailMPService],
})
export class EmailMPModule {}