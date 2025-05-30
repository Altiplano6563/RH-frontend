import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom color="error">
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Página Não Encontrada
        </Typography>
        <Typography variant="body1" paragraph>
          A página que você está procurando não existe ou foi movida.
        </Typography>
        <Box mt={4}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/dashboard')}
          >
            Voltar para o Dashboard
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound;
