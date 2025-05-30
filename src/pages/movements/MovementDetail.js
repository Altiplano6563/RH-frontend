import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Paper, 
  Grid,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MovementDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Dados de exemplo
  const movement = {
    id: id,
    employee: 'João Silva',
    employeeId: '1',
    type: 'Promoção',
    fromPosition: 'Desenvolvedor Jr',
    toPosition: 'Desenvolvedor Pleno',
    fromDepartment: 'TI',
    toDepartment: 'TI',
    fromSalary: 'R$ 4.500,00',
    toSalary: 'R$ 6.000,00',
    reason: 'Excelente desempenho e aquisição de novas habilidades técnicas',
    approvedBy: 'Carlos Santos',
    date: '15/03/2023',
    effectiveDate: '01/04/2023',
    status: 'Aprovado',
    comments: 'Promoção aprovada pelo comitê de avaliação de desempenho'
  };
  
  // Função para determinar a cor do chip de status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Aprovado':
        return 'success';
      case 'Pendente':
        return 'warning';
      case 'Rejeitado':
        return 'error';
      default:
        return 'default';
    }
  };
  
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/movements')}
            sx={{ mr: 2 }}
          >
            Voltar
          </Button>
          <Typography variant="h4" component="h1">
            Detalhes da Movimentação
          </Typography>
        </Box>
        <Chip 
          label={movement.status} 
          color={getStatusColor(movement.status)} 
        />
      </Box>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {movement.type} - {movement.employee}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Data: {movement.date} | Efetivação: {movement.effectiveDate}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Informações Anteriores
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Cargo" secondary={movement.fromPosition} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Departamento" secondary={movement.fromDepartment} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Salário" secondary={movement.fromSalary} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Novas Informações
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Cargo" secondary={movement.toPosition} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Departamento" secondary={movement.toDepartment} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Salário" secondary={movement.toSalary} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Justificativa
        </Typography>
        <Typography paragraph>
          {movement.reason}
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Comentários Adicionais
        </Typography>
        <Typography paragraph>
          {movement.comments}
        </Typography>
        
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Aprovado por: {movement.approvedBy}
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default MovementDetail;
