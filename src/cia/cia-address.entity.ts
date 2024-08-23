import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cia } from './cia.entity';

@Entity({ name: 'CIA_DIRECCIONES' })
export class CiaAddress {
    @PrimaryColumn({ name: 'ID_DIRECCIONES_CIA', type: 'varchar', length: 3 })
    addressId: string;

    @Column({ name: 'CIA', type: 'varchar', length: 5, nullable: true })
    companyId: string;

    @Column({ name: 'DESCRIPCION', type: 'varchar', length: 150, nullable: true })
    description: string;

    @ManyToOne(() => Cia)
    @JoinColumn({ name: 'CIA', referencedColumnName: 'companyId' })
    cia: Cia;
}
