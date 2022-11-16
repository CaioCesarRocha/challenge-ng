import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
//import * as dotenv from 'dotenv';

//dotenv.config();

interface IPayload{
    sub: string;
}

export async function ensureAuthenticateUser(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader) return response.status(401).json({message: "Token missing!"})

    const [ ,token] = authHeader.split(" ")
   
    try{
        const { sub } = verify(token, process.env.md5Hash) as IPayload;
        request.userId = sub;  
        return next();
    }catch(error){
        return response.status(401).json({message: "Invalid Token!"})
    }
}