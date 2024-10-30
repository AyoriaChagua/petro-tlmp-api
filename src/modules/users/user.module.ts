import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [TypeOrmModule.forFeature([User]), MulterModule.register({ limits: { fileSize: 5 * 1024 * 1024 } })],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }
