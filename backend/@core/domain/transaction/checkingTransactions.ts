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
    if(!creditedUser) throw new Error("Usuário informado não existe"); 

    const debitedAccount = await findAccountsById.execute(input.debitedAccountId);
    const creditedAccount = await findAccountsById.execute(creditedUser.accountId);
    if(!debitedAccount || !creditedAccount) throw new Error("A conta informada não existe");

    if(debitedAccount.balance < input.value){
        throw new Error("Usuário não possui saldo suficiente para a transferência"); 
    }
    if(input.debitedAccountId === creditedUser.accountId){
        throw new Error("Usuário não pode transferir para si mesmo."); 
    }

    const creditedAccountId = creditedUser.accountId;
    const newBalanceDebited = debitedAccount.balance - input.value;
    const newBalanceCredited = creditedAccount.balance + input.value;

    return { creditedAccountId, newBalanceDebited, newBalanceCredited};
}

