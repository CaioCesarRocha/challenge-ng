import { AccountRepositoryInterface, AccountOutput } from "../../domain/account/account.repository";
import { Account } from "../../domain/account/account.entity";

export class AccountInMemoryRepository implements AccountRepositoryInterface{
    accounts: Account[] = [];

    async findAccountById(id: string): Promise<AccountOutput> {
        const listAccounts:Account[] = []
        this.accounts.forEach((account) =>{
            if(account.id === id) listAccounts.push(account)          
        })
        return listAccounts[0]
    }

    async insert(account: Account): Promise<Account> { 
        this.accounts.push(account);
        return this.accounts[0]
    }
}