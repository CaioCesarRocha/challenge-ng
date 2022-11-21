import { UserInMemoryRepository } from "../../infra/db-in-memory/user-in-memory.repository";
import { TransactionInMemoryRepository } from "../../infra/db-in-memory/transaction-in-memory.repository";
import {CreateTransactionUseCase} from '../transaction/create-transaction.use-case';
import { CreateUserUseCase} from '../user/create-user.use-case';

describe('Testing Create a new Transaction', () =>{
    it('Should Create a New Transaction', async() =>{
        const repositoryUser = new UserInMemoryRepository()
        const repository = new TransactionInMemoryRepository();

        const createNewUser = new CreateUserUseCase(repositoryUser)
        await createNewUser.execute({
            username: 'Silver',
            password: 'Senhateste1'
        });
        
        const createTransaction = new CreateTransactionUseCase(repository)

        const transaction = {
            debitedAccountId: "4",
            creditedAccountId: "5",
            creditedUserBalance: 100,
            debitedUserBalance: 100,
            usernameCredited: "Silver",
            value: 50,
        }    

        const transactionCreated = await createTransaction.execute(transaction, true);
        expect(transactionCreated.id).toBeDefined();
        expect(transactionCreated.value).toStrictEqual(50)
        expect(transactionCreated.userTransfer).toStrictEqual('Silver')
    })
})