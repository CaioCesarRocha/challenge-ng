import { Router, Request, Response, NextFunction} from "express";
import { ensureAuthenticateUser } from "src/middlewares/ensureAuthenticateUser";
import { chekingInputCreateUser } from "../middlewares/chekingCreateUserInput";
import { CreateTransaction } from "@core/application/transaction/create-transaction.use-case";
import { TransactionPrismaRepository } from "@core/infra/Prisma/repositorys/transaction.prisma.repository";

const transactionRoutes = Router();
const transactionRepo = new TransactionPrismaRepository();

transactionRoutes.post('/transaction',
    ensureAuthenticateUser,
    chekingInputCreateUser, 
    async(req: Request, res: Response, next: NextFunction)=>{ 
        const debitedUserBalance = req?.debitedUserBalance;
        const creditedUserBalance = req?.creditedUserBalance;
        const transactionInput = {
            debitedAccountId: req.body.debitedAccountId,
            creditedAccountId: req.body.creditedAccountId,
            debitedUserBalance: debitedUserBalance,
            creditedUserBalance: creditedUserBalance,
            value: req.body.value
        }
        const createTransaction = new CreateTransaction(transactionRepo);
        const output = await createTransaction.execute(transactionInput);
        res.status(201).json(output) 
    }
)

export { transactionRoutes };