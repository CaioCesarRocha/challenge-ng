import { ThemeProvider } from 'styled-components';
import AppRoutes from './app.routes';
import { GlobalStyle } from './styles/global';
import { UserProvider } from './contexts/UserContext';
import {TransactionProvider} from './contexts/TransactionContext';
import { DefaultTheme } from './styles/themes/default';
import { ResetCSS } from './styles/resetCSS';

export function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <GlobalStyle />
        <UserProvider>
          <TransactionProvider>
            <ResetCSS/>
            <AppRoutes />
          </TransactionProvider>
        </UserProvider>
    </ThemeProvider>
  )
}
