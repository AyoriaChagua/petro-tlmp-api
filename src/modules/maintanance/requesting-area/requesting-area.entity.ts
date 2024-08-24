import { OrderMP } from 'src/modules/order-mp/order-mp.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('AREA_SOLICITANTE_MP')
export class RequestingArea {
    @PrimaryGeneratedColumn({ name: 'ID_AREA', type: 'int' })
    id: number;

    @Column({ name: 'DESCRIPCION', type: 'varchar', length: 255, nullable: true })
    description: string;

    @Column({ name: 'FLAG_ACTIVO', type: 'bit',  default: true })
    isActive: boolean;

    @OneToMany(() => OrderMP, order => order.resquestingArea)
    orders: OrderMP[];
}