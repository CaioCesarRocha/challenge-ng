import { AccountRepositoryInterface } from "@core/domain/account/account.repository";
import { prisma } from "../prismaClient";
import { AccountOutput } from "@core/domain/account/account.repository";

export class AccountPrismaRepository implements AccountRepositoryInterface{ 
    constructor(){}

    async findAccountById(id: string): Promise<AccountOutput> {
        const account = await prisma.account.findUnique({where: {id: id}})
        return account;
    }
}
