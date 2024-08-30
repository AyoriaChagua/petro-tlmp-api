import { Controller, Post, Body, Get, Param, UseGuards, Patch, HttpCode, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserWithRolesDto } from './dto/user-data.dto';
import { ChangePassAdminDto } from './dto/change-pass-admin.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<UserWithRolesDto[]> {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserWithRolesDto> {
        return this.userService.findUserById(id);
    }

    @Get(':id/roles')
    async getUserRoles(@Param('id') id: string): Promise<User> {
        return this.userService.getUserRoles(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('register')
    async register(
        @Body('id') id: string,
        @Body('description') description: string,
        @Body('password') password: string,
    ): Promise<User> {
        return this.userService.createUser(id, description, password);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-password-by-admin')
    async changePasswordByAdmin( @Body() changePassDto: ChangePassAdminDto): Promise<void> {
        const result = await this.userService.changePasswordByAdmin(changePassDto);
        if (result === null) {
            throw new UnauthorizedException('Could not change password');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-password-by-user/:userId')
    async changePasswordByUser(
        @Param('userId') userId: string,
        @Body('newPassword') newPassword: string,
        @Body('oldPassword') oldPassword: string
    ): Promise<void> {
        const result = await this.userService.changePassword(userId, oldPassword, newPassword);
        if (result === null) {
            throw new UnauthorizedException('Could not change password');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body('description') description: string
    ): Promise<UserWithRolesDto> {
        return this.userService.updateUser(id, description);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/status')
    async toggleUserStatus(@Param('id') id: string): Promise<UserWithRolesDto> {
        return this.userService.toggleUserStatus(id);
    }



}
