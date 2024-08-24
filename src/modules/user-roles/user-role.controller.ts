import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserRolesService } from './user-role.service';
import { UserRole } from './user-role.entity';

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

    @Post()
    async create(@Body() userRole: UserRole): Promise<UserRole> {
        return this.userRolesService.create(userRole);
    }

    @Put(':roleId/:userId')
    async update(
        @Param('roleId') roleId: number,
        @Param('userId') userId: string,
        @Body() userRole: Partial<UserRole>,
    ): Promise<UserRole> {
        return this.userRolesService.update(roleId, userId, userRole);
    }

    @Delete(':roleId/:userId')
    async remove(@Param('roleId') roleId: number, @Param('userId') userId: string): Promise<void> {
        return this.userRolesService.remove(roleId, userId);
    }
}
