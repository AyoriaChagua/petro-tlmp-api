import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { QueryFailedError } from "typeorm";

export class DatabaseErrorService {
    handleDatabaseError(error: any, nameModule: string): never {
        if (error instanceof NotFoundException) {
            throw error;
        }

        if (error instanceof QueryFailedError && error.driverError.code === 'EREFUSED') {
            throw new Error('Correlative control cannot be deleted because it has related items');
        } else if (error instanceof QueryFailedError) {
            const dbErrorCode = error.driverError?.number;

            if (dbErrorCode === 2627 || dbErrorCode === 2601) {
                throw new HttpException(
                    'A record with this primary key or unique index already exists.',
                    HttpStatus.CONFLICT
                );
            }
        }
        throw new HttpException(
            `An unexpected error occurred while executing this operation in the ${nameModule} module`,
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}