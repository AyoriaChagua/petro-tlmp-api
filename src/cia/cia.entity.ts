import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'CIA' })
export class Cia {
    @PrimaryColumn({ name: 'CIA', type: 'varchar', length: 5 })
    companyId: string;

    @Column({ name: 'DESCRIPCION', type: 'varchar', length: 50, nullable: true })
    description: string;

    @Column({ name: 'NRO_DI', type: 'varchar', length: 20, nullable: true })
    documentNumber: string;
}
