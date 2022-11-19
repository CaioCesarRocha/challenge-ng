import { Router, Request, Response, NextFunction} from "express";
import { FindAccountByIdUseCase } from "../../@core/application/account/find-account-by-id.use-case";
import { AccountPrismaRepository } from "../../@core/infra/Prisma/repositorys/account.prisma.repository";
import { ensureAuthenticateUser } from "../middlewares/ensureAuthenticateUser";

const accountRoutes = Router();
const accountRepo = new AccountPrismaRepository()

accountRoutes.get('/account/:id', 
    ensureAuthenticateUser, 
    async(req: Request, res: Response, next: NextFunction)=>{ 
        const id = req.params.id;
        const findAccountById = new FindAccountByIdUseCase(accountRepo);
        const output = await findAccountById.execute(id);
        res.status(201).json(output) 
    }
);

export { accountRoutes };