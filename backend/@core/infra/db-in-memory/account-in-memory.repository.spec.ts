import { AccountInMemoryRepository } from "./account-in-memory.repository";
import { User, UserProps } from "../../domain/user/user.entity";
import {Account} from "../../domain/account/account.entity"

describe('Testing Account-In-Memory Repository', () =>{
    it('Should insert a new Account && find by Id', async() =>{
        const repository = new AccountInMemoryRepository();

        const account = Account.create()        
        await repository.insert(account)
        const accountFound = await repository.findAccountById(account.id)
        expect(accountFound.balance).toStrictEqual(100)
    })
})