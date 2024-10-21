import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('TIPO_CAMBIO')
export class ExchangeRate {
    @PrimaryColumn({ name: 'CIA', type: 'varchar', length: 5, nullable: false })
    companyId: string;

    @PrimaryColumn({ name: 'ID_MONEDA_ORIGEN', type: 'varchar', length: 4, nullable: false })
    originCurrencyId: string;

    @PrimaryColumn({ name: 'ID_MONEDA_DESTINO', type: 'varchar', length: 4, nullable: false })
    destinationCurrencyId: string;

    @PrimaryColumn({ name: 'FECHA', type: 'datetime', nullable: false })
    date: Date;

    @Column({ name: 'FACTOR_DESTINO_COMPRA', type: 'float', nullable: true })
    purchase_price: number;

    @Column({ name: 'FACTOR_DESTINO_VENTA', type: 'float', nullable: true })
    sale_price: number;
}