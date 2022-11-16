import { CreateTransactionInput } from "../../application/transaction/create-transaction.use-case";

export type Transaction={
    id: string;
    debitedAccountId: string;
    creditedAccountId: string;
    value: number
    createdAt: Date;
}

export interface TransactionRepositoryInterface{
    insert(transaction: CreateTransactionInput): Promise<Transaction>;
    //findByIdUser(id: string): Promise<Transaction[]>;
    //filter(id: string, filter: string): Promise<Transaction[]>
}