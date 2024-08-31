import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { OrderDocumentMP } from "../order-document-mp/order-document-mp.entity";
import { FileMP } from "../file-mp/file-mp.entity";

@Entity({ name: "PAGO_DOCUMENTO_MP" })
export class PaymentDocumentMP {
    @PrimaryGeneratedColumn({ name: 'ID_PAGO' })
    paymentId: number;
    
    @Column({ name: "NRO_DOCUMENTO_ORDEN", type: "varchar", length: 20 })
    orderDocumentNumber: string;

    @Column({ name: "CIA", type: "varchar", length: 5 })
    companyId: string;

    @Column({ name: "FECHA_PAGO", type: "datetime" })
    paymentDate: Date;

    @Column({ name: "IMPORTE_PAGADO", type: "decimal", precision: 10, scale: 3 })
    paidAmount: number;

    @Column({ name: 'USUARIO_SISTEMA', type: 'varchar', length: 20, nullable: true })
    systemUser: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'date', nullable: true })
    systemDate: Date;

    @Column({ name: 'FLAG_ACTIVO', type: 'bit', default: true })
    isActive: boolean;

    @ManyToOne(() => OrderDocumentMP)
    @JoinColumn([
        { name: 'CIA', referencedColumnName: 'companyId' },
        { name: 'NRO_DOCUMENTO_ORDEN', referencedColumnName: 'orderDocumentNumber' }
    ])
    orderDocument: OrderDocumentMP;

    @OneToMany(() => FileMP, file => file.order)
    file: FileMP[];
}