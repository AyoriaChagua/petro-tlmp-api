import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(id: string, description: string, password: string): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ id, description, passwordHash });
    return this.userRepository.save(user);
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async getUserRoles(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.role'],
    });
  }

  async validateUser(id: string, password: string): Promise<User | null> {
    const user = await this.findUserById(id);
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      return user;
    }
    return null;
  }
}
