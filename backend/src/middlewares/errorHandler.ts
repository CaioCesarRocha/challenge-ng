import { Request, Response, NextFunction, response } from 'express';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof Error) return res.status(400).json({message: error.message})
         
    return res.status(500).json({message: "Internal Error"});
}

export default errorHandler;