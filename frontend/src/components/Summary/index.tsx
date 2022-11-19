import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar, TrendUp, TrendDown } from 'phosphor-react'
import { CardContentSummary } from './CardContent.tsx';
import { SummaryCard, SummaryContainer } from './styles'
import { priceFormatter } from '../../services/utils/formatter';

import { useSummary } from '../../hooks/useSummary'
import useTransaction from '../../hooks/useTransaction';

export function Summary() {
  const summary = useSummary();
  const { balance} = useTransaction();

  return (
    <SummaryContainer>
      <SummaryCard>
        <CardContentSummary
          status='Entradas'
          icon={<ArrowCircleUp size={32} color="#00b37e" />}
          summaryInfo={summary.inputs}
        />
      </SummaryCard>
      <SummaryCard>
        <CardContentSummary
          status='Saídas'
          icon={<ArrowCircleDown size={32} color="#f75a68" />}
          summaryInfo={summary.outputs}
        />
      </SummaryCard>
      {summary.balance >= 0 ? 
          <SummaryCard variant="green">
            <CardContentSummary
              status='Balanço'
              icon={<TrendUp size={32} color="#fff" />}
              summaryInfo={priceFormatter.format(summary.balance)}
            />
          </SummaryCard>
        :
          <SummaryCard variant="red">
            <CardContentSummary
                status='Balanço'
                icon={<TrendDown size={32} color="#fff" />}
                summaryInfo={priceFormatter.format(summary.balance)}
              />
          </SummaryCard>     
      }
      <SummaryCard variant='blue'>
        <CardContentSummary
            status='Saldo atual'
            icon={<CurrencyDollar size={32} color="#fff" />}
            summaryInfo={priceFormatter.format(balance)}
          />
      </SummaryCard>
    </SummaryContainer>
  )
}
