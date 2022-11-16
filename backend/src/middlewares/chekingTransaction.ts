import { NextFunction, Request, Response } from "express";
import { FindAccountByIdUseCase } from "../../@core/application/account/find-account-by-id.use-case";
import { AccountPrismaRepository } from "../../@core/infra/Prisma/repositorys/account.prisma.repository";
import { UserPrismaRepository } from "../../@core/infra/Prisma/repositorys/user.prisma.repository";
import { FindUserByUsernameUseCase } from "../../@core/application/user/find-user-by-username.use-case";

export async function chekingTransaction(request: Request, response: Response, next: NextFunction){
    const {debitedId, username, value} = request.body;
    
    const userRepo = new UserPrismaRepository();
    const findUserByUsername = new FindUserByUsernameUseCase(userRepo);
    const accountRepo = new AccountPrismaRepository();
    const findAccountsById = new FindAccountByIdUseCase(accountRepo);

    const creditedUser = await findUserByUsername.execute(username);
    const debitedAccount = await findAccountsById.execute(debitedId);
    const creditedAccount = await findAccountsById.execute(creditedUser.accountId);

    if(debitedAccount.balance < value){
        return response.status(400).json({message: "User dosen't have balance enough"})
    }
    if(debitedId === creditedUser.id){
        return response.status(400).json({message: "User can't debit to himself"})
    }

    const newBalanceDebited = debitedAccount.balance - value;
    const newBalanceCredited = creditedAccount.balance + value;

    request.debitedUserBalance = newBalanceDebited;
    request.creditedUserBalance = newBalanceCredited;
    next();
}