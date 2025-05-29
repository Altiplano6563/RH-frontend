import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateForm = () => {
    if (!email) {
      setError('Email é obrigatório');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
      setSuccess(true);
      toast.success('Instruções de recuperação enviadas para seu email!');
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      setError(error.response?.data?.message || 'Falha ao processar solicitação. Tente novamente.');
      toast.error('Erro ao processar solicitação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Sistema RH Online
          </Typography>
          
          <Typography component="h2" variant="h6" sx={{ mb: 3 }}>
            Recuperar Senha
          </Typography>
          
          {success ? (
            <Box sx={{ width: '100%', mt: 2 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Enviamos instruções para recuperar sua senha no email informado. Por favor, verifique sua caixa de entrada.
              </Alert>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                sx={{ mt: 2 }}
              >
                Voltar para Login
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Informe seu email de cadastro para receber instruções de recuperação de senha.
              </Typography>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleChange}
                error={!!error}
                helperText={error}
                sx={{ mb: 3 }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ 
                  mt: 2, 
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem'
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Enviar Instruções'}
              </Button>
              
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" color="primary">
                      Voltar para Login
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
