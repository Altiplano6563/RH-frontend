import React from 'react';
import { Typography, Paper, Grid, Box } from '@mui/material';

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Funcionários
            </Typography>
            <Typography variant="h3" color="primary">
              42
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Departamentos
            </Typography>
            <Typography variant="h3" color="primary">
              8
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Movimentações
            </Typography>
            <Typography variant="h3" color="primary">
              156
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Box mt={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Atividade Recente
          </Typography>
          <Typography variant="body1">
            Não há atividades recentes para exibir.
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default Dashboard;
