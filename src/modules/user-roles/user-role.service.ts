import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRolesRepository: Repository<UserRole>,
  ) { }

  async findAll(): Promise<UserRole[]> {
    return this.userRolesRepository.find({ relations: ['role', 'user'] });
  }

  async findOne(roleId: number, userId: string): Promise<UserRole> {
    return this.userRolesRepository.findOne({
      where: { roleId, userId },
      relations: ['role', 'user'],
    });
  }

  async create(userRole: Partial<UserRole>[]): Promise<UserRole[]> {
    const newUserRoles = this.userRolesRepository.create(userRole);
    return this.userRolesRepository.save(newUserRoles);
  }

  async update(userId: string, userRole: Partial<UserRole>[]): Promise<UserRole[]> {
    await this.userRolesRepository.delete({ userId });
    const newUserRoles = this.userRolesRepository.create(userRole);
    return this.userRolesRepository.save(newUserRoles);
  }

  async remove(roleId: number, userId: string): Promise<void> {
    await this.userRolesRepository.delete({ roleId, userId });
  }
}
