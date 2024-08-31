import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApprovalPersonnel } from 'src/modules/maintanance/approval-personnel/approval-personnel.entity';
import { CiaAddress } from 'src/modules/cia/cia-address.entity';
import { Cia } from 'src/modules/cia/cia.entity';
import { CorrelativeControl } from 'src/modules/maintanance/correlative-control/correlative-control.entity';
import { CostCenter } from 'src/modules/maintanance/cost-center/cost-center.entity';
import { FileMP } from 'src/modules/file-mp/file-mp.entity';
import { FileTypeOrder } from 'src/modules/maintanance/file-type-mp/file-type-mp.entity';
import { DB_NAME, DB_PASSWORD, DB_SOURCE, DB_USER } from './environments';
import { OrderDetail } from 'src/modules/order-det-mp/order-det-mp.entity';
import { OrderMP } from 'src/modules/order-mp/order-mp.entity';
import { OrderType } from 'src/modules/order-type/order-type.entity';
import { ProviderAccount } from 'src/modules/maintanance/provider-account/provider-account.entity';
import { RequestingArea } from 'src/modules/maintanance/requesting-area/requesting-area.entity';
import { Role } from 'src/modules/roles/role.entity';
import { UserRole } from 'src/modules/user-roles/user-role.entity';
import { User } from 'src/modules/users/user.entity';
import { SunatDocumentType } from 'src/modules/maintanance/sunat-document-type/sunat-document-type.entity';
import { Provider } from 'src/modules/maintanance/provider/provider.entity';
import { OrderDocumentMP } from 'src/modules/order-document-mp/order-document-mp.entity';
import { PaymentDocumentMP } from 'src/modules/document-payment/document-payment.entity';


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
        SunatDocumentType,
        PaymentDocumentMP
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