import { TransactionRepositoryInterface } from "../../domain/transaction/transaction.repository";


export class FilterTransactionUseCase{
    constructor(private transactionRepo: TransactionRepositoryInterface){}

    async execute(input: FilterTransactionInput):Promise<FilterTransactionOutput>{
        if(input.filter !== 'cashIn' && input.filter !== 'cashOut'){
            const date = new Date(input.filter);
            const dateStart = new Date(date);
            dateStart.setDate(date.getDate()-1);
            const dateEnd = new Date(date);
            dateEnd.setDate(date.getDate()+1);
            dateEnd.toLocaleDateString();
            const dates = [dateStart, dateEnd];
            const transaction = await this.transactionRepo.filter(input.accountId, dates);
            return transaction;
        }
        const transaction = await this.transactionRepo.filter(input.accountId, input.filter);
        return transaction;     
    }
}

type FilterTransactionInput={
    accountId: string;
    filter: string|Date;
}

type FilterTransactionOutput={
    id: string;
    debitedAccountId: string;
    creditedAccountId: string;
    userTransfer?: string;
    value: number;
    createdAt: Date;
}[];