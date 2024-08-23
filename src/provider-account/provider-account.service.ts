import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProviderAccount } from "./provider-account.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProviderAccountService {
    constructor(
        @InjectRepository(ProviderAccount)
        private providerAccountRepository: Repository<ProviderAccount>,
    ) { }

    async findByProvider(ruc: string): Promise<ProviderAccount[] | {
        message: string,
        error?: any
    }> {
        try {
            return this.providerAccountRepository.find({
                where: { supplierRUC: ruc, isActive: true },
                order: { createdAt: 'ASC' }
            });
        } catch (error) {
            return { message: 'Not found', error: error.message };
        }
    }

    async createProviderAccounts(providerAccounts: Partial<ProviderAccount>[]): Promise<{ message: string, error?: string }> {
        try {
            const accounts = this.providerAccountRepository.create(providerAccounts);
            await this.providerAccountRepository.save(accounts);
            return { message: 'Accounts created successfully!' };
        } catch (error) {
            return { message: 'Accounts not created', error: error.message };
        }
    }

    async updateProviderAccount(accountData: Partial<ProviderAccount>, accountId: number): Promise<{
        message: string,
        error?: any
    }> {
        try {
            accountData.updatedAt = new Date();
            await this.providerAccountRepository.update({ id: accountId }, accountData);
            return { message: 'Account updated successfully!' };
        } catch (error) {
            return { message: 'Not updated', error: error.message };
        }
    }

    async deleteProviderAccount(accountId: number): Promise<{
        message: string,
        error?: any
    }> {
        try {
            await this.providerAccountRepository.update({ id: accountId }, { isActive: false });
            return { message: 'Account deleted successfully!' };
        } catch (error) {
            return { message: 'Not deleted', error: error.message };
        }
    }

}