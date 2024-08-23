import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApprovalPersonnel } from 'src/approval-personnel/approval-personnel.entity';
import { CiaAddress } from 'src/cia/cia-address.entity';
import { Cia } from 'src/cia/cia.entity';
import { CorrelativeControl } from 'src/correlative-control/correlative-control.entity';
import { CostCenter } from 'src/cost-center/cost-center.entity';
import { FileMP } from 'src/file-mp/file-mp.entity';
import { FileTypeOrder } from 'src/file-type-mp/file-type-mp.entity';
import { DB_NAME, DB_PASSWORD, DB_SOURCE, DB_USER } from './environments';
import { OrderDetail } from 'src/order-det-mp/order-det-mp.entity';
import { OrderDocumentMP } from 'src/order-document-mp/order-document-mp.entity';
import { OrderMP } from 'src/order-mp/order-mp.entity';
import { OrderType } from 'src/order-type/order-type.entity';
import { ProviderAccount } from 'src/provider-account/provider-account.entity';
import { Provider } from 'src/provider/provider.entity';
import { RequestingArea } from 'src/requesting-area/requesting-area.entity';
import { Role } from 'src/roles/role.entity';
import { UserRole } from 'src/user-roles/user-role.entity';
import { User } from 'src/users/user.entity';
import { SunatDocumentType } from 'src/sunat-document-type/sunat-document-type.entity';


export const ormConfig: TypeOrmModuleOptions = {
    type: 'mssql',
    host: DB_SOURCE,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [
        Role,
        User,
        UserRole,
        Provider,
        ProviderAccount,
        OrderType,
        Cia,
        CiaAddress,
        CorrelativeControl,
        CostCenter,
        ApprovalPersonnel,
        RequestingArea,
        OrderMP,
        OrderDetail,
        OrderDocumentMP,
        FileMP,
        FileTypeOrder,
        SunatDocumentType
    ],
    synchronize: false,
    logging: false,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1',
        }
    },
    extra: {
        trustServerCertificate: true
    }
}