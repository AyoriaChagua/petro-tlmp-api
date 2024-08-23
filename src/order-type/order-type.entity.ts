import { CorrelativeControl } from 'src/correlative-control/correlative-control.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity({ name: 'TIPO_ORDEN_MP' })
export class OrderType {
    @PrimaryColumn({ name: 'ID_TIPO_ORDEN', type: 'nchar', length: 4 })
    orderTypeId: string;

    @Column({ name: 'DESCRIPCION', type: 'varchar', length: 50, nullable: true })
    description: string;

    @Column({ name: 'USUARIO', type: 'nvarchar', length: 20, nullable: true })
    user: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    systemDate: Date;

    @Column({ name: 'USUARIO_MOD', type: 'nvarchar', length: 20, nullable: true })
    modifiedUser: string;

    @Column({ name: 'FECHA_MOD', type: 'datetime', nullable: true })
    modifiedDate: Date;

    @OneToMany(() => CorrelativeControl, cc => cc.orderType)
    correlativeControl: CorrelativeControl[];
}
