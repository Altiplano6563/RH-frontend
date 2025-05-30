import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

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

// Página inicial com Material UI
const HomePage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Sistema de Gestão
        </Typography>
        <Typography variant="body1" paragraph>
          Bem-vindo à página inicial do sistema.
        </Typography>
        <Box sx={{ bgcolor: '#f0f0f0', p: 3, borderRadius: 2, mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body2">
            Esta é a página principal do sistema.
          </Typography>
        </Box>
        <Button variant="contained" color="primary">
          Botão de Teste
        </Button>
      </Paper>
    </Container>
  );
};

// Página de login com Material UI
const LoginPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Login
        </Typography>
        <Box sx={{ bgcolor: '#f0f0f0', p: 3, borderRadius: 2, mb: 3 }}>
          <Typography variant="body1">
            Página de login simplificada.
          </Typography>
        </Box>
        <Button variant="contained" color="primary">
          Entrar
        </Button>
      </Paper>
    </Container>
  );
};

// Aplicativo com Material UI
const MaterialApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default MaterialApp;
