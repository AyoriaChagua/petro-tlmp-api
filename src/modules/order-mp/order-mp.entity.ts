import { ApprovalPersonnel } from 'src/modules/maintanance/approval-personnel/approval-personnel.entity';
import { CorrelativeControl } from 'src/modules/maintanance/correlative-control/correlative-control.entity';
import { CostCenter } from 'src/modules/maintanance/cost-center/cost-center.entity';
import { FileMP } from 'src/modules/file-mp/file-mp.entity';
import { OrderDetail } from 'src/modules/order-det-mp/order-det-mp.entity';
import { ProviderAccount } from 'src/modules/maintanance/provider-account/provider-account.entity';
import { RequestingArea } from 'src/modules/maintanance/requesting-area/requesting-area.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Provider } from '../maintanance/provider/provider.entity';
import { OrderDocumentMP } from '../order-document-mp/order-document-mp.entity';
import { OrderPayment } from '../order-payment/order-payment.entity';

@Entity({ name: 'ORDEN_MP' })
export class OrderMP {
    @PrimaryColumn({ name: 'CIA', type: 'varchar', length: 5 })
    companyId: string;

    @PrimaryColumn({ name: 'ID_TIPO_ORDEN', type: 'nchar', length: 4 })
    orderTypeId: string;

    @PrimaryColumn({ name: 'PERIODO', type: 'nchar', length: 4 })
    period: string;

    @PrimaryColumn({ name: 'CORRELATIVO', type: 'nvarchar', length: 8 })
    correlative: string;

    @Column({ name: 'RUC_PROVEEDOR', type: 'nchar', length: 12, nullable: true })
    providerRuc: string;

    @Column({ name: 'ID_CUENTA_BANCO', type: 'int', nullable: true })
    bankAccountId: number;

    @Column({ name: 'USUARIO_SISTEMA', type: 'nchar', length: 20, nullable: true })
    systemUser: string;

    @Column({ name: 'FECHA', type: 'date', default: () => 'getdate()' })
    orderDate: Date;

    @Column({ name: 'EMISION', type: 'date', default: () => 'getdate()' })
    issueDate: Date;

    @Column({ name: 'ID_PERSONAL_APRUEBA', type: 'int', nullable: true })
    approvingStaffId: number;

    @Column({ name: 'ID_CENTRO_COSTO', type: 'int', nullable: true })
    costCenterId: number;

    @Column({ name: 'FORMA_PAGO', type: 'varchar', length: 50, nullable: true })
    paymentMethod: string;

    @Column({ name: 'RELEVANCIA', type: 'varchar', length: 20, nullable: true })
    relevance: string;

    @Column({ name: 'ESTADO_DOC', type: 'varchar', length: 20, nullable: true, default: 'ACTIVO' })
    documentStatus: string;

    @Column({ name: 'MONEDA', type: 'varchar', length: 10, nullable: false, default: 'SOLES' })
    currency: string; 

    @Column({ name: 'OBSERVACIONES', type: 'text', nullable: true })
    observations: string;

    @Column({ name: 'AFECTO_IGV', type: 'bit', nullable: true })
    isAffectedIGV: boolean;

    @Column({ name: 'PORC_RETENCION', type: 'decimal', precision: 10, scale: 3, nullable: true })
    retention: number;

    @Column({ name: 'PORC_IMPUESTO', type: 'decimal', precision: 10, scale: 3, nullable: true })
    tax: number;

    @Column({ name: 'PORC_PERCEPCION', type: 'decimal', precision: 10, scale: 3, nullable: true })
    perception: number;

    @Column({ name: 'PORC_DETRACCION', type: 'decimal', precision: 10, scale: 3, nullable: true })
    detraction: number;

    @Column({ name: 'CALC_RETENCION', type: 'decimal', precision: 10, scale: 3, nullable: true })
    retentionCalc: number;

    @Column({ name: 'CALC_IMPUESTO', type: 'decimal', precision: 10, scale: 3, nullable: true })
    taxCalc: number;

    @Column({ name: 'CALC_PERCEPCION', type: 'decimal', precision: 10, scale: 3, nullable: true })
    perceptionCalc: number;

    @Column({ name: 'CALC_DETRACCION', type: 'decimal', precision: 10, scale: 3, nullable: true })
    detractionCalc: number;

    @Column({ name: 'FIRMA_AUTOMATICA', type: 'bit', nullable: true, default: () => '(1)' })
    automaticSignature: boolean;

    @Column({ name: 'USUARIO_MOD', type: 'varchar', length: 50, nullable: true })
    modifiedUser: string;

    @Column({ name: 'FECHA_MOD', type: 'varchar', length: 50, nullable: true })
    modifiedDate: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'datetime', nullable: true, default: () => 'getdate()' })
    systemDate: Date;

    @Column({ name: 'SUBTOTAL', type: 'decimal', precision: 10, scale: 3, nullable: true })
    subtotal: number;

    @Column({ name: 'ID_AREA_SOLICITANTE', type: 'int', nullable: true })
    requestingAreaId: number;

    @Column({ name: 'TOTAL', type: 'decimal', precision: 10, scale: 3, nullable: true })
    total: number;

    @Column({ name: 'FLAG_CAJA_CHICA', type: 'bit', default: false })
    isPettyCash: boolean;

    @ManyToOne(() => CorrelativeControl)
    @JoinColumn([
        { name: 'CIA', referencedColumnName: 'companyId' },
        { name: 'ID_TIPO_ORDEN', referencedColumnName: 'orderTypeId' },
        { name: 'PERIODO', referencedColumnName: 'period' }
    ])
    correlativeControl: CorrelativeControl;

    @ManyToOne(() => Provider)
    @JoinColumn({ name: 'RUC_PROVEEDOR', referencedColumnName: 'ruc', })
    supplier: Provider;

    @ManyToOne(() => ProviderAccount)
    @JoinColumn({ name: 'ID_CUENTA_BANCO', referencedColumnName: 'id' })
    supplierAccount: ProviderAccount;

    @ManyToOne(() => ApprovalPersonnel)
    @JoinColumn({ name: 'ID_PERSONAL_APRUEBA', referencedColumnName: 'id' })
    approvalPersonnel: ApprovalPersonnel;

    @ManyToOne(() => CostCenter)
    @JoinColumn({ name: 'ID_CENTRO_COSTO', referencedColumnName: 'id' })
    costCenter: CostCenter;

    @ManyToOne(() => RequestingArea)
    @JoinColumn({ name: 'ID_AREA_SOLICITANTE', referencedColumnName: 'id' })
    resquestingArea: RequestingArea;

    @OneToMany(() => OrderDocumentMP, od => od.order)
    orderDocument: OrderDocumentMP[];

    @OneToMany(() => OrderPayment, od => od.order)
    orderPayment: OrderPayment[];

    @OneToMany(() => FileMP, file => file.order)
    file: FileMP[];

    @OneToMany(() => OrderDetail, det => det.order)
    orderDetail: OrderDetail[];

}
