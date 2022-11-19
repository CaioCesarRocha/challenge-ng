import { TransactionInput, Transaction, TransactionRepositoryInterface } 
    from "../../../domain/transaction/transaction.repository";
import { prisma } from "../../Prisma/prismaClient";


async function normalizeTransactions(transactions: Transaction[], id: string): Promise<Transaction[]>{
    const transactionsWithUsername: Transaction[] = [];
    await Promise.all(transactions.map( async(transaction) =>{
        if(transaction.debitedAccountId !== id){
            await prisma.user.findUnique({
                where: {accountId: transaction.debitedAccountId}
            }).then((data) =>{
                transactionsWithUsername.push({...transaction, userTransfer: data.username})
            })         
        }
        if(transaction.creditedAccountId !== id){          
            await prisma.user.findUnique({ 
                where: {accountId: transaction.creditedAccountId}
            }).then((data) =>{
                transactionsWithUsername.push({...transaction, userTransfer: data.username}) 
            });                       
        }     
    }))
    return transactionsWithUsername;  
}


export class TransactionPrismaRepository implements TransactionRepositoryInterface{
    constructor(){}

    async insert(transaction: TransactionInput): Promise<Transaction> {
        const [newTransaction, debitedAccount, creditedAccount] = await prisma.$transaction([
            prisma.transaction.create({ data: {
                debitedAccountId: transaction.debitedAccountId,
                creditedAccountId: transaction.creditedAccountId,
                value: transaction.value
            }}),
            prisma.account.update({
                where: { id: transaction.debitedAccountId},
                data: { balance: transaction.debitedUserBalance}
            }),
            prisma.account.update({
                where: { id: transaction.creditedAccountId},
                data: { balance: transaction.creditedUserBalance}
            })
        ])
        const transactionCreated = { ...newTransaction, userTransfer: transaction.usernameCredited}
        return transactionCreated;
    }

    async findByIdUser(id: string): Promise<Transaction[]> {
        const transactions = await prisma.transaction.findMany({
            where: {
                OR: [
                  { debitedAccountId: id},
                  { creditedAccountId: id}
                ],
            }
        })
        const normalizedTransactions = await normalizeTransactions(transactions, id);
        return normalizedTransactions;     
    }


    async filter(id: string, filter: 'cashIn' | 'cashOut' | [Date, Date]): Promise<Transaction[]> {      
        if(filter === 'cashIn'){
            const transactions = await prisma.transaction.findMany({
                where:{creditedAccountId: id} 
            }) 
            const normalizedTransactions = await normalizeTransactions(transactions, id);          
            return normalizedTransactions;
        }
        if(filter === 'cashOut'){
            const transactions = await prisma.transaction.findMany({
                where:{debitedAccountId: id} 
            })           
            const normalizedTransactions = await normalizeTransactions(transactions, id);       
            return normalizedTransactions;
        }
        const dataSelected = filter[0]
        const dataLimit = filter[1]
        const transactions = await prisma.transaction.findMany({
            where:{
                OR: [
                    { debitedAccountId: id},
                    { creditedAccountId: id}
                ],
                AND:{
                    createdAt: {gte: dataSelected, lte: dataLimit} 
                }
            }
        })
        const normalizedTransactions = await normalizeTransactions(transactions, id);          
        return normalizedTransactions;
    }
}