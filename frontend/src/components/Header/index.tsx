import {
  HeaderContainer,
  HeaderContent,
  LogoutButton,
  SecundaryHeaderContent,
} from './styles';
import logongcash from '../../assets/logongcash.svg';
import {ArrowSquareRight} from 'phosphor-react';
import useAuth from '../../hooks/useAuth';
import useTransaction from '../../hooks/useTransaction';

export function Header() {
  const { user, logout } = useAuth();
  const { clearTransactions } = useTransaction()

  async function handleLogout() {
    await logout();
    await clearTransactions();
  }

  return (
    <HeaderContainer> 
      <HeaderContent>
        <img src={logongcash} alt="Logo Empresa" />        
        <SecundaryHeaderContent>
          <p>{user.username}</p>
          <LogoutButton onClick={() => handleLogout()}>
            <ArrowSquareRight size={28}/>
            Sair
          </LogoutButton>
        </SecundaryHeaderContent>
      </HeaderContent>       
    </HeaderContainer>
  )
}
