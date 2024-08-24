import { Injectable } from '@nestjs/common';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CorrelativeControl } from './correlative-control.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CorrelativeService {
    private correlativeSubject: BehaviorSubject<{ companyId: string, orderTypeId: string, period: string, correlative: string } | null>;

    constructor(
        @InjectRepository(CorrelativeControl)
        private readonly correlativeControlRepository: Repository<CorrelativeControl>
    ) {
        this.correlativeSubject = new BehaviorSubject(null);
        this.initializeCorrelatives();
    }

    private async initializeCorrelatives() {
        const allCorrelatives = await this.correlativeControlRepository.find();
        for (const correlative of allCorrelatives) {
            this.correlativeSubject.next({
                companyId: correlative.companyId,
                orderTypeId: correlative.orderTypeId,
                period: correlative.period,
                correlative: correlative.correlative
            });
        }
    }

    async getCurrentCorrelative(companyId: string, orderTypeId: string, period: string): Promise<string> {
        const currentCorrelative = await this.correlativeControlRepository.findOne({
            where: { companyId, orderTypeId, period }
        });
        return currentCorrelative?.correlative || '00000000';
    }

    async updateCorrelative(companyId: string, orderTypeId: string, period: string, newCorrelative: string): Promise<void> {
        console.log("llega a actualizar")
        await this.correlativeControlRepository.update(
            { companyId, orderTypeId, period },
            { correlative: newCorrelative }
        );

        this.correlativeSubject.next({ companyId, orderTypeId, period, correlative: newCorrelative });
    }

    getCorrelativeStream(companyId: string, orderTypeId: string, period: string): Observable<string> {
        console.log("paramas: ", orderTypeId, period, companyId)
        console.log("service 2")
        const currentValue = this.correlativeSubject.getValue();
        console.log(currentValue);
        return this.correlativeSubject.pipe(
            map(update => {
                if (update.companyId === companyId && update.orderTypeId === orderTypeId && update.period === period) {
                    return update.correlative;
                }
                return null;
            })
        );
    }
}