export type AccountOutput={
    id: string;
    balance: number;
}

export interface AccountRepositoryInterface{
    findAccountById(id: string): Promise<AccountOutput>;
}