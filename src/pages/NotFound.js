import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper,
  Grid
} from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 6, 
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography variant="h1" component="h1" sx={{ fontSize: '8rem', fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          404
        </Typography>
        
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          Página não encontrada
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px' }}>
          A página que você está procurando não existe ou foi movida.
          Verifique se o endereço está correto ou utilize os botões abaixo para navegar.
        </Typography>
        
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/"
              startIcon={<Home />}
              sx={{ py: 1.5, px: 3 }}
            >
              Página Inicial
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.history.back()}
              startIcon={<ArrowBack />}
              sx={{ py: 1.5, px: 3 }}
            >
              Voltar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default NotFound;
