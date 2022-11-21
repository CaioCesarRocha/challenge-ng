import { UserInMemoryRepository } from "./user-in-memory.repository";
import { User, UserProps } from "../../domain/user/user.entity";
import {Account} from "../../domain/account/account.entity"

describe('Testing User-In-Memory Repository', () =>{
    it('Should insert a new User', async() =>{
        const repository = new UserInMemoryRepository();

        let userProps: UserProps ={
            username: 'Silver',
            password: '12345'
        }
        const user = User.create(userProps);
        const account = Account.create()        
        await repository.insert(user, account)
        expect(repository.users).toHaveLength(1)
        expect(repository.users[0].props.accountId).toStrictEqual(account.id)
        expect(repository.users[0].props.username).toStrictEqual('Silver')
        expect(repository.users[0].props.password).toStrictEqual('12345')
    })

    it('Should find an user by Username', async() =>{
        const repository = new UserInMemoryRepository();

        let userProps: UserProps ={
            username: 'Silver',
            password: '12345'
        }
        const user = User.create(userProps);
        const account = Account.create()        
        await repository.insert(user, account)
        const userFound = await repository.findByUsername('Silver')
        expect(userFound.id).toStrictEqual(user.id)
        expect(userFound.password).toStrictEqual('12345')
        expect(userFound.accountId).toStrictEqual(account.id)
    })
})