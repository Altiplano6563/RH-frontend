import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Box,
  IconButton,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const MovementList = () => {
  const navigate = useNavigate();
  
  // Dados de exemplo
  const movements = [
    { 
      id: 1, 
      employee: 'João Silva', 
      type: 'Promoção', 
      fromPosition: 'Desenvolvedor Jr', 
      toPosition: 'Desenvolvedor Pleno', 
      date: '15/03/2023',
      status: 'Aprovado'
    },
    { 
      id: 2, 
      employee: 'Maria Oliveira', 
      type: 'Transferência', 
      fromPosition: 'Analista de RH', 
      toPosition: 'Analista de RH', 
      date: '05/04/2023',
      status: 'Aprovado'
    },
    { 
      id: 3, 
      employee: 'Carlos Santos', 
      type: 'Ajuste Salarial', 
      fromPosition: 'Gerente Financeiro', 
      toPosition: 'Gerente Financeiro', 
      date: '20/05/2023',
      status: 'Aprovado'
    },
  ];
  
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
        <Typography variant="h4" component="h1">
          Movimentações
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/movements/new')}
        >
          Nova Movimentação
        </Button>
      </Box>
      
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Funcionário</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>De</TableCell>
                <TableCell>Para</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{movement.employee}</TableCell>
                  <TableCell>{movement.type}</TableCell>
                  <TableCell>{movement.fromPosition}</TableCell>
                  <TableCell>{movement.toPosition}</TableCell>
                  <TableCell>{movement.date}</TableCell>
                  <TableCell>
                    <Chip 
                      label={movement.status} 
                      color={getStatusColor(movement.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      onClick={() => navigate(`/movements/${movement.id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default MovementList;
