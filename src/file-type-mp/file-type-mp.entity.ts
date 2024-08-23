import { FileMP } from 'src/file-mp/file-mp.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'TIPO_ARCHIVO_ORDEN_MP' })
export class FileTypeOrder {
    @PrimaryColumn({ name: 'ID_TIPO_ARCHIVO', type: 'varchar', length: 2 })
    fileTypeId: string;

    @Column({ name: 'DESCRIPCION', type: 'varchar', length: 50, nullable: true })
    description: string;

    @Column({ name: 'FECHA_SISTEMA', type: 'date', nullable: true, default: () => 'getdate()' })
    systemDate: Date;

    @Column({ name: 'USUARIO_SISTEMA', type: 'varchar', length: 20, nullable: true, default: 'ADMIN' })
    systemUser: string;

    @OneToMany(() => FileMP, file => file.fileType)
    file: FileMP[];
}
