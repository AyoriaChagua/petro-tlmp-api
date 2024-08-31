import { FileMP } from 'src/modules/file-mp/file-mp.entity';
import { OrderMP } from 'src/modules/order-mp/order-mp.entity';
import { SunatDocumentType } from 'src/modules/maintanance/sunat-document-type/sunat-document-type.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'DOCUMENTO_ORDEN_MP' })
export class OrderDocumentMP {
    @PrimaryColumn({ name: 'NRO_DOCUMENTO_ORDEN', type: 'varchar', length: 20 })
    orderDocumentNumber: string;

    @PrimaryColumn({ name: 'CIA', type: 'varchar', length: 5 })
    companyId: string;

    @Column({ name: 'SUBTOTAL', type: 'decimal', precision: 10, scale: 3, nullable: true })
    subtotal: number;

    @Column({ name: 'TOTAL', type: 'decimal', precision: 10, scale: 3, nullable: true })
    total: number;

    @Column({ name: 'USUARIO_SISTEMA', type: 'varchar', length: 20, nullable: true })
    systemUser: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'date', nullable: true })
    systemDate: Date;

    @Column({ name: 'USUARIO_MOD', type: 'varchar', length: 20, nullable: true })
    modifiedUser: string;

    @Column({ name: 'FECHA_MOD', type: 'date', nullable: true })
    modifiedDate: Date;

    @Column({ name: 'ESTADO_DOC', type: 'varchar', length: 50, nullable: true })
    documentStatus: string;

    @Column({ name: 'FECHA', type: 'date', nullable: true })
    date: Date;

    @Column({ name: 'ID_TIPO_DOC', type: 'varchar', length: 4, nullable: true })
    documentTypeId: string;

    @Column({ name: 'FECHA_VENC', type: 'date', nullable: true })
    dueDate: Date;

    @Column({ name: 'FECHA_CARGO', type: 'date', nullable: true })
    chargeDate: Date;

    @Column({ name: 'CODIGO', type: 'varchar', length: 20, nullable: true })
    code: string;

    @Column({ name: 'BIOG', type: 'decimal', precision: 8, scale: 2, nullable: true })
    biog: number;

    @Column({ name: 'TIPO_EMISION', type: 'varchar', length: 15, nullable: true })
    typeEmission: string;

    @Column({ name: 'FISE', type: 'decimal', precision: 8, scale: 2, nullable: true })
    fise: number;

    @Column({ name: 'OTROS_PAGOS', type: 'decimal', precision: 8, scale: 2, nullable: true })
    otherPayments: number;

    @Column({ name: 'TIPO_CAMBIO', type: 'decimal', precision: 10, scale: 2, nullable: true })
    exchangeRate: number;

    @Column({ name: 'GLOSA', type: 'varchar', nullable: true })
    annotation: string;

    @Column({ name: 'FLAG_SIN_ORDEN', type: 'bit', nullable: false, default: 0 })
    noOrderFlag: boolean;


    @Column({ name: 'ID_TIPO_ORDEN', type: 'nchar', length: 4 })
    orderTypeId: string;

    @Column({ name: 'PERIODO', type: 'nchar', length: 4 })
    period: string;

    @Column({ name: 'CORRELATIVO', type: 'nvarchar', length: 8 })
    correlative: string;

    @Column({ name: 'PORC_RETENCION', type: 'decimal', precision: 8, scale: 2, nullable: true })
    retentionPerc: number;

    @Column({ name: 'PORC_IMPUESTO', type: 'decimal', precision: 8, scale: 2, nullable: true })
    taxPerc: number;

    @Column({ name: 'PORC_PERCEPCION', type: 'decimal', precision: 8, scale: 2, nullable: true })
    perceptionPerc: number;

    @Column({ name: 'PORC_DETRACCION', type: 'decimal', precision: 8, scale: 2, nullable: true })
    detractionPerc: number;


    @Column({ name: 'CALC_RETENCION', type: 'decimal', precision: 8, scale: 2, nullable: true })
    retentionCalc: number;

    @Column({ name: 'CALC_IMPUESTO', type: 'decimal', precision: 8, scale: 2, nullable: true })
    taxCalc: number;

    @Column({ name: 'CALC_PERCEPCION', type: 'decimal', precision: 8, scale: 2, nullable: true })
    perceptionCalc: number;

    @Column({ name: 'CALC_DETRACCION', type: 'decimal', precision: 8, scale: 2, nullable: true })
    detractionCalc: number;

    
    @Column({ name: 'FLAG_CAJA_CHICA', type: 'bit', default: false })
    isPettyCash: boolean;

    @ManyToOne(() => OrderMP)
    @JoinColumn([
        { name: 'CIA', referencedColumnName: 'companyId' },
        { name: 'ID_TIPO_ORDEN', referencedColumnName: 'orderTypeId' },
        { name: 'PERIODO', referencedColumnName: 'period' },
        { name: 'CORRELATIVO', referencedColumnName: 'correlative' }
    ])
    order: OrderMP;

    @ManyToOne(() => SunatDocumentType)
    @JoinColumn({ name: 'ID_TIPO_DOC', referencedColumnName: 'documentTypeId' })
    documentType: SunatDocumentType;

    @OneToMany(() => FileMP, file => file.order)
    file: FileMP[];
}
