import { Cia } from "src/cia/cia.entity";
import { OrderMP } from "src/order-mp/order-mp.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('CENTRO_COSTO')
export class CostCenter {
    @PrimaryGeneratedColumn({ name: 'ID_CENTRO_COSTO', type: 'int' })
    id: number;

    @Column({ name: 'CIA', type: 'varchar', length: 5, nullable: true })
    companyId: string;

    @Column({ name: 'DESCRIPCION', type: 'varchar', length: 50, nullable: true })
    description: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'date', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    systemDate: Date;

    @Column({ name: 'USUARIO_SISTEMA', type: 'varchar', length: 20, nullable: true })
    systemUser: string;

    @Column({ name: 'FLAG_ACTIVO', type: 'bit', default: true })
    isActive: boolean;

    @ManyToOne(() => Cia)
    @JoinColumn({ name: 'CIA', referencedColumnName: 'companyId' })
    company: Cia;

    @OneToMany(() => OrderMP, order => order.costCenter)
    orders: OrderMP[];
}