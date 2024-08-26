import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserRolesService } from './user-role.service';
import { UserRole } from './user-role.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('user-roles')
export class UserRolesController {
    constructor(private readonly userRolesService: UserRolesService) { }

    @Get()
    async findAll(): Promise<UserRole[]> {
        return this.userRolesService.findAll();
    }

    @Get(':roleId/:userId')
    async findOne(@Param('roleId') roleId: number, @Param('userId') userId: string): Promise<UserRole> {
        return this.userRolesService.findOne(roleId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() userRole: Partial<UserRole>[]): Promise<UserRole[]> {
        return this.userRolesService.create(userRole);
    }

    @Put(':userId')
    async update(
        @Param('userId') userId: string,
        @Body() userRole: Partial<UserRole[]>,
    ): Promise<UserRole[]> {
        return this.userRolesService.update(userId, userRole);
    }

    @Delete(':roleId/:userId')
    async remove(@Param('roleId') roleId: number, @Param('userId') userId: string): Promise<void> {
        return this.userRolesService.remove(roleId, userId);
    }
}
