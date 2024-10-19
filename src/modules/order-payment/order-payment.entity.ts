import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { FileMP } from "../file-mp/file-mp.entity";
import { OrderMP } from "../order-mp/order-mp.entity";

@Entity({ name: "PAGO_ORDEN_MP" })
export class OrderPayment {
    @PrimaryGeneratedColumn({ name: 'ID_PAGO' })
    paymentId: number;

    @Column({ name: "CIA", type: "varchar", length: 5 })
    companyId: string;

    @Column({ name: 'ID_TIPO_ORDEN', type: 'nchar', length: 4 })
    orderTypeId: string;

    @Column({ name: 'PERIODO', type: 'nchar', length: 4 })
    period: string;

    @Column({ name: 'CORRELATIVO', type: 'nvarchar', length: 8 })
    correlative: string;

    @Column({ name: "FECHA_PAGO", type: "datetime" })
    paymentDate: Date;

    @Column({ name: "IMPORTE_PAGADO", type: "decimal", precision: 10, scale: 3 })
    paidAmount: number;

    @Column({ name: 'MONEDA', type: 'varchar', length: 10, nullable: false, default: 'PEN' })
    currency: string; 

    @Column({ name: 'USUARIO_SISTEMA', type: 'varchar', length: 20, nullable: true })
    systemUser: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'date', nullable: true })
    systemDate: Date;

    @Column({ name: 'FLAG_ACTIVO', type: 'bit', default: true })
    isActive: boolean;

    @ManyToOne(() => OrderMP)
    @JoinColumn([
        { name: 'CIA', referencedColumnName: 'companyId' },
        { name: 'ID_TIPO_ORDEN', referencedColumnName: 'orderTypeId' },
        { name: 'PERIODO', referencedColumnName: 'period' },
        { name: 'CORRELATIVO', referencedColumnName: 'correlative' },
    ])
    order: OrderMP;

    @OneToOne(() => FileMP, file => file.orderPayment)
    file: FileMP;
}