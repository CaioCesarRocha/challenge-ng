import crypto from 'crypto';

export type TransactionProps={
    debitedId: string,
    creditedId: string,
    value: number,

}

export class Transaction{
    public readonly id: string;
    public props: Required<TransactionProps>;

    private constructor(props: TransactionProps, id?: string){
        this.id = id || crypto.randomUUID();
        
        this.props ={
            ...props,
        }
    }

    static create(props: TransactionProps, id?:string){
        return new Transaction(props, id)
    }

    updateCreditedId(creditedId: string){
        this.props.creditedId = creditedId;
    }

    updateDebitedId(debitedId: string){
        this.props.debitedId = debitedId;
    }

    updateValue(value: number){
        this.props.value = value;
    }

    private set creditedId(value: string){
        this.props.creditedId = value;
    }

    get creditedId(){
        return this.props.creditedId
    }

    private set debitedId(value:string){
        this.props.debitedId = value;
    }

    get debitedId(){
        return this.props.debitedId
    }
  
    private set value(value:number){
        this.props.value = value;
    }

    get value(){
        return this.props.value
    }

    toJSON(){
        return {
            id: this.id,
            ...this.props
        }
    }
}