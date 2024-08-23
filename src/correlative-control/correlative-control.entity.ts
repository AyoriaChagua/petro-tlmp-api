import { Cia } from "src/cia/cia.entity";
import { OrderMP } from "src/order-mp/order-mp.entity";
import { OrderType } from "src/order-type/order-type.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity('CONTROL_CORRELATIVO')
export class CorrelativeControl {

    @PrimaryColumn({ name: 'CIA', type: 'varchar', length: 5 })
    companyId: string;

    @PrimaryColumn({ name: 'TIPO_ORDEN', type: 'nvarchar', length: 4 })
    orderTypeId: string;

    @PrimaryColumn({ name: 'PERIODO', type: 'nchar', length: 4 })
    period: string;

    @Column({ name: 'CORRELATIVO', type: 'nvarchar', length: 20 })
    correlative: string;

    @Column({ name: 'ACTIVO', type: 'bit', default: true })
    active: boolean;

    @Column({ name: 'USUARIO_SISTEMA', type: 'nvarchar', length: 20, nullable: true })
    systemUser: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'date', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    systemDate: Date;

    @Column({ name: 'USUARIO_MOD', type: 'nvarchar', length: 20, nullable: true })
    modifiedUser: string;

    @Column({ name: 'FECHA_MOD', type: 'date', nullable: true })
    modifiedDate: Date;

    @ManyToOne(() => OrderType)
    @JoinColumn({ name: 'TIPO_ORDEN', referencedColumnName: 'orderTypeId' })
    orderType: OrderType;

    @ManyToOne(() => Cia)
    @JoinColumn({ name: 'CIA', referencedColumnName: 'companyId' })
    company: Cia;

    @OneToMany(() => OrderMP, order => order.correlativeControl)
    orders: OrderMP[];

}
