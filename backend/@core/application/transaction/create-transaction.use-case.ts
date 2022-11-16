import { TransactionRepositoryInterface } from "@core/domain/transaction/transaction.repository";
import { FindAccountByIdUseCase } from "../account/find-account-by-id.use-case";
import { AccountPrismaRepository } from "@core/infra/Prisma/repositorys/account.prisma.repository";


export class CreateTransaction{
    constructor(private transactionRepo: TransactionRepositoryInterface){}
    
    async execute(input: CreateTransactionInput): Promise<CreateTransactionOutput>{
       
    }
}

export type CreateTransactionInput={
    debitedAccountId: string;
    creditedAccountId: string;
    debitedUserBalance: number;
    creditedUserBalance: number;
    value: number;
}

export type CreateTransactionOutput={
    id: string;
    debitedAccountId: string;
    creditedAccountId: string;
    value: number
    createdAt: Date;
}