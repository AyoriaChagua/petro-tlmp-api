import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Provider } from '../provider/provider.entity';
import { OrderMP } from 'src/order-mp/order-mp.entity';

@Entity({ name: 'CUENTA_PROVEEDOR_MP' })
export class ProviderAccount {
    @PrimaryGeneratedColumn({ name: 'ID' })
    id: number;

    @Column({ name: 'BANCO', type: 'varchar', length: 255, nullable: true })
    bank: string;

    @Column({ name: 'NRO_CUENTA', type: 'varchar', length: 255, nullable: true })
    accountNumber: string;

    @Column({ name: 'RUC_PROVEEDOR_MP', type: 'nchar', length: 12, nullable: true })
    supplierRUC: string;

    @CreateDateColumn({ name: 'CREATED_AT', type: 'datetime2', default: () => 'getdate()' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'UPDATED_AT', type: 'datetime2', default: () => 'getdate()', onUpdate: 'getdate()' })
    updatedAt: Date;

    @Column({ name: 'TIPO', type: 'varchar', length: 20, nullable: true, default: 'CORRIENTE' })
    type: string;

    @Column({ name: 'CCI', type: 'varchar', length: 25, nullable: true })
    cci: string;

    @ManyToOne(() => Provider, proveedorMP => proveedorMP.accounts)
    @JoinColumn({ name: 'RUC_PROVEEDOR_MP' })
    supplier: Provider;

    @OneToMany(() => OrderMP, order => order.supplierAccount)
    orders: OrderMP[];

    @Column({ name: 'FLAG_ACTIVO', type: 'bit', default: true })
    isActive: boolean;
}
