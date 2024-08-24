import { OrderDocumentMP } from 'src/modules/order-document-mp/order-document-mp.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'TIPO_DOCUMENTO_SUNAT_MP' })
export class SunatDocumentType {
    @PrimaryColumn({ name: 'ID_TIPO_DOC_MP', type: 'varchar', length: 4 })
    documentTypeId: string;

    @Column({ name: 'CIA', type: 'varchar', length: 5 })
    companyId: string;

    @Column({ name: 'ID_ESTADO', type: 'varchar', length: 5, nullable: true })
    statusId?: string;

    @Column({ name: 'CodigoSunat', type: 'varchar', length: 3, nullable: true })
    sunatCode?: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'datetime', nullable: true })
    systemDate?: Date;

    @Column({ name: 'USUARIO_SISTEMA', type: 'varchar', length: 20, nullable: true })
    systemUser?: string;

    @Column({ name: 'FECHA_MOD', type: 'datetime', nullable: true })
    modifiedDate?: Date;

    @Column({ name: 'USUARIO_MOD', type: 'varchar', length: 20, nullable: true })
    modifiedUser?: string;

    @Column({ name: 'Descripcion', type: 'varchar', length: 20, nullable: true })
    description?: string;

    @Column({ name: 'FRECUENCIA', type: 'int', nullable: true })
    frequency?: number;

    @OneToMany(() => OrderDocumentMP, document => document.documentType)
    orderDocuments: OrderDocumentMP[];
}
