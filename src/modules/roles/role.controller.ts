import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    async createRole(@Body('description') description: string): Promise<Role> {
        return this.roleService.createRole(description);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllRoles(): Promise<Role[]> {
        return this.roleService.findAllRoles();
    }

    @Get(':id')
    async getRoleById(@Param('id') id: number): Promise<Role> {
        return this.roleService.findRoleById(id);
    }
}
