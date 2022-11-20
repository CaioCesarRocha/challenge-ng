import { Router, Request, Response, NextFunction} from "express";
import { ensureAuthenticateUser } from "../middlewares/ensureAuthenticateUser";
import { CreateTransactionUseCase} from "../../@core/application/transaction/create-transaction.use-case";
import { FindTransactionByUserIdUseCase } from "../../@core/application/transaction/find-transaction-by-user-id.use-case";
import { TransactionPrismaRepository } from "../../@core/infra/Prisma/repositorys/transaction.prisma.repository";
import { FilterTransactionUseCase } from "../../@core/application/transaction/filter-transaction.user-case";

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

transactionRoutes.get('/transaction/:AccountId', 
    ensureAuthenticateUser, 
    async(req: Request, res: Response, next: NextFunction)=>{ 
        const accountId  = req.params.AccountId;
        const createTransaction = new FindTransactionByUserIdUseCase(transactionRepo);
        const output = await createTransaction.execute(accountId);
        res.status(201).json(output) 
    }
);

transactionRoutes.get('/transaction/filter/:id/:filter', 
    ensureAuthenticateUser, 
    async(req: Request, res: Response, next: NextFunction)=>{  
        const accountId = req.params.id;
        const filter = req.params.filter;
        const input = {accountId, filter};
        const filterTransaction = new FilterTransactionUseCase(transactionRepo)
        const output = await filterTransaction.execute(input);
        res.status(201).json(output) 
    }
);

export { transactionRoutes };