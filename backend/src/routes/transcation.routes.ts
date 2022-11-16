import { Router, Request, Response, NextFunction} from "express";
import { ensureAuthenticateUser } from "../middlewares/ensureAuthenticateUser";
import { CreateTransactionUseCase} from "../../@core/application/transaction/create-transaction.use-case";
import { FindTransactionByUserIdUseCase } from "../../@core/application/transaction/find-transaction-by-user-id.use-case";
import { TransactionPrismaRepository } from "../../@core/infra/Prisma/repositorys/transaction.prisma.repository";

const transactionRoutes = Router();
const transactionRepo = new TransactionPrismaRepository();

transactionRoutes.post('/transaction', 
    ensureAuthenticateUser, 
    async(req: Request, res: Response, next: NextFunction)=>{ 
        const {debitedAccountId, usernameCredited, value} = req.body;
        const input = {debitedAccountId, usernameCredited, value}
        const createTransaction = new CreateTransactionUseCase(transactionRepo);
        const output = await createTransaction.execute(input);
        res.status(201).json(output) 
    }
);

transactionRoutes.get('/transaction', 
    ensureAuthenticateUser, 
    async(req: Request, res: Response, next: NextFunction)=>{ 
        const { accountId } = req.body;
        const createTransaction = new FindTransactionByUserIdUseCase(transactionRepo);
        const output = await createTransaction.execute(accountId);
        res.status(201).json(output) 
    }
);

export { transactionRoutes };