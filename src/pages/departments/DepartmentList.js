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

const DepartmentList = () => {
  const navigate = useNavigate();
  
  // Dados de exemplo
  const departments = [
    { id: 1, name: 'TI', manager: 'Carlos Santos', employeeCount: 15 },
    { id: 2, name: 'RH', manager: 'Ana Oliveira', employeeCount: 8 },
    { id: 3, name: 'Financeiro', manager: 'Roberto Silva', employeeCount: 12 },
    { id: 4, name: 'Marketing', manager: 'Juliana Costa', employeeCount: 10 },
  ];
  
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Departamentos
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/departments/new')}
        >
          Novo Departamento
        </Button>
      </Box>
      
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Gestor</TableCell>
                <TableCell>Funcionários</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.manager}</TableCell>
                  <TableCell>{department.employeeCount}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="secondary" 
                      onClick={() => navigate(`/departments/${department.id}/edit`)}
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

export default DepartmentList;
