import { UserRepositoryInterface, UserOutput } from "../../domain/user/user.repository";
import { User } from "../../domain/user/user.entity";
import { Account } from "../../domain/account/account.entity";

export class UserInMemoryRepository implements UserRepositoryInterface{
    users: User[] = [];
    accounts: Account[] = []

    async insert(user: User, account: Account): Promise<UserOutput> {
        this.accounts.push(account);
        const newUser = {...user.toJSON(), accountId: account.id}
        this.users.push(User.create(newUser, newUser.id));
        return newUser;
    }

    async findByUsername(username: string): Promise<UserOutput> {
        const listUsers:User[] = []
        this.users.forEach((user) =>{
            if(user.props.username === username) listUsers.push(user)          
        })
        return listUsers[0]
    }

}