import {  ReactNode, useState, useEffect, useCallback} from 'react';
import { createContext } from 'use-context-selector';
import useAuth from '../hooks/useAuth';
import api from '../services/connection/api';

export interface ITransaction {
    id?: string
    debitedAccountId: string
    creditedAccountId?: string
    usernameCredited?: string
    userTransfer?: string
    value: number
    createdAt?: Date
    token?: string
}

export interface IError {
    msg?: string
    active: boolean
}
 
interface TransactionContextType {
  clearTransactions: () => Promise<void>,
  createTransaction: (data: ITransaction, balance: number) => Promise<boolean>,
  transactions: ITransaction[],
  balance: number,
  error: IError,
  filterTransactions: (filter: string | Date) => Promise<boolean>
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([])
    const [balance, setBalance] = useState<number>(0)
    const [error, setError] = useState<IError>({ msg: '', active: false })
    const { user } = useAuth()

    function setBearerToken(token?:string) {
        if(token){
            const config = { headers: { Authorization: 'Bearer ' + token } }
            return config
        }
        const config = { headers: { Authorization: 'Bearer ' + user?.token } }
        return config       
   }

    async function filterTransactions(filter: string | Date): Promise<boolean> {
        await new Promise((resolve) => setTimeout(resolve, 2000));     
        try {
            const config = setBearerToken()
            const transactions = await api.get(`transaction/filter/${user?.accountId}/${filter}`,config)
            setTransactions(transactions.data)
            return true
        } catch (err) {
            if (err instanceof Error) setError({ msg: err.message, active: true })
            return false
        }
    }

    const createTransaction = useCallback(
        async(data: ITransaction, balance: number): Promise<boolean> =>{
            await new Promise((resolve) => setTimeout(resolve, 2000)) // importante usar pra simular delay
            const { debitedAccountId, usernameCredited, value} = data;
            const config = setBearerToken(data?.token);
            const userExist = await api.get(`/userByUsername/${usernameCredited}`);
            if(userExist.data?.accountId === debitedAccountId){
                setError({ msg: 'Impossível transferir para você mesmo.', active: true })
                return false;
            }          
            const createdTransaction = await api.post('/transaction',
                {  
                    debitedAccountId,
                    usernameCredited,
                    value
                },
                config,
            ).then((response) =>{
                setTransactions((state) => [response.data, ...state]);
                const newBalance = balance - value;
                setBalance(newBalance);
                return true;
            }).catch((err) =>{
                setError({ msg: err.response.data.message, active: true })
                return false
            })
            if(!createdTransaction)  return false;
            return true; 
        },[],
    )

    async function clearTransactions() {
        setTransactions([]);
        setBalance(0);
    }

    useEffect(() => {
        async function getDefaultTransactions(): Promise<void> {
            const config = setBearerToken();
            if (!user.accountId) return;
            try {
                const transactions = await api.get(`/transaction/${user.accountId}`, config);
                setTransactions(transactions.data);
                const balance = await api.get(`/account/${user.accountId}`, config);
                setBalance(balance?.data?.balance)
            } catch (err) {
                if (err instanceof Error) setError({ msg: err.message, active: true })
            }
        }
        getDefaultTransactions()
    }, [user.accountId])
  
    return (
        <TransactionContext.Provider
            value={{
                balance,
                clearTransactions,
                createTransaction ,
                transactions,
                error,
                filterTransactions,
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}
