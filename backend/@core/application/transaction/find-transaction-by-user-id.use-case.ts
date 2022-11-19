import { TransactionRepositoryInterface } from "@core/domain/transaction/transaction.repository";

export class FindTransactionByUserIdUseCase{
    constructor(private transactionRepo: TransactionRepositoryInterface){}

    async execute(id: string): Promise<TransactionOutput>{
        const transactions = await this.transactionRepo.findByIdUser(id);

        return transactions;
    }
}

type TransactionOutput={
    id: string;
    debitedAccountId: string;
    creditedAccountId: string;
    userTransfer?: string;
    value: number;
    createdAt: Date;
}[];