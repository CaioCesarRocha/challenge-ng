import {AccountRepositoryInterface} from '../../domain/account/account.repository';
import { Account } from "../../domain/account/account.entity";


export class CreateAccount{
    constructor(private accountRepo: AccountRepositoryInterface){}

    async execute(input: CreateAccountInput): Promise<CreateAccountOutput>{
        const account = Account.create(input);
        await this.accountRepo.insert(account);
        return account.toJSON();
    }
}

type CreateAccountInput ={
    balance?: number;
}

type CreateAccountOutput ={
    id: string;
    balance: number;
}