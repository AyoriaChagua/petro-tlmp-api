import { ApprovalPersonnel } from 'src/approval-personnel/approval-personnel.entity';
import { CorrelativeControl } from 'src/correlative-control/correlative-control.entity';
import { CostCenter } from 'src/cost-center/cost-center.entity';
import { FileMP } from 'src/file-mp/file-mp.entity';
import { OrderDetail } from 'src/order-det-mp/order-det-mp.entity';
import { OrderDocumentMP } from 'src/order-document-mp/order-document-mp.entity';
import { ProviderAccount } from 'src/provider-account/provider-account.entity';
import { Provider } from 'src/provider/provider.entity';
import { RequestingArea } from 'src/requesting-area/requesting-area.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

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
    date: Date;

    @Column({ name: 'EMISION', type: 'date', default: () => 'getdate()' })
    emissionDate: Date;

    @Column({ name: 'ID_PERSONAL_APRUEBA', type: 'int', nullable: true })
    approvingStaffId: number;

    @Column({ name: 'ID_CENTRO_COSTO', type: 'int', nullable: true })
    costCenterId: number;

    @Column({ name: 'FORMA_PAGO', type: 'varchar', length: 50, nullable: true })
    paymentMethod: string;

    @Column({ name: 'RELEVANCIA', type: 'varchar', length: 20, nullable: true })
    relevance: string;

    @Column({ name: 'ID_ESTADO_DOC', type: 'varchar', length: 5, nullable: true, default: '01' })
    documentStatusId: string;

    @Column({ name: 'MONEDA', type: 'varchar', length: 10, nullable: false, default: 'SOLES' })
    currency: string; 

    @Column({ name: 'OBSERVACIONES', type: 'text', nullable: true })
    observations: string;

    @Column({ name: 'AFECTO_IGV', type: 'bit', nullable: true })
    taxableIgv: boolean;

    @Column({ name: 'PORC_RETENCION', type: 'decimal', precision: 10, scale: 3, nullable: true })
    retentionPercentage: number;

    @Column({ name: 'PORC_IMPUESTO', type: 'decimal', precision: 10, scale: 3, nullable: true })
    taxPercentage: number;

    @Column({ name: 'PORC_PERCEPCION', type: 'decimal', precision: 10, scale: 3, nullable: true })
    perceptionPercentage: number;

    @Column({ name: 'PORC_DETRACCION', type: 'decimal', precision: 10, scale: 3, nullable: true })
    detractionPercentage: number;

    @Column({ name: 'FIRMA_AUTOMATICA', type: 'bit', nullable: true, default: () => '(1)' })
    automaticSignature: boolean;

    @Column({ name: 'USUARIO_MOD', type: 'varchar', length: 50, nullable: true })
    modifiedUser: string;

    @Column({ name: 'FECHA_MOD', type: 'varchar', length: 50, nullable: true })
    modifiedDate: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'varchar', length: 50, nullable: true, default: () => 'getdate()' })
    systemDate: string;

    @Column({ name: 'IMPORTE_TOTAL', type: 'decimal', precision: 10, scale: 3, nullable: true })
    totalAmount: number;

    @Column({ name: 'ID_AREA_SOLICITANTE', type: 'int', nullable: true })
    requestingAreaId: number;

    @Column({ name: 'IMPORTE_TOTAL_CON_IMPUESTO', type: 'decimal', precision: 10, scale: 3, nullable: true })
    totalAmountWithTax: number;


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

    @OneToMany(() => FileMP, file => file.order)
    file: FileMP[];

    @OneToMany(() => OrderDetail, det => det.order)
    orderDetail: OrderDetail[];

}
