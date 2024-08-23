import { OrderMP } from 'src/order-mp/order-mp.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('AREA_SOLICITANTE_MP')
export class RequestingArea {
    @PrimaryGeneratedColumn({ name: 'ID_AREA', type: 'int' })
    id: number;

    @Column({ name: 'DESCRIPCION', type: 'varchar', length: 255, nullable: true })
    description: string;

    @Column({ name: 'ESTADO', type: 'varchar', length: 80, default: 'ACTIVO' })
    status: string;

    @OneToMany(() => OrderMP, order => order.resquestingArea)
    orders: OrderMP[];
}