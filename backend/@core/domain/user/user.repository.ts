import { User } from "./user.entity";
import { Account } from "../account/account.entity";

export type UserOutput={
    id: string;
    username: string;
    password: string;
    accountId: string;
}

export interface UserRepositoryInterface{
    insert(user: User, account: Account): Promise<UserOutput>;
    findByUsername(username: string): Promise<UserOutput>;
}