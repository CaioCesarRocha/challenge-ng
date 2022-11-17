import { Router, Request, Response, NextFunction} from "express";
import { CreateUserUseCase } from "../../@core/application/user/create-user.use-case";
import { FindUserByUsernameUseCase } from "../../@core/application/user/find-user-by-username.use-case";
import { AuthenticateUserUseCase } from "../../@core/application/user/authenticate-user.use-case";
import { UserPrismaRepository } from "../../@core/infra/Prisma/repositorys/user.prisma.repository";

const userRoutes = Router();
const userRepo = new UserPrismaRepository();

userRoutes.post('/user', 
    async(req: Request, res: Response, next: NextFunction)=>{ 
        const {username, password} = req.body;  
        const findUserByUsername = new FindUserByUsernameUseCase(userRepo)
        const userExist = await findUserByUsername.execute(username)
        if(userExist?.username === username) next(new Error('User already exist'));
        else{
            const input = {username, password};
            const createUseCase = new CreateUserUseCase(userRepo);
            const output = await createUseCase.execute(input);
            res.status(201).json(output) 
        }  
    }
)

userRoutes.get('/userByUsername/:username', async(req: Request, res: Response) =>{
    const {username} = req.params;
    const FindUserByUsername = new FindUserByUsernameUseCase(userRepo);
    const user = await FindUserByUsername.execute(username)
    return res.json(user)
})

userRoutes.post('/authenticate', async(req: Request, res: Response) =>{
    const {username, password} = req.body;
    const input = {username, password};
    const authenticateDeliverymanUseCase = new AuthenticateUserUseCase(userRepo);
    const resultAuthentication = await authenticateDeliverymanUseCase.execute(input)
    return res.json(resultAuthentication)
})

export { userRoutes };