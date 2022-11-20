export type TransactionInput={
    debitedAccountId: string;
    creditedAccountId: string;
    debitedUserBalance: number;
    creditedUserBalance: number;
    usernameCredited: string;
    value: number;
}

export type Transaction={
    id: string;
    debitedAccountId: string;
    creditedAccountId: string;
    userTransfer?: string;
    value: number
    createdAt: Date;
}

export interface TransactionRepositoryInterface{
    insert(transaction: TransactionInput): Promise<Transaction>;
    findByIdUser(id: string): Promise<Transaction[]>;
    filter(id: string, filter: 'cashIn' | 'cashOut' | Date[]): Promise<Transaction[]>
}