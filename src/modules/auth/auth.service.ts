import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserRolesService } from 'src/modules/user-roles/user-role.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(id: string, password: string): Promise<any> {
        const user = await this.userService.validateUser(id, password);
        if (user) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const roles = (await this.userService.getUserRoles(user.id)).userRoles.map(userRole => userRole.role.description);
        const payload = { id: user.id, description: user.description, roles };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}


