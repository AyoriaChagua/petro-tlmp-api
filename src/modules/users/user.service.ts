import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserWithRolesDto } from './dto/user-data.dto';
import { ChangePassAdminDto } from './dto/change-pass-admin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAllUsers(): Promise<UserWithRolesDto[]> {
    const users = await this.userRepository.find({
      relations: ['userRoles', 'userRoles.role'],
      select: ["id", "description", 'userRoles', "isActive"]
    });

    return users.map(user => ({
      id: user.id,
      description: user.description,
      isActive: user.isActive,
      userRoles: user.userRoles.map(userRole => ({
        id: userRole.role.id,
        description: userRole.role.description
      }))
    }));
  }

  async findUserById(id: string): Promise<UserWithRolesDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.role'],
      select: ["id", "description", 'isActive', "userRoles"]
    });
    return {
      id: user.id,
      description: user.description,
      isActive: user.isActive,
      userRoles: user.userRoles.map(userRole => ({
        id: userRole.role.id,
        description: userRole.role.description
      }))
    };
  }

  async getUserRoles(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.role'],
      select: ["description", "id", "userRoles"]
    });
  }

  async createUser(id: string, description: string, password: string): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ id, description, passwordHash });
    return this.userRepository.save(user);
  }

  async updateUser(id: string, description: string): Promise<UserWithRolesDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      user.description = description;
      await this.userRepository.save(user);
      return this.findUserById(id);
    }
    return null;
  }

  async toggleUserStatus(id: string): Promise<UserWithRolesDto> {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    user.isActive = !user.isActive;
    await this.userRepository.save(user);
    return this.findUserById(id);
  }

  async changePassword(id: string, oldPassword: string, newPassword: string): Promise<void | null> {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    if (user && await bcrypt.compare(oldPassword, user.passwordHash)) {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      user.passwordHash = passwordHash;
      await this.userRepository.save(user);
      return;
    }
    return null;
  };

  async changePasswordByAdmin(changePassDto: ChangePassAdminDto): Promise<void | null> {
    const user = await this.userRepository.findOne({
      where: { id: changePassDto.userId }
    });
    if (changePassDto.roleId === 3) {
      const passwordHash = await bcrypt.hash(changePassDto.newPassword, 10);
      user.passwordHash = passwordHash;
      await this.userRepository.save(user);
      return;
    }
    return null;
  };

  async validateUser(id: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    if (user && user.isActive && await bcrypt.compare(password, user.passwordHash)) {
      return user;
    }
    return null;
  }

  async saveProfilePhoto(userId: string, profilePhoto: Buffer) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      user.profilePhoto = profilePhoto;
      await this.userRepository.save(user);
      return;
    }
    return null;
  }

  async getProfilePhoto(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId }, select: ["profilePhoto"] });
    if (!user || !user.profilePhoto) {
      throw new NotFoundException(`Photo not found for ${user}`);
    }
    return user.profilePhoto;
  }

}
