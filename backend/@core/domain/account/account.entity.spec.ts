import {Account} from './account.entity'

describe('Testing Account Entity', () =>{      
    it('testing constructor',() =>{
        const newAccount = Account.create()
        expect(newAccount.id).toBeDefined()
        expect(newAccount.props.balance).toStrictEqual(100)
})

    it('Testing Update Balance',() =>{
        const newAccount = Account.create()
        newAccount.updateBalance(500)
        expect(newAccount.id).toBeDefined()
        expect(newAccount.props.balance).toStrictEqual(500)
    })
})