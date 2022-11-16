import { NextFunction, Request, Response } from "express";

export async function chekingInputCreateUser(request: Request, response: Response, next: NextFunction){
    const {username, password} = request.body;
    const usernameSizeMinimum = 3;
    const passwordSizeMinimum = 8;
    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

    if(username.length < usernameSizeMinimum) {
        return response.status(400).json({message: "Username should has at least 3 characters"})
    }  
    if(password.length < passwordSizeMinimum) {
        return response.status(400).json({message: "Password should has at least 8 characters"})
    } 
    if(!regex.exec(password)){
        return response.status(400).json(
            {message: "Password should has at least 1 number and 1 capital letter"}
        )
    }
    next();
}