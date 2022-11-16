import { Router, Request, Response, NextFunction} from "express";
import { FindAccountByIdUseCase } from "../../@core/application/account/find-account-by-id.use-case";
import { AccountPrismaRepository } from "../../@core/infra/Prisma/repositorys/account.prisma.repository";
import { ensureAuthenticateUser } from "../middlewares/ensureAuthenticateUser";

const accountRoutes = Router();
const accountRepo = new AccountPrismaRepository()

accountRoutes.get('/account', 
    ensureAuthenticateUser, 
    async(req: Request, res: Response, next: NextFunction)=>{ 
        const { accountId } = req.body;
        const findAccountById = new FindAccountByIdUseCase(accountRepo);
        const output = await findAccountById.execute(accountId);
        res.status(201).json(output) 
    }
);

export { accountRoutes };