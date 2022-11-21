import { UserInMemoryRepository } from "../../infra/db-in-memory/user-in-memory.repository";
import { CreateUserUseCase } from "./create-user.use-case";

describe('Testing Create User UseCases', () =>{
    it('Should Create a New User', async() =>{
        const repository = new UserInMemoryRepository();
        const createNewUser = new CreateUserUseCase(repository)

        const userCreated = await createNewUser.execute({
            username: 'Silver',
            password: 'Senhateste1'
        });

        expect(repository.users).toHaveLength(1);
        expect(userCreated.id).toBeDefined()      
        expect(userCreated.username).toEqual('Silver');
    })
})