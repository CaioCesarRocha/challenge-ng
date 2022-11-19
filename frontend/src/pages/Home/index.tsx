import { CardContent } from "./styles"
import { ForceAuthentication } from "../../components/ForceAuthentcation";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "../../components/SearchForm";
import { CardTransaction } from "../../components/CardTransaction";
import useTransaction from "../../hooks/useTransaction";

export function Home() {
    const {transactions} = useTransaction();

    return (
        <ForceAuthentication>
            <Header/>
            <Summary/>
            <SearchForm/>
            { transactions.map((transaction, index)=>(
                <CardTransaction
                    key={index}
                    debitedAccountId={transaction.debitedAccountId}
                    userTransfer={transaction.userTransfer || ''}
                    value={transaction.value}
                    dateTransfer={transaction?.createdAt}
                />
            ))}

            { transactions.length === 0 ?
                <CardContent>Nenhuma transferência encontrada.</CardContent>
            :
                null
            }
        </ForceAuthentication>
    )
}