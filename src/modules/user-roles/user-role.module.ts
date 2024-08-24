import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './user-role.entity';
import { UserRolesService } from './user-role.service';
import { UserRolesController } from './user-role.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserRole])],
    providers: [UserRolesService],
    controllers: [UserRolesController],
    exports: [UserRolesService],
})
export class UserRolesModule { }
