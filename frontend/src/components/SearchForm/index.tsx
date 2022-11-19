import { FadersHorizontal, TelegramLogo} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';
import { SearchFormContainer, SearchFormButtons } from './styles';
import { FilterTransactionModal } from '../FilterTransactionModal';
import { NewTransactionModal } from '../NewTransactionModal';


export function SearchForm() { 
  return (
    <SearchFormContainer>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <SearchFormButtons>
            <TelegramLogo size={20} />
            Fazer Transferência
          </SearchFormButtons>
        </Dialog.Trigger>
        <NewTransactionModal />
      </Dialog.Root>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <SearchFormButtons>
            <FadersHorizontal size={20} />
            Filtrar
          </SearchFormButtons>
        </Dialog.Trigger>
        <FilterTransactionModal />
      </Dialog.Root>   
    </SearchFormContainer>
  )
}
