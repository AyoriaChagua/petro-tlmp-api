import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';
import { SECRETKEY_JWT } from 'src/config/environments';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: SECRETKEY_JWT,
            signOptions: { expiresIn: '8h' },
        }),
    ],
    providers: [AuthService, AuthController, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, JwtModule]
})

export class AuthModule { }