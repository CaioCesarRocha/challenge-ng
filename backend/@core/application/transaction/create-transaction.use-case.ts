import { TransactionRepositoryInterface } from "@core/domain/transaction/transaction.repository";
import { checkingTransactions } from "../../domain/transaction/checkingTransactions";

export class CreateTransactionUseCase{
    constructor(private transactionRepo: TransactionRepositoryInterface){}
    
    async execute(input: CreateTransaction){
       const newBalances = await checkingTransactions(input);
       const newTransaction = {
            debitedAccountId: input.debitedAccountId,
            creditedAccountId: newBalances.creditedAccountId,
            debitedUserBalance: newBalances.newBalanceDebited,
            creditedUserBalance: newBalances.newBalanceCredited,
            value: input.value
       }
       const transaction = await this.transactionRepo.insert(newTransaction)
       return transaction;
    }
}

export type CreateTransaction={
    debitedAccountId: string;
    usernameCredited: string;
    value: number;
}

export type CreateTransactionOutput={
    id: string;
    debitedAccountId: string;
    creditedAccountId: string;
    value: number
    createdAt: Date;
}