import { TransactionInput } from "../../../domain/transaction/transaction.repository";
import { TransactionRepositoryInterface } from "../../../domain/transaction/transaction.repository";
import { Transaction } from "../../../domain/transaction/transaction.repository";
import { prisma } from "../../Prisma/prismaClient";

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
        return newTransaction;
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
        return transactions;
    }

    /*async filter(id: string, filter: string): Promise<Transaction[]> {
        
    }*/
}