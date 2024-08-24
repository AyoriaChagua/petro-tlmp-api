import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../roles/role.entity';
import { User } from '../users/user.entity';

@Entity('USUARIO_ROL_MP')
export class UserRole {
    @PrimaryColumn({ name: 'ID_ROL', type: 'int' })
    roleId: number;

    @PrimaryColumn({ name: 'ID_USUARIO', type: 'nvarchar', length: 50 })
    userId: string;

    @ManyToOne(() => Role, role => role.userRoles)
    @JoinColumn({ name: 'ID_ROL' })
    role: Role;

    @ManyToOne(() => User, user => user.userRoles)
    @JoinColumn({ name: 'ID_USUARIO' })
    user: User;
}
