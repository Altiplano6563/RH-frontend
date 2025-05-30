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
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const PositionList = () => {
  const navigate = useNavigate();
  
  // Dados de exemplo
  const positions = [
    { id: 1, title: 'Desenvolvedor', department: 'TI', salaryRange: 'R$ 4.000 - R$ 8.000', employeeCount: 8 },
    { id: 2, title: 'Analista de RH', department: 'RH', salaryRange: 'R$ 3.500 - R$ 6.000', employeeCount: 4 },
    { id: 3, title: 'Gerente Financeiro', department: 'Financeiro', salaryRange: 'R$ 8.000 - R$ 12.000', employeeCount: 2 },
    { id: 4, title: 'Designer', department: 'Marketing', salaryRange: 'R$ 3.800 - R$ 7.000', employeeCount: 5 },
  ];
  
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Cargos
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/positions/new')}
        >
          Novo Cargo
        </Button>
      </Box>
      
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Faixa Salarial</TableCell>
                <TableCell>Funcionários</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positions.map((position) => (
                <TableRow key={position.id}>
                  <TableCell>{position.title}</TableCell>
                  <TableCell>{position.department}</TableCell>
                  <TableCell>{position.salaryRange}</TableCell>
                  <TableCell>{position.employeeCount}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="secondary" 
                      onClick={() => navigate(`/positions/${position.id}/edit`)}
                    >
                      <EditIcon />
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

export default PositionList;
