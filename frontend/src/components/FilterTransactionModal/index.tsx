import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Dialog from '@radix-ui/react-dialog'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod';
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod';
import { X, CheckCircle, ArrowCircleUp, ArrowCircleDown,} from 'phosphor-react';
import { RotatingLines } from 'react-loader-spinner';
import Alert from '../Alert';
import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton, ContentForm, 
    ContentLoading, DialogTitle, DialogDescription, Input} from './styles';
import useTransaction from '../../hooks/useTransaction';
import ptBR from 'date-fns/locale/pt-BR';


const filterTransactionSchema = z.object({
    filter: z.string().optional(),
  })
  
type FilterTransactionFormInputs = z.infer<typeof filterTransactionSchema>

export function FilterTransactionModal() {
    const [startDate, setStartDate] = useState(new Date());
    const [renderCreating, setRenderCreating] = useState<boolean>(false)
    const [finished, setFinished] = useState<boolean>(false)
    const { error, filterTransactions} = useTransaction();

    useEffect(() =>{
        setFinished(false);
        setRenderCreating(false);
    },[])

    const {
        control,
        handleSubmit,
        formState: { isSubmitting }, // informa estado do form, podendo ser usado pra desabilitar o botao
        reset,
    } = useForm<FilterTransactionFormInputs>({
        resolver: zodResolver(filterTransactionSchema),
    })

    async function handleSearchByFilter(data: FilterTransactionFormInputs) {
        setFinished(false);
        setRenderCreating(true);
        var filter: string | Date = startDate;     
        if(data.filter === 'cashIn' || data.filter === 'cashOut') filter = data.filter;   
        const filteredTransactions = await filterTransactions(filter)
        if (filteredTransactions) setFinished(true);
        else{
            toast.error(error.msg)
            setFinished(false);
            setRenderCreating(false);
        }
        reset();
    }

    return(
        <Dialog.Portal>
            <Alert theme="colored" />
            <Overlay />
            <Content>
                <CloseButton>
                    <X size={24} />
                </CloseButton>             
                <form onSubmit={handleSubmit(handleSearchByFilter)}>
                    <DialogTitle>Selecione um dos campos abaixo para pesquisa:</DialogTitle>
                    <ContentForm>
                    <Controller
                        control={control}
                        name="filter"
                        render={({ field }) => {
                            return (
                            <>
                                <DialogDescription> Tipo da Transferência </DialogDescription>
                                <TransactionType
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <TransactionTypeButton value="cashIn">
                                        <ArrowCircleUp size={22} /> Entradas
                                    </TransactionTypeButton>
                                    <TransactionTypeButton value="cashOut">
                                        <ArrowCircleDown size={22} /> Saídas
                                    </TransactionTypeButton>
                                </TransactionType>
                                <DialogDescription>Calendário</DialogDescription>                                  
                                <TransactionType
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    >        
                                    <DatePicker 
                                        selected={startDate} 
                                        onChange={(date:Date) => setStartDate(date)}
                                        locale={ptBR}
                                        dateFormat="dd/MM/yyyy"
                                        customInput={<Input/>}
                                    />
                                </TransactionType>
                            </>
                        )}}
                    />
                    </ContentForm>
                    {renderCreating ? (
                        <ContentLoading>
                        {finished ? (
                            <>
                                <p> Transferências encontradas com sucesso!</p>
                                <i> <CheckCircle size={30} /> </i>
                            </>
                        ) : (
                            <>
                                <p> Pesquisando Transferências... </p> 
                                <RotatingLines width="30" />
                            </>
                        )}
                        </ContentLoading>
                    ) 
                        : null
                    }             
                    <button type="submit" disabled={isSubmitting}>
                        Buscar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}