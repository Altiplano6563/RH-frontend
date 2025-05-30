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
import Login from './pages/auth/Login'; // Você precisará criar este componente
import Register from './pages/auth/Register'; // Você precisará criar este componente
import ForgotPassword from './pages/auth/ForgotPassword'; // Você precisará criar este componente

// Páginas principais
import Dashboard from './pages/dashboard/Dashboard'; // Você precisará criar este componente
import EmployeeList from './pages/employees/EmployeeList'; // Você precisará criar este componente
import EmployeeDetail from './pages/employees/EmployeeDetail'; // Você precisará criar este componente
import EmployeeForm from './pages/employees/EmployeeForm'; // Você precisará criar este componente
import DepartmentList from './pages/departments/DepartmentList'; // Você precisará criar este componente
import DepartmentForm from './pages/departments/DepartmentForm'; // Você precisará criar este componente
import PositionList from './pages/positions/PositionList'; // Você precisará criar este componente
import PositionForm from './pages/positions/PositionForm'; // Você precisará criar este componente
import MovementList from './pages/movements/MovementList'; // Você precisará criar este componente
import MovementDetail from './pages/movements/MovementDetail'; // Você precisará criar este componente
import MovementForm from './pages/movements/MovementForm'; // Você precisará criar este componente
import Profile from './pages/profile/Profile'; // Você precisará criar este componente
import NotFound from './pages/NotFound'; // Você precisará criar este componente

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
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
        },
      },
    },
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
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Rotas privadas */}
            <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
              {/* Usando o componente de redirecionamento personalizado */}
              <Route index element={<IndexRedirect />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              <Route path="employees">
                <Route index element={<EmployeeList />} />
                <Route path="new" element={<EmployeeForm />} />
                <Route path=":id" element={<EmployeeDetail />} />
                <Route path=":id/edit" element={<EmployeeForm />} />
              </Route>
              
              <Route path="departments">
                <Route index element={<DepartmentList />} />
                <Route path="new" element={<DepartmentForm />} />
                <Route path=":id/edit" element={<DepartmentForm />} />
              </Route>
              
              <Route path="positions">
                <Route index element={<PositionList />} />
                <Route path="new" element={<PositionForm />} />
                <Route path=":id/edit" element={<PositionForm />} />
              </Route>
              
              <Route path="movements">
                <Route index element={<MovementList />} />
                <Route path="new" element={<MovementForm />} />
                <Route path=":id" element={<MovementDetail />} />
              </Route>
              
              <Route path="profile" element={<Profile />} />
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
