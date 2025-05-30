import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

// Importando o contexto de autenticação simplificado
import { AuthProvider, useAuth } from './contexts/SimpleAuthContext';

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
});

// Página inicial com botão de logout
const HomePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Sistema de Gestão
        </Typography>
        <Typography variant="body1" paragraph>
          Bem-vindo à página inicial do sistema.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mr: 2 }}
        >
          Botão de Teste
        </Button>
        <Button 
          variant="contained" 
          color="secondary"
          onClick={handleLogout}
        >
          Sair
        </Button>
      </Paper>
    </Container>
  );
};

// Página de login com botão de login
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    login();
    navigate('/');
  };
  
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Login
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </Paper>
    </Container>
  );
};

// Aplicativo com contexto de autenticação simplificado
const SimpleAuthApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default SimpleAuthApp;
