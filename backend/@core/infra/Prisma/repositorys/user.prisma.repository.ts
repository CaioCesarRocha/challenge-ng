import { User } from "../../../domain/user/user.entity";
import { Account } from "../../../domain/account/account.entity";
import {  UserRepositoryInterface, UserOutput } from "../../../domain/user/user.repository";
import { prisma } from "../prismaClient";


export class UserPrismaRepository implements UserRepositoryInterface{ 
    constructor(){}

    async insert(user: User, account: Account): Promise<UserOutput> { 
        const [accountCreated, userCreated] = await prisma.$transaction([
            prisma.account.create({ data: account.toJSON() }),
            prisma.user.create({ data: user.toJSON() }),
        ])
        const userNormalized = User.create(userCreated);
        userNormalized.updateAccountId(accountCreated.id);
        await prisma.user.update({
            where: {id: userCreated.id },
            data: userNormalized.toJSON(),
        })
        return userNormalized;   
    }

    async findByUsername(username: string): Promise<UserOutput|void> {
        const user = await prisma.user.findUnique({where: {username: username}})     
        return user;
    }
}
