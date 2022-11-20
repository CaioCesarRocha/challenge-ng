import { useContextSelector } from 'use-context-selector'
import { useMemo } from 'react'
import { TransactionContext } from '../contexts/TransactionContext'
import useAuth from './useAuth'

export function useSummary() {
  const {user} = useAuth();
  const  transactions  = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })
  
  const summary = useMemo(() =>{ 
    return transactions.reduce(
      (acc, transactions) => {
        if (transactions.creditedAccountId === user.accountId) {
          acc.inputs++;
          acc.balance += +transactions.value;
        }
        if (transactions.debitedAccountId === user.accountId) {
          acc.outputs++
          acc.balance += -transactions.value
        }
        return acc
      },
      { inputs: 0, outputs: 0, balance: 0 },
    )
  }, [transactions, user.accountId])

  return summary
}
