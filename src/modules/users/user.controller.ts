import { Controller, Post, Body, Get, Param, UseGuards, Patch, HttpCode, UnauthorizedException, BadRequestException, UseInterceptors, UploadedFile, Res, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserWithRolesDto } from './dto/user-data.dto';
import { ChangePassAdminDto } from './dto/change-pass-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import {Response} from 'express'
import multer from 'multer';
const imageFileFilter = (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (!file.mimetype.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
}

const multerOptions: MulterOptions = {
    fileFilter: imageFileFilter,
}

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

    @Get(':id/photo')
    async getProfilePhoto(@Param('id') id: string, @Res() res: Response): Promise<void> {
        const photoBuffer = await this.userService.getProfilePhoto(id);
        if(!photoBuffer) {
            throw new NotFoundException('Profile photo not found');
        }
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(photoBuffer); 
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
    @Post(':id/upload')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async uploadProfilePhoto(
        @Param('id') userId: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        if(!file) throw new BadRequestException(`No file provided`);
        await this.userService.saveProfilePhoto(userId, file.buffer);
        return { message: 'Profile photo uploaded successfully!' };
    }




    @UseGuards(JwtAuthGuard)
    @Patch('change-password-by-admin')
    async changePasswordByAdmin(@Body() changePassDto: ChangePassAdminDto): Promise<void> {
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
