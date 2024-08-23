import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(
        @Body('id') id: string,
        @Body('password') password: string,
    ) {
        const user = await this.authService.validateUser(id, password);
        if (user) {
            return this.authService.login(user);
        }
        return { message: 'Invalid credentials' };
    }
}
