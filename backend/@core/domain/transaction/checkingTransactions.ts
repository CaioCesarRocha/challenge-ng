import { FindAccountByIdUseCase } from "../../application/account/find-account-by-id.use-case";
import { AccountPrismaRepository } from "../../infra/Prisma/repositorys/account.prisma.repository";
import { UserPrismaRepository } from "../../infra/Prisma/repositorys/user.prisma.repository";
import { FindUserByUsernameUseCase } from "../../application/user/find-user-by-username.use-case";
import { CreateTransaction } from "../../application/transaction/create-transaction.use-case";

export async function checkingTransactions(input: CreateTransaction){
    const userRepo = new UserPrismaRepository();
    const findUserByUsername = new FindUserByUsernameUseCase(userRepo);
    const accountRepo = new AccountPrismaRepository();
    const findAccountsById = new FindAccountByIdUseCase(accountRepo);

    const creditedUser = await findUserByUsername.execute(input.usernameCredited);
    if(!creditedUser) throw new Error("User informed not exist"); 

    const debitedAccount = await findAccountsById.execute(input.debitedAccountId);
    const creditedAccount = await findAccountsById.execute(creditedUser.accountId);
    if(!debitedAccount || !creditedAccount) throw new Error("Account informed not exist");

    if(debitedAccount.balance < input.value){
        throw new Error("User dosen't have balance enough"); 
    }
    if(input.debitedAccountId === creditedUser.accountId){
        throw new Error("User can't debit to himself"); 
    }

    const creditedAccountId = creditedUser.accountId;
    const newBalanceDebited = debitedAccount.balance - input.value;
    const newBalanceCredited = creditedAccount.balance + input.value;

    return { creditedAccountId, newBalanceDebited, newBalanceCredited};
}

