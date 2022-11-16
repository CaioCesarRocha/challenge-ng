declare namespace Express{
    export interface Request{
        userId: string;
        debitedUserBalance?: number;
        creditedUserBalance?: number;
    }
}