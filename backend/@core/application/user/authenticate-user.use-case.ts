import { UserRepositoryInterface } from "../../domain/user/user.repository";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

export class AuthenticateUserUseCase{
    constructor(private userRepo: UserRepositoryInterface){}
    
    async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput>{
        const user = await this.userRepo.findByUsername(input.username);
        if(!user) throw new Error('Client not exist!');
        else{          
            const passwordMatch = await compare(input.password, user?.password);
            if(!passwordMatch) throw new Error('Password invalid!')
            const username = input.username;

            const token = sign({username}, process.env.md5Hash,{ 
                subject: user?.id,
                expiresIn: "1d",
            }) 
            const userAuthenticated = {user: user, token: token}
            return userAuthenticated; 
        }            
    }
}

type User={
    id: string;
    username: string;
    password: string;
    accountId: string;
}

type AuthenticateUserInput={
    username: string
    password: string;
}

type AuthenticateUserOutput={
    user: User;
    token: string;
}