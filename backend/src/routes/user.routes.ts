import { Router, Request, Response, NextFunction} from "express";
import { chekingInputCreateUser } from "../middlewares/chekingCreateUserInput";
import { CreateUserUseCase } from "../../@core/application/user/create-user.use-case";
import { FindUserByUsernameUseCase } from "../../@core/application/user/find-user-by-username.use-case";
import { CheckingPassword, CheckingUsername, CheckingCharacters } from "../../@core/domain/user/checkingInputCreateUser";
import { UserPrismaRepository } from "../../@core/infra/Prisma/repositorys/user.prisma.repository";


const userRoutes = Router();
const userRepo = new UserPrismaRepository();

userRoutes.post('/user', 
    chekingInputCreateUser, 
    async(req: Request, res: Response, next: NextFunction)=>{ 
        const findUserByUsername = new FindUserByUsernameUseCase(userRepo)
        const userExist = await findUserByUsername.execute(req.body.username)
        if(userExist.username === req.body.username) next(new Error('User already exist'));
        else{
            const createUseCase = new CreateUserUseCase(userRepo);
            const output = await createUseCase.execute(req.body);
            res.status(201).json(output) 
        }  
    }
)

export { userRoutes };