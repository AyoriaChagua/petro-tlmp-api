import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ENVIO_CORREO_MP' })
export class EmailMP {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ID_USUARIO', type: 'varchar', length: 20 })
    userId: string;

    @Column({ name: 'ASUNTO', type: 'varchar', length: 255 })
    subject: string;

    @Column({ name: 'CUERPO', type: 'text' })
    body: string;

    @Column({ name: 'CORREO_EMISOR', type: 'varchar', length: 255 })
    senderEmail: string;

    @Column({ name: 'CORREO_RECEPTOR', type: 'varchar', length: 255 })
    recipientEmail: string;

    @Column({ name: 'ESTADO_ENVIO', type: 'varchar', length: 50 })
    sendStatus: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    systemDate: Date;

    @Column({ name: 'MENSAJE_ENVIO', type: 'text', nullable: true })
    sendMessage: string;

    @Column({ name: 'LOTE_DIARIO', type: 'int', nullable: true })
    dailyBatch: number;

}
