import useAuth from "../../hooks/useAuth";
import { priceFormatter, dateFormatter } from "../../services/utils/formatter";
import { CardContent, CardTransactionContainer, ColoredContent } from "./styles";

interface propsCardTransaction{
    debitedAccountId: string;
    userTransfer: string;
    value: number;
    dateTransfer?: Date;
}

export function CardTransaction(props: propsCardTransaction){
    const {user} = useAuth();

    return(
        <CardTransactionContainer>
            <CardContent>
                <p>{props.userTransfer}</p>                
                {user.accountId === props.debitedAccountId ? 
                    <ColoredContent variant="red"> Saída</ColoredContent> 
                : 
                    <ColoredContent variant="green"> Entrada</ColoredContent>
                }                      
                <p>{priceFormatter.format(props.value)}</p>
                <p>{ props.dateTransfer ? 
                        dateFormatter.format(new Date(props.dateTransfer))
                    : 
                        null
                    }
                </p>
            </CardContent>
        </CardTransactionContainer>
    )
}