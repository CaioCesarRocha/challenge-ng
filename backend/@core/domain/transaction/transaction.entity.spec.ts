import {Transaction, TransactionProps }from './transaction.entity'

describe('Testing Transaction Entity', () =>{      
    it('testing constructor',() =>{
        const transactionProps: TransactionProps ={
            debitedId: "1",
            creditedId: "2",
            value: 50
        }
        const newTransaction = Transaction.create(transactionProps)
        expect(newTransaction.id).toBeDefined()
        expect(newTransaction.props).toStrictEqual(transactionProps)
})

    it('Testing Update Value',() =>{
        const transactionProps: TransactionProps ={
            debitedId: "1",
            creditedId: "2",
            value: 50
        }
        const newTransaction = Transaction.create(transactionProps)
        newTransaction.updateValue(70)
        expect(newTransaction.id).toBeDefined()
        expect(newTransaction.props.value).toStrictEqual(70)
    })
})