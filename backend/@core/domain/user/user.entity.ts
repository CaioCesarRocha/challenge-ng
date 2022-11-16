import crypto from 'crypto';

export type UserProps={
    username: string;
    password: string;
    accountId?: string;
}

export class User {
    public readonly id: string;
    public props: Required<UserProps>;

    private constructor(props: UserProps, id?: string){
        this.id = id || crypto.randomUUID();

        this.props = {
            ...props,
            accountId: props.accountId
        }
    }

    static create(props: UserProps, id?:string){
        return new User(props, id)
    }

    updateUsername(username: string){
        this.props.username = username;
    }

    updatePassword(password: string){
        this.props.password = password;
    }

    updateAccountId(accountId: string){
        this.props.accountId = accountId;
    }

    private set username(value: string){
        this.props.username = value;
    }

    get username(){
        return this.props.username;
    }

    private set password(value: string){
        this.props.password = value;
    }

    get password(){
        return this.props.password;
    }

    private set accountId(value: string){
        this.props.accountId = value;
    }

    get accountId(){
        return this.props.accountId;
    }

    toJSON(){
        return {
            id: this.id,
            ...this.props
        }
    }
}