import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Paper, 
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    status: 'Ativo',
    hireDate: '',
    salary: '',
    workload: '',
    workSchedule: '',
    workMode: ''
  });
  
  useEffect(() => {
    if (isEditing) {
      // Simulando busca de dados do funcionário
      // Em um caso real, aqui seria feita uma chamada à API
      setFormData({
        name: 'João Silva',
        email: 'joao.silva@empresa.com',
        phone: '(11) 98765-4321',
        department: 'TI',
        position: 'Desenvolvedor',
        status: 'Ativo',
        hireDate: '2022-03-01',
        salary: '5000',
        workload: '40',
        workSchedule: '09:00 - 18:00',
        workMode: 'Híbrido'
      });
    }
  }, [isEditing, id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Dados do formulário:', formData);
      
      // Importar o serviço da API
      const { employeeService } = await import('../../services/api');
      
      if (isEditing) {
        // Atualizar funcionário existente
        await employeeService.updateEmployee(id, formData);
        console.log('Funcionário atualizado com sucesso');
      } else {
        // Criar novo funcionário
        await employeeService.createEmployee(formData);
        console.log('Funcionário criado com sucesso');
      }
      
      // Redirecionar após salvar
      navigate('/employees');
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
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
            {isEditing ? 'Editar Funcionário' : 'Novo Funcionário'}
          </Typography>
        </Box>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Departamento</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  label="Departamento"
                  required
                >
                  <MenuItem value="TI">TI</MenuItem>
                  <MenuItem value="RH">RH</MenuItem>
                  <MenuItem value="Financeiro">Financeiro</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Cargo</InputLabel>
                <Select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  label="Cargo"
                  required
                >
                  <MenuItem value="Desenvolvedor">Desenvolvedor</MenuItem>
                  <MenuItem value="Analista">Analista</MenuItem>
                  <MenuItem value="Gerente">Gerente</MenuItem>
                  <MenuItem value="Diretor">Diretor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="Ativo">Ativo</MenuItem>
                  <MenuItem value="Inativo">Inativo</MenuItem>
                  <MenuItem value="Afastado">Afastado</MenuItem>
                  <MenuItem value="Férias">Férias</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Data de Contratação"
                name="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Salário"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                InputProps={{ startAdornment: 'R$ ' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Carga Horária (horas semanais)"
                name="workload"
                type="number"
                value={formData.workload}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Horário de Trabalho"
                name="workSchedule"
                value={formData.workSchedule}
                onChange={handleChange}
                placeholder="Ex: 09:00 - 18:00"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Modalidade de Trabalho</InputLabel>
                <Select
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                  label="Modalidade de Trabalho"
                >
                  <MenuItem value="Presencial">Presencial</MenuItem>
                  <MenuItem value="Remoto">Remoto</MenuItem>
                  <MenuItem value="Híbrido">Híbrido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  startIcon={<SaveIcon />}
                >
                  Salvar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default EmployeeForm;
