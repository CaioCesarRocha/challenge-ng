import { useContext } from 'use-context-selector';
import { TransactionContext } from '../contexts/TransactionContext';

const useTransaction = () => useContext(TransactionContext)

export default useTransaction;