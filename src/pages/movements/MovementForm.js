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

const MovementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    employee: '',
    type: '',
    fromPosition: '',
    toPosition: '',
    fromDepartment: '',
    toDepartment: '',
    fromSalary: '',
    toSalary: '',
    reason: '',
    effectiveDate: '',
    status: 'Pendente'
  });
  
  useEffect(() => {
    if (isEditing) {
      // Simulando busca de dados da movimentação
      // Em um caso real, aqui seria feita uma chamada à API
      setFormData({
        employee: '1', // ID do funcionário
        type: 'Promoção',
        fromPosition: 'Desenvolvedor Jr',
        toPosition: 'Desenvolvedor Pleno',
        fromDepartment: 'TI',
        toDepartment: 'TI',
        fromSalary: '4500',
        toSalary: '6000',
        reason: 'Excelente desempenho e aquisição de novas habilidades técnicas',
        effectiveDate: '2023-04-01',
        status: 'Aprovado'
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui seria feita a chamada à API para salvar os dados
    console.log('Dados do formulário:', formData);
    
    // Redirecionar após salvar
    navigate('/movements');
  };
  
  // Dados de exemplo para os selects
  const employees = [
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Maria Oliveira' },
    { id: '3', name: 'Carlos Santos' }
  ];
  
  const positions = [
    { id: '1', title: 'Desenvolvedor Jr' },
    { id: '2', title: 'Desenvolvedor Pleno' },
    { id: '3', title: 'Desenvolvedor Sênior' },
    { id: '4', title: 'Analista de RH' },
    { id: '5', title: 'Gerente Financeiro' }
  ];
  
  const departments = [
    { id: '1', name: 'TI' },
    { id: '2', name: 'RH' },
    { id: '3', name: 'Financeiro' },
    { id: '4', name: 'Marketing' }
  ];
  
  const movementTypes = [
    'Promoção',
    'Transferência',
    'Ajuste Salarial',
    'Mudança de Horário',
    'Mudança de Modalidade'
  ];
  
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
            {isEditing ? 'Editar Movimentação' : 'Nova Movimentação'}
          </Typography>
        </Box>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Funcionário</InputLabel>
                <Select
                  name="employee"
                  value={formData.employee}
                  onChange={handleChange}
                  label="Funcionário"
                >
                  {employees.map(emp => (
                    <MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Tipo de Movimentação</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Tipo de Movimentação"
                >
                  {movementTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Informações Atuais
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Cargo Atual</InputLabel>
                <Select
                  name="fromPosition"
                  value={formData.fromPosition}
                  onChange={handleChange}
                  label="Cargo Atual"
                >
                  {positions.map(pos => (
                    <MenuItem key={pos.id} value={pos.title}>{pos.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Departamento Atual</InputLabel>
                <Select
                  name="fromDepartment"
                  value={formData.fromDepartment}
                  onChange={handleChange}
                  label="Departamento Atual"
                >
                  {departments.map(dep => (
                    <MenuItem key={dep.id} value={dep.name}>{dep.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Salário Atual"
                name="fromSalary"
                type="number"
                value={formData.fromSalary}
                onChange={handleChange}
                InputProps={{ startAdornment: 'R$ ' }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Novas Informações
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Novo Cargo</InputLabel>
                <Select
                  name="toPosition"
                  value={formData.toPosition}
                  onChange={handleChange}
                  label="Novo Cargo"
                >
                  {positions.map(pos => (
                    <MenuItem key={pos.id} value={pos.title}>{pos.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Novo Departamento</InputLabel>
                <Select
                  name="toDepartment"
                  value={formData.toDepartment}
                  onChange={handleChange}
                  label="Novo Departamento"
                >
                  {departments.map(dep => (
                    <MenuItem key={dep.id} value={dep.name}>{dep.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Novo Salário"
                name="toSalary"
                type="number"
                value={formData.toSalary}
                onChange={handleChange}
                InputProps={{ startAdornment: 'R$ ' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Data de Efetivação"
                name="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Justificativa"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
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
                  <MenuItem value="Pendente">Pendente</MenuItem>
                  <MenuItem value="Aprovado">Aprovado</MenuItem>
                  <MenuItem value="Rejeitado">Rejeitado</MenuItem>
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

export default MovementForm;
