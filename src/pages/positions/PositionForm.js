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
  MenuItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

const PositionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    minSalary: '',
    maxSalary: '',
    requirements: '',
    responsibilities: ''
  });
  
  useEffect(() => {
    if (isEditing) {
      // Simulando busca de dados do cargo
      // Em um caso real, aqui seria feita uma chamada à API
      setFormData({
        title: 'Desenvolvedor',
        department: 'TI',
        description: 'Responsável pelo desenvolvimento de sistemas e aplicações',
        minSalary: '4000',
        maxSalary: '8000',
        requirements: 'Conhecimento em React, Node.js e bancos de dados',
        responsibilities: 'Desenvolver e manter aplicações web e mobile'
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
      const { positionService } = await import('../../services/api');
      
      if (isEditing) {
        // Atualizar cargo existente
        await positionService.updatePosition(id, formData);
        console.log('Cargo atualizado com sucesso');
      } else {
        // Criar novo cargo
        await positionService.createPosition(formData);
        console.log('Cargo criado com sucesso');
      }
      
      // Redirecionar após salvar
      navigate('/positions');
    } catch (error) {
      console.error('Erro ao salvar cargo:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };
  
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/positions')}
            sx={{ mr: 2 }}
          >
            Voltar
          </Button>
          <Typography variant="h4" component="h1">
            {isEditing ? 'Editar Cargo' : 'Novo Cargo'}
          </Typography>
        </Box>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Título do Cargo"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Departamento</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  label="Departamento"
                >
                  <MenuItem value="TI">TI</MenuItem>
                  <MenuItem value="RH">RH</MenuItem>
                  <MenuItem value="Financeiro">Financeiro</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Salário Mínimo"
                name="minSalary"
                type="number"
                value={formData.minSalary}
                onChange={handleChange}
                InputProps={{ startAdornment: 'R$ ' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Salário Máximo"
                name="maxSalary"
                type="number"
                value={formData.maxSalary}
                onChange={handleChange}
                InputProps={{ startAdornment: 'R$ ' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Requisitos"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Responsabilidades"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                multiline
                rows={3}
              />
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

export default PositionForm;
