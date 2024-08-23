import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm-config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { RoleModule } from './roles/role.module';
import { UserRolesModule } from './user-roles/user-role.module';
import { CorrelativeControlModule } from './correlative-control/correlative-control.module';
import { ProviderModule } from './provider/provider.module';
import { ProviderAccountModule } from './provider-account/provider-account.module';
import { OrderTypeModule } from './order-type/order-type.module';
import { CiaAddressModule } from './cia/cia-address.module';
import { CiaModule } from './cia/cia.module';
import { CostCenterModule } from './cost-center/cost-center.module';
import { RequestingAreaModule } from './requesting-area/requesting-area.module';
import { ApprovalPersonnelModule } from './approval-personnel/approval-personnel.module';
import { SunatDocumentTypeModule } from './sunat-document-type/sunat-document-type.module';
import { OrderMPModule } from './order-mp/order-mp.module';
import { OrderDetailModule } from './order-det-mp/order-det-mp.module';
import { OrderDocumentMPModule } from './order-document-mp/order-document-mp.module';
import { FileMPModule } from './file-mp/file-mp.module';
import { SharedModule } from './shared/shared.module';

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
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
