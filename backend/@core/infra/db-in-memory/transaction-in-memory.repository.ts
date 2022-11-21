import { Transaction, TransactionRepositoryInterface} from "../../domain/transaction/transaction.repository";

export type TransactionInput={
    debitedAccountId: string;
    creditedAccountId: string;
    debitedUserBalance: number;
    creditedUserBalance: number;
    usernameCredited: string;
    value: number;
}

export class TransactionInMemoryRepository implements TransactionRepositoryInterface{
    transactions: Transaction[] = [];

    async insert(transaction: TransactionInput): Promise<Transaction> {
        const newTransaction = {
            id: "1",
            debitedAccountId: transaction.debitedAccountId,
            creditedAccountId: transaction.creditedAccountId,
            userTransfer: transaction.usernameCredited,
            value: 50,
            createdAt: new Date()
        }
        this.transactions.push(newTransaction);
        return this.transactions[0];
    }

    async findByIdUser(id: string): Promise<Transaction[]> {
        const listTransactions:Transaction[] = []
        this.transactions.forEach((transaction) =>{
            if(transaction.debitedAccountId === id || transaction.creditedAccountId === id){
                listTransactions.push(transaction)  
            }                  
        })
        return listTransactions
    }

    async filter(id: string, filter: "cashIn" | "cashOut" | Date[]): Promise<Transaction[]> {
        const listTransactions:Transaction[] = []
        if(filter === 'cashIn'){
            this.transactions.forEach((transaction) =>{
                if(transaction.creditedAccountId === id){
                    listTransactions.push(transaction)  
                }                  
            })
            return listTransactions;                 
        }
        if(filter === 'cashOut'){
            this.transactions.forEach((transaction) =>{
                if(transaction.debitedAccountId === id){
                    listTransactions.push(transaction)  
                }                  
            })
            return listTransactions;                 
        }
    }
}