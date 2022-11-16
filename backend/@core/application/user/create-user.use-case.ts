import { hash } from "bcrypt";
import { User } from "../../domain/user/user.entity";
import { Account } from "../../domain/account/account.entity";
import { UserRepositoryInterface } from "../../domain/user/user.repository";

export class CreateUserUseCase{
    constructor(private userRepo: UserRepositoryInterface){}

    async execute(input: CreateUserInput): Promise<CreateUserOutput>{       
        const user = User.create(input);
        const account = Account.create();
        const hashPassword = await hash(user.props.password, 10);
        user.updatePassword(hashPassword);
        const userCreated = await this.userRepo.insert(user, account);
        return userCreated;
    }
}

export type CreateUserInput = {
    username: string;
    password: string;
}

type CreateUserOutput = {
    id: string;
    username: string;
    password: string;
}