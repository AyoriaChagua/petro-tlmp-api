import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Like, QueryFailedError, Repository } from "typeorm";
import { Provider } from "./provider.entity";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/udpate-provider.dto";
import { DatabaseErrorService } from "src/shared/database-error.service";
@Injectable()
export class ProviderService {
    constructor(
        @InjectRepository(Provider)
        private readonly providerRepository: Repository<Provider>,
        private databaseErrorService: DatabaseErrorService
    ) { }

    async findAllProviderWithAccounts(numberPage: number = 1, numberPerPage: number = 10): Promise<Provider[]> {
        try {
            const skip = (numberPage - 1) * numberPerPage;
            const providers = await this.providerRepository.createQueryBuilder('provider')
                .leftJoinAndSelect('provider.accounts', 'account', 'account.isActive = :accountActive', { accountActive: true })
                .where('provider.isActive = :providerActive', { providerActive: true })
                .orderBy('provider.systemDate', 'DESC')
                .skip(skip)
                .take(numberPerPage)
                .getMany();

            return providers;
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document')
        }
    }

    async findProvidersWithAccounts(querySearch: string, numberPage: number = 1, numberPerPage: number = 10): Promise<Provider[]> {
        try {
            const skip = (numberPage - 1) * numberPerPage;
            const providers = await this.providerRepository.createQueryBuilder('provider')
                .leftJoinAndSelect('provider.accounts', 'account', 'account.isActive = :accountActive', { accountActive: true })
                .where('provider.isActive = :providerActive', { providerActive: true })
                .andWhere(new Brackets(qb => {
                    qb.where('provider.ruc LIKE :search', { search: `%${querySearch}%` })
                        .orWhere('provider.description LIKE :search', { search: `%${querySearch}%` });
                }))
                .orderBy('provider.systemDate', 'DESC')
                .skip(skip)
                .take(numberPerPage)
                .getMany();

            return providers;
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Order Document')
        }
    }

    async findProviderByRuc(ruc: string): Promise<Provider | null> {
        return await this.providerRepository.findOne({
            where: { ruc }
        });
    }

    async getNumberProviders(): Promise<{ quantity: number }> {
        return {
            quantity: await this.providerRepository.count({
                where: { isActive: true }
            })
        };
    }

    async getNumberProvidersByQuerySearch(querySearch: string): Promise<{ quantity: number }> {
        return {
            quantity: await this.providerRepository.count({
                where: [
                    { ruc: Like(`%${querySearch}%`), isActive: true },
                    { description: Like(`%${querySearch}%`), isActive: true },
                ]
            })
        };
    }

    async createProvider(createProviderDto: CreateProviderDto): Promise<Provider> {
        try {
            const proveedor = this.providerRepository.create(createProviderDto);
            return await this.providerRepository.save(proveedor);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Provider');
        }
    }

    async updateProvider(ruc: string, updateProviderDto: UpdateProviderDto): Promise<Provider> {
        try {
            updateProviderDto.modifiedDate = new Date();
            const result = await this.providerRepository.update({ ruc }, updateProviderDto)
            if (result.affected === 0) {
                throw new NotFoundException("Provider not found");
            }
            return this.findProviderByRuc(ruc);
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Provider');
        }
    }


    async deactivateProvider(ruc: string): Promise<{ message: string, error?: string }> {
        try {
            const result = await this.providerRepository.update({ ruc }, { isActive: false })
            if (result.affected) return { message: `${result.affected} provider(s) have been deactivated` }
            else throw new Error("Not deactivated")
        } catch (error) {
            this.databaseErrorService.handleDatabaseError(error, 'Provider')
        }
    }


}