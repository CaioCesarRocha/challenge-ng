import { TransactionRepositoryInterface } from "../../domain/transaction/transaction.repository";


export class FilterTransactionUseCase{
    constructor(private transactionRepo: TransactionRepositoryInterface){}

    async execute(input: FilterTransactionInput):Promise<FilterTransactionOutput>{
        if(input.filter !== 'cashIn' && input.filter !== 'cashOut'){
            var arrDate = input.filter.split('/');
            var dateStringFormat = arrDate[1] + '-' + arrDate[0] + '-' + arrDate[2];
            const date1 = new Date(dateStringFormat);
            const date2 = new Date(date1);
            date2.setDate(date1.getDate()+1);
            date2.toLocaleDateString();
            const dates = [date1, date2]
            const transaction = await this.transactionRepo.filter(input.accountId, dates);
            return transaction;
        }
        const transaction = await this.transactionRepo.filter(input.accountId, input.filter);
        return transaction;     
    }
}

type FilterTransactionInput={
    accountId: string;
    filter: string;
}

type FilterTransactionOutput={
    id: string;
    debitedAccountId: string;
    creditedAccountId: string;
    value: number;
    createdAt: Date;
}[];