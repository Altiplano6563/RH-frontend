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
  ListItemText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

const EmployeeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Dados de exemplo
  const employee = {
    id: id,
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    phone: '(11) 98765-4321',
    department: 'TI',
    position: 'Desenvolvedor',
    status: 'Ativo',
    hireDate: '01/03/2022',
    salary: 'R$ 5.000,00',
    workload: '40h semanais',
    workSchedule: '09:00 - 18:00',
    workMode: 'Híbrido'
  };
  
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/employees')}
            sx={{ mr: 2 }}
          >
            Voltar
          </Button>
          <Typography variant="h4" component="h1">
            Detalhes do Funcionário
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<EditIcon />}
          onClick={() => navigate(`/employees/${id}/edit`)}
        >
          Editar
        </Button>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {employee.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {employee.position} - {employee.department}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText primary="Email" secondary={employee.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Telefone" secondary={employee.phone} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Data de Contratação" secondary={employee.hireDate} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Status" secondary={employee.status} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText primary="Salário" secondary={employee.salary} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Carga Horária" secondary={employee.workload} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Horário de Trabalho" secondary={employee.workSchedule} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Modalidade de Trabalho" secondary={employee.workMode} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default EmployeeDetail;
