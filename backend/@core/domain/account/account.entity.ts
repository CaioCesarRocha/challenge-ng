import crypto from 'crypto';

export type AccountProps={
    balance?: number
}

export class Account{
    public readonly id: string;
    public props: Required<AccountProps>;
    public readonly initialBalance = 100;

    private constructor(props?: AccountProps, id?: string){
        this.id = id || crypto.randomUUID();
        
        this.props ={
            ...props,
            balance: props?.balance || this.initialBalance
        }
    }

    static create(props?: AccountProps, id?:string){
        return new Account(props, id)
    }

    updateBalance(balance: number){
        this.props.balance = balance;
    }

    private set balance(value: number){
        this.props.balance = value;
    }

    get balance(){
        return this.props.balance;
    }

    toJSON(){
        return {
            id: this.id,
            ...this.props
        }
    }
}