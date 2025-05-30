import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contextos
import { AuthProvider } from './contexts/AuthContext';

// Componentes de layout
import MainLayout from './layouts/MainLayout';

// Páginas de autenticação
import Login from './pages/auth/Login';

// Páginas principais
import Dashboard from './pages/dashboard/Dashboard';
import NotFound from './pages/NotFound';

// Componente de rota privada
import PrivateRoute from './components/PrivateRoute';

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Componente de redirecionamento para o Dashboard
const IndexRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      Redirecionando...
    </div>
  );
};

function FinalApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            
            {/* Rotas privadas */}
            <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
              {/* Usando o componente de redirecionamento personalizado */}
              <Route index element={<IndexRedirect />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Adicione aqui as outras rotas conforme necessário */}
            </Route>
            
            {/* Rota para página não encontrada */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer position="top-right" autoClose={5000} />
    </ThemeProvider>
  );
}

export default FinalApp;
