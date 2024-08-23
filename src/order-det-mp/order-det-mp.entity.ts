import { OrderMP } from 'src/order-mp/order-mp.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'ORDEN_DET_MP' })
export class OrderDetail {
    @PrimaryGeneratedColumn({ name: 'ID_ORDEN_DET' })
    orderDetailId: number;

    @Column({ name: 'PRODUCTO', type: 'text', nullable: true })
    product: string;

    @Column({ name: 'CANTIDAD', type: 'int', nullable: true })
    quantity: number;

    @Column({ name: 'PRECIO_UNITARIO', type: 'decimal', precision: 10, scale: 3, nullable: true })
    unitPrice: number;

    @Column({ name: 'SUBTOTAL', type: 'decimal', precision: 10, scale: 3, nullable: true })
    subtotal: number;

    @Column({ name: 'USUARIO', type: 'varchar', length: 50, nullable: true })
    user: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'datetime', nullable: true })
    systemDate: Date;

    @Column({ name: 'USUARIO_MOD', type: 'varchar', length: 50, nullable: true })
    modifiedUser: string;

    @Column({ name: 'FECHA_MOD', type: 'datetime', nullable: true })
    modifiedDate: Date;


    @Column({ name: 'ELIMINADO', type: 'bit', default: false })
    deleted: boolean;

    @Column({ name: 'MEDIDA', type: 'varchar', length: 20, nullable: true })
    measurement: string;

    @Column({ name: 'CIA', type: 'varchar', length: 5 })
    cia: string;

    @Column({ name: 'ID_TIPO_ORDEN', type: 'nchar', length: 4 })
    orderTypeId: string;

    @Column({ name: 'CORRELATIVO', type: 'nvarchar', length: 8 })
    correlative: string;

    @Column({ name: 'PERIODO', type: 'nchar', length: 4 })
    period: string;

    @ManyToOne(() => OrderMP)
    @JoinColumn([
        { name: 'CIA', referencedColumnName: 'companyId' },
        { name: 'ID_TIPO_ORDEN', referencedColumnName: 'orderTypeId' },
        { name: 'PERIODO', referencedColumnName: 'period' },
        { name: 'CORRELATIVO', referencedColumnName: 'correlative' },
    ])
    order: OrderMP;
}
