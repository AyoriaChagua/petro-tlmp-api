import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiaAddress } from './cia-address.entity'; 

@Module({
    imports: [TypeOrmModule.forFeature([CiaAddress])],
    exports: [TypeOrmModule],
})
export class CiaAddressModule { }
