import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async createRole(description: string): Promise<Role> {
        const role = this.roleRepository.create({ description });
        return this.roleRepository.save(role);
    }

    async findAllRoles(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    async findRoleById(id: number): Promise<Role> {
        return this.roleRepository.findOneBy({ id });
    }
}
