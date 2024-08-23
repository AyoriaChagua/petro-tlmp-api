import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(
        @Body('id') id: string,
        @Body('description') description: string,
        @Body('password') password: string,
    ): Promise<User> {
        return this.userService.createUser(id, description, password);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.findUserById(id);
    }

    @Get(':id/roles')
    async getUserRoles(@Param('id') id: string): Promise<User> {
        return this.userService.getUserRoles(id);
    }
}
