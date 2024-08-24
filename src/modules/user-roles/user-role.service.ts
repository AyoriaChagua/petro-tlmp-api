import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRolesRepository: Repository<UserRole>,
  ) {}

  async findAll(): Promise<UserRole[]> {
    return this.userRolesRepository.find({ relations: ['role', 'user'] });
  }

  async findOne(roleId: number, userId: string): Promise<UserRole> {
    return this.userRolesRepository.findOne({
      where: { roleId, userId },
      relations: ['role', 'user'],
    });
  }

  async create(userRole: UserRole): Promise<UserRole> {
    return this.userRolesRepository.save(userRole);
  }

  async update(roleId: number, userId: string, userRole: Partial<UserRole>): Promise<UserRole> {
    await this.userRolesRepository.update({ roleId, userId }, userRole);
    return this.findOne(roleId, userId);
  }

  async remove(roleId: number, userId: string): Promise<void> {
    await this.userRolesRepository.delete({ roleId, userId });
  }
}
