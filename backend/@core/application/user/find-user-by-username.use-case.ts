import { User } from "../../domain/user/user.entity";
import { UserRepositoryInterface } from "../../domain/user/user.repository";


export class FindUserByUsernameUseCase{
    constructor(private userRepo: UserRepositoryInterface){}

    async execute(username: string): Promise<FindByUsernameUseCaseOutput|void>{   
       const user = await this.userRepo.findByUsername(username);
       return user;
    }
}

type FindByUsernameUseCaseOutput={
    id: string;
    username: string;
    password: string;
    accountId: string;
}