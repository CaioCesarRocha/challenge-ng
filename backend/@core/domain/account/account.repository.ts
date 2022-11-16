
export type AccountOutput={
    id: string;
    balance: number;
}


export interface AccountRepositoryInterface{
    //insert(account: Account): Promise<Account>;
    findAccountById(id: string): Promise<AccountOutput>;
    //update(account: Account): Promise<void>
}