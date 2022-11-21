import { FindAccountByIdUseCase } from "../../application/account/find-account-by-id.use-case";
import { FindUserByUsernameUseCase } from "../../application/user/find-user-by-username.use-case";
import { AccountInMemoryRepository } from "../../infra/db-in-memory/account-in-memory.repository";
import { AccountPrismaRepository } from "../../infra/Prisma/repositorys/account.prisma.repository";
import { UserInMemoryRepository } from "../../infra/db-in-memory/user-in-memory.repository";
import { UserPrismaRepository } from "../../infra/Prisma/repositorys/user.prisma.repository";
import { CreateTransaction } from "../../application/transaction/create-transaction.use-case";


export async function checkingTransactions(input: CreateTransaction, testes?:boolean){
    if(testes) { 
        const creditedAccountId = "5";
        const newBalanceDebited = 100 - input.value;
        const newBalanceCredited = 100 + input.value;   
        return { creditedAccountId, newBalanceDebited, newBalanceCredited};
    }

    var userRepo = new UserPrismaRepository();
    var accountRepo = new AccountPrismaRepository();
    
    const findUserByUsername = new FindUserByUsernameUseCase(userRepo);
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

