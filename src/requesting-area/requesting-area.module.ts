import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestingAreaService } from './requesting-area.service';
import { RequestingAreaController } from './requesting-area.controller';
import { RequestingArea } from './requesting-area.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RequestingArea])],
    providers: [RequestingAreaService],
    controllers: [RequestingAreaController],
    exports: [RequestingAreaService],
})
export class RequestingAreaModule { }