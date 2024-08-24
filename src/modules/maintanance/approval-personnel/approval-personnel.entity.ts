import { Cia } from 'src/modules/cia/cia.entity';
import { OrderMP } from 'src/modules/order-mp/order-mp.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('PERSONAL_APRUEBA_MP')
export class ApprovalPersonnel {
    @PrimaryGeneratedColumn({ name: 'ID_PERSONAL_APRUEBA', type: 'int' })
    id: number;

    @Column({ name: 'DESCRIPCION', type: 'varchar', length: 50, nullable: true })
    description: string;

    @Column({ name: 'TELEFONO', type: 'varchar', length: 9, nullable: true })
    phone: string;

    @Column({ name: 'USUARIO_SISTEMA', type: 'nchar', length: 20, nullable: true })
    systemUser: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'datetime2', nullable: true, default: 'getdate()' })
    systemDate: Date;

    @Column({ name: 'USUARIO_MOD', type: 'nchar', length: 20, nullable: true })
    modificationUser: string;

    @Column({ name: 'FECHA_MOD', type: 'datetime2', nullable: true })
    modificationDate: Date;

    @Column({ name: 'CIA', type: 'varchar', length: 5, nullable: true })
    companyId: string;

    @Column({ name: 'ACTIVO', type: 'bit', default: true })
    isActive: boolean;

    @ManyToOne(() => Cia)
    @JoinColumn({ name: 'CIA', referencedColumnName: 'companyId' })
    company: Cia;

    @OneToMany(() => OrderMP, order => order.approvalPersonnel)
    orders: OrderMP[];
}