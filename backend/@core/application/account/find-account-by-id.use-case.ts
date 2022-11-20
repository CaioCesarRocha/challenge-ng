import { AccountRepositoryInterface } from "@core/domain/account/account.repository";

export class FindAccountByIdUseCase{
    constructor(private accountRepo: AccountRepositoryInterface){}

    async execute(id: string): Promise<FindAccountByIdOutput>{
        const account = await this.accountRepo.findAccountById(id)
        return account;
    }
}

type FindAccountByIdOutput={
    id: string;
    balance: number;
}