import { useEffect, useState} from 'react';
import { useContextSelector } from 'use-context-selector';
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import * as z from 'zod';
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod';
import { X, CheckCircle} from 'phosphor-react';
import { RotatingLines } from 'react-loader-spinner';
import Alert from '../Alert';
import { Overlay, Content, CloseButton, ContainerInput, ContentForm, ContentLoading} from './styles';
import { TransactionContext } from '../../contexts/TransactionContext';
import useAuth from '../../hooks/useAuth';
import useTransaction from '../../hooks/useTransaction';

const newFormTransactionSchema = z.object({
    usernameCredited: z.string(),
    value: z.string()
  })
  
type NewTransactionFormInputs = z.infer<typeof newFormTransactionSchema>

export function NewTransactionModal() {
    const [renderCreating, setRenderCreating] = useState<boolean>(false)
    const [finished, setFinished] = useState<boolean>(false)
    const { user} = useAuth();
    const { error, balance} = useTransaction();
    const createTransaction = useContextSelector(TransactionContext, (context) =>{
        return context.createTransaction
    })
    useEffect(() =>{
        if(error.msg ) toast.error(error.msg)
    }, [error.msg])

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }, // informa estado do form, podendo ser usado pra desabilitar o botao
        reset,
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newFormTransactionSchema),
    })

    async function handleSendTransaction(data: NewTransactionFormInputs) {
        setRenderCreating(true);
        const dataTransaction={
            debitedAccountId: user.accountId || '',
            usernameCredited: data.usernameCredited,
            value: parseFloat(data.value.replace(',','.')),
            token: user.token || ''
        }
        const createdTransaction = await createTransaction(dataTransaction, balance)
        if (createdTransaction) {
          setFinished(true);
          reset();
          return;
        }        
        setFinished(false);
        setRenderCreating(false);      
    }

    return(
        <Dialog.Portal>
            <Alert theme="colored" />
            <Overlay />
            <Content>
                <CloseButton>
                    <X size={24} />
                </CloseButton>             
                <form onSubmit={handleSubmit(handleSendTransaction)}>
                    <h1>Nova Transferência</h1>
                    <ContentForm>
                        <ContainerInput>
                            <p>Usuário:</p>
                            <input
                                type="text"
                                placeholder="Nome do usuário para transferência"
                                required
                                {...register('usernameCredited')}
                            />
                        </ContainerInput>         
                        <ContainerInput>
                            <p>Valor:</p>
                            <input 
                                type="float"
                                placeholder="Valor da Transferência"
                                required
                                {...register('value')}
                            />
                        </ContainerInput> 
                    </ContentForm>
                    {renderCreating ? (
                        <ContentLoading>
                        {finished ? (
                            <>
                                <p> Transferência realizada com sucesso!</p>
                                <i> <CheckCircle size={30} /> </i>
                            </>
                        ) : (
                            <>
                                <p> Fazendo Transferência... </p> 
                                <RotatingLines width="30" />
                            </>
                        )}
                        </ContentLoading>
                    ) 
                        : null
                    }             
                    <button type="submit" disabled={isSubmitting}>
                        Enviar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}