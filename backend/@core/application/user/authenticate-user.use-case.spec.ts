import { UserInMemoryRepository } from "../../infra/db-in-memory/user-in-memory.repository";
import { CreateUserUseCase } from "./create-user.use-case";
import {AuthenticateUserUseCase} from '../user/authenticate-user.use-case';

describe('Testing Authenticate User UseCases', () =>{
    it('Should Authentica an User', async() =>{
        const repository = new UserInMemoryRepository();

        const user = {
            username: 'Silver',
            password: 'Senhateste1'
        }
        const createNewUser = new CreateUserUseCase(repository);      
        const userCreated = await createNewUser.execute(user);

        const authenticateUser = new AuthenticateUserUseCase(repository);
        const userAuthenticated = await authenticateUser.execute(user);

        expect(userAuthenticated.token).toBeDefined()      
        expect(userAuthenticated.user.id).toEqual(userCreated.id);
        expect(userAuthenticated.user.username).toEqual('Silver');
    })
})