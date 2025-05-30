import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Box } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 500 }}>
        <Typography variant="h1" color="error" sx={{ fontSize: '5rem', fontWeight: 'bold' }}>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Página Não Encontrada
        </Typography>
        <Typography variant="body1" paragraph>
          A página que você está procurando não existe ou foi movida.
        </Typography>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Voltar para Dashboard
        </button>
      </Paper>
    </Box>
  );
};

export default NotFound;
