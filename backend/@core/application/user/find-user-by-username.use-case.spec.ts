import { UserInMemoryRepository } from "../../infra/db-in-memory/user-in-memory.repository";
import { FindUserByUsernameUseCase } from "./find-user-by-username.use-case";
import { CreateUserUseCase } from "./create-user.use-case";

describe('Testing Find User by Username UseCase', () =>{
    it('Should find an user by username', async() =>{
        const repository = new UserInMemoryRepository();

        const createNewUser = new CreateUserUseCase(repository)
        await createNewUser.execute({
            username: 'Silver',
            password: 'Senhateste1'
        });
        const findUserByUsername = new FindUserByUsernameUseCase(repository)
        const userFound = await findUserByUsername.execute('Silver')
        if(userFound){
            expect(userFound.id).toBeDefined()      
            expect(userFound?.username).toEqual('Silver');
        }    
    })
})