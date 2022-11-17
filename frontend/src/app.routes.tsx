import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthenticateUser } from './pages/AuthenticateUser';
import { Home } from './pages/Home';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<AuthenticateUser />} path="/authentication" />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;