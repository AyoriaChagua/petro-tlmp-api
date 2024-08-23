import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UserRole } from '../user-roles/user-role.entity';

@Entity('ROL_MP')
export class Role {
    @PrimaryGeneratedColumn({ name: 'ID_ROL' })
    id: number;

    @Column({ name: 'DESCRIPCION', type: 'nvarchar', length: 100 })
    description: string;

    @CreateDateColumn({ name: 'FECHA_SISTEMA', type: 'date', default: () => 'GETDATE()' })
    systemDate: Date;

    @OneToMany(() => UserRole, userRole => userRole.role)
    userRoles: UserRole[];
}
