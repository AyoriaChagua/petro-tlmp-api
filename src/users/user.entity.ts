import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UserRole } from '../user-roles/user-role.entity';

@Entity('USUARIO_MP')
export class User {
    @PrimaryColumn({ name: 'ID_USUARIO', type: 'nvarchar', length: 50 })
    id: string;

    @Column({ name: 'DESCRIPCION', type: 'nvarchar', length: 150, unique: true })
    description: string;

    @Column({ name: 'PASSWORD_HASH', type: 'nvarchar', length: 255 })
    passwordHash: string;

    @CreateDateColumn({ name: 'FECHA_SISTEMA', type: 'date', default: () => 'GETDATE()' })
    systemDate: Date;

    @OneToMany(() => UserRole, userRole => userRole.user)
    userRoles: UserRole[];
}
