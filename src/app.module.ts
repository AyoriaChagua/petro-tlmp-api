import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm-config';
import { UserModule } from './modules/users/user.module';
import { RoleModule } from './modules/roles/role.module';
import { UserRolesModule } from './modules/user-roles/user-role.module';
import { CorrelativeControlModule } from './modules/maintanance/correlative-control/correlative-control.module';
import { ProviderAccountModule } from './modules/maintanance/provider-account/provider-account.module';
import { OrderTypeModule } from './modules/order-type/order-type.module';
import { CiaAddressModule } from './modules/cia/cia-address.module';
import { CiaModule } from './modules/cia/cia.module';
import { CostCenterModule } from './modules/maintanance/cost-center/cost-center.module';
import { RequestingAreaModule } from './modules/maintanance/requesting-area/requesting-area.module';
import { ApprovalPersonnelModule } from './modules/maintanance/approval-personnel/approval-personnel.module';
import { SunatDocumentTypeModule } from './modules/maintanance/sunat-document-type/sunat-document-type.module';
import { OrderMPModule } from './modules/order-mp/order-mp.module';
import { OrderDetailModule } from './modules/order-det-mp/order-det-mp.module';
import { OrderDocumentMPModule } from './modules/order-document-mp/order-document-mp.module';
import { FileMPModule } from './modules/file-mp/file-mp.module';
import { SharedModule } from './shared/shared.module';
import { ProviderModule } from './modules/maintanance/provider/provider.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrderPaymentModule } from './modules/order-payment/order-payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    UserModule,
    RoleModule,
    UserRolesModule,
    CorrelativeControlModule,
    ProviderModule,
    ProviderAccountModule,
    OrderTypeModule,
    CiaModule,
    CiaAddressModule,
    CostCenterModule,
    RequestingAreaModule,
    ApprovalPersonnelModule,
    SunatDocumentTypeModule,
    OrderMPModule,
    OrderDetailModule,
    OrderDocumentMPModule,
    FileMPModule,
    SharedModule,
    OrderPaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
