import { FileTypeOrder } from 'src/file-type-mp/file-type-mp.entity';
import { OrderDocumentMP } from 'src/order-document-mp/order-document-mp.entity';
import { OrderMP } from 'src/order-mp/order-mp.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'ARCHIVOS_MP' })
export class FileMP {
    @PrimaryGeneratedColumn({ name: 'ID' })
    id: number;

    @Column({ name: 'ARCHIVO', type: 'varbinary', nullable: true })
    file: Buffer;

    @Column({ name: 'NOMBRE_ARCHIVO', type: 'nvarchar', length: 255, nullable: true })
    fileName: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'datetime', default: () => 'getdate()', nullable: true })
    systemDate: Date;

    @Column({ name: 'USUARIO_SISTEMA', type: 'varchar', length: 20, nullable: true })
    systemUser: string;

    @Column({ name: 'USUARIO_MOD', type: 'varchar', length: 20, nullable: true })
    modifiedBy: string;

    @Column({ name: 'FECHA_MOD', type: 'date', nullable: true })
    modifiedDate: Date;

    @Column({ name: 'ID_TIPO_ARCHIVO', type: 'varchar', length: 2, nullable: true })
    fileTypeId: string;

    @Column({ name: 'NRO_DOCUMENTO_ORDEN', type: 'varchar', length: 20, nullable: true })
    orderDocumentNumber: string;

    @Column({ name: 'CIA', type: 'varchar', length: 5, nullable: true })
    companyId: string;

    @Column({ name: 'ID_TIPO_ORDEN', type: 'nchar', length: 4, nullable: true })
    orderTypeId: string;

    @Column({ name: 'CORRELATIVO', type: 'nvarchar', length: 8, nullable: true })
    correlative: string;

    @Column({ name: 'PERIODO', type: 'nchar', length: 4, nullable: true })
    period: string;

    @ManyToOne(() => FileTypeOrder)
    @JoinColumn({ name: 'ID_TIPO_ARCHIVO', referencedColumnName: 'fileTypeId' })
    fileType: FileTypeOrder;

    @ManyToOne(() => OrderMP, { nullable: false })
    @JoinColumn([
        { name: 'CIA', referencedColumnName: 'companyId' }, 
        { name: 'ID_TIPO_ORDEN', referencedColumnName: 'orderTypeId' }, 
        { name: 'PERIODO', referencedColumnName: 'period' }, 
        { name: 'CORRELATIVO', referencedColumnName: 'correlative' }
    ])
    order: OrderMP;

    @ManyToOne(() => OrderDocumentMP, { nullable: false })
    @JoinColumn([
        { name: 'NRO_DOCUMENTO_ORDEN', referencedColumnName: 'orderDocumentNumber'}, 
        { name: 'CIA', referencedColumnName: 'companyId'},
    ])
    orderDocument: OrderDocumentMP;
}
