import { TransactionInMemoryRepository } from "./transaction-in-memory.repository";

describe('Testing Transaction-In-Memory Repository', () =>{
    
    it('Should insert a new Transaction', async() =>{
        const repository = new TransactionInMemoryRepository();
        const transaction = {
            debitedAccountId: "4",
            creditedAccountId: "5",
            creditedUserBalance: 150,
            debitedUserBalance: 50,
            usernameCredited: "Juan",
            value: 50,
        }
     
        const newTransaction =  await repository.insert(transaction)
        expect(repository.transactions).toHaveLength(1)
        expect(newTransaction.id).toBeDefined()
        expect(newTransaction.userTransfer).toStrictEqual('Juan')
        expect(newTransaction.value).toStrictEqual(50)
    })

    it('Should Find User transfers by ID', async() =>{
        const repository = new TransactionInMemoryRepository();

        const transaction = {
            debitedAccountId: "4",
            creditedAccountId: "5",
            creditedUserBalance: 150,
            debitedUserBalance: 50,
            usernameCredited: "Juan",
            value: 50,
        }    
        await repository.insert(transaction)
        const transactionsFinded = await repository.findByIdUser("4")
        expect(transactionsFinded).toHaveLength(1)
        expect(transactionsFinded[0].value).toStrictEqual(50)
    })

    it('Should Filter User transfers by cashIn or cashOut', async() =>{
        const repository = new TransactionInMemoryRepository();

        const transaction = {
            debitedAccountId: "4",
            creditedAccountId: "5",
            creditedUserBalance: 150,
            debitedUserBalance: 50,
            usernameCredited: "Juan",
            value: 50,
        }    
        await repository.insert(transaction)
        const transactionsFinded = await repository.filter( "5","cashIn")
        expect(transactionsFinded).toHaveLength(1)
        expect(transactionsFinded[0].value).toStrictEqual(50)
        const transactionsFinded2 = await repository.filter( "4","cashIn")
        expect(transactionsFinded2).toHaveLength(0)
    })
})