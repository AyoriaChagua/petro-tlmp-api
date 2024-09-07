import { OrderMP } from 'src/modules/order-mp/order-mp.entity';
import { ProviderAccount } from 'src/modules/maintanance/provider-account/provider-account.entity';
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OrderDocumentMP } from 'src/modules/order-document-mp/order-document-mp.entity';

@Entity({ name: 'PROVEEDOR_MP' })
export class Provider {
    @PrimaryColumn({ name: 'RUC', type: 'nchar', length: 12 })
    ruc: string;

    @Column({ name: 'DESCRIPCION', type: 'text', nullable: true })
    description: string;

    @Column({ name: 'DIRECCION', type: 'varchar', nullable: true, length: "max" })
    address: string;

    @Column({ name: 'CONTACTO', type: 'varchar', length: 40, nullable: true })
    contact: string;

    @Column({ name: 'TELEFONO', type: 'varchar', length: 20, nullable: true })
    phone: string;

    @Column({ name: 'USUARIO_SISTEMA', type: 'varchar', length: 20, nullable: true })
    systemUser: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'datetime2', nullable: true, default: () => 'getdate()' })
    systemDate: Date;

    @Column({ name: 'USUARIO_MOD', type: 'nchar', length: 20, nullable: true })
    modifiedUser: string;

    @Column({ name: 'FECHA_MOD', type: 'datetime2', nullable: true })
    modifiedDate: Date;

    @Column({ name: 'EMAIL', type: 'varchar', length: 50, nullable: true })
    email: string;

    @Column({ name: 'FLAG_ACTIVO', type: 'bit', default: true })
    isActive: boolean;

    @OneToMany(() => ProviderAccount, accountProvider => accountProvider.supplier)
    accounts: ProviderAccount[];

    @OneToMany(() => OrderMP, order => order.supplier)
    orders: OrderMP[];

    @OneToMany(() => OrderDocumentMP, document => document.supplier)
    orderDocuments: OrderDocumentMP[];
}
