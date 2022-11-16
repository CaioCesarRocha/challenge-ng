
export type TransactionInput={
    debitedAccountId: string;
    creditedAccountId: string;
    debitedUserBalance: number;
    creditedUserBalance: number;
    value: number;
}

export type Transaction={
    id: string;
    debitedAccountId: string;
    creditedAccountId: string;
    value: number
    createdAt: Date;
}

export interface TransactionRepositoryInterface{
    insert(transaction: TransactionInput): Promise<Transaction>;
    findByIdUser(id: string): Promise<Transaction[]>;
    //filter(id: string, filter: string): Promise<Transaction[]>
}