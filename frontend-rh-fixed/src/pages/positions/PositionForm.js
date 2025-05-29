import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Slider,
  InputAdornment
} from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

const PositionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    departmentId: '',
    level: 1,
    minSalary: 0,
    maxSalary: 0,
    status: 'active'
  });
  
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/departments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setDepartments(response.data);
      } catch (error) {
        console.error('Erro ao buscar departamentos:', error);
        toast.error('Erro ao carregar lista de departamentos');
      }
    };

    fetchDepartments();

    if (isEditing) {
      const fetchPosition = async () => {
        try {
          setInitialLoading(true);
          const response = await axios.get(`${API_BASE_URL}/positions/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setFormData(response.data);
        } catch (error) {
          console.error('Erro ao buscar cargo:', error);
          toast.error('Erro ao carregar dados do cargo');
          navigate('/positions');
        } finally {
          setInitialLoading(false);
        }
      };

      fetchPosition();
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Nome do cargo é obrigatório';
    }
    
    if (!formData.departmentId) {
      newErrors.departmentId = 'Departamento é obrigatório';
    }
    
    if (formData.minSalary < 0) {
      newErrors.minSalary = 'Salário mínimo não pode ser negativo';
    }
    
    if (formData.maxSalary < formData.minSalary) {
      newErrors.maxSalary = 'Salário máximo deve ser maior que o salário mínimo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/positions/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Cargo atualizado com sucesso!');
      } else {
        await axios.post(`${API_BASE_URL}/positions`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Cargo criado com sucesso!');
      }
      
      navigate('/positions');
    } catch (error) {
      console.error('Erro ao salvar cargo:', error);
      toast.error(error.response?.data?.message || 'Erro ao salvar cargo');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (initialLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Carregando dados do cargo...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Button 
          component={Link} 
          to="/positions" 
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Voltar
        </Button>
        <Typography variant="h4" component="h1">
          {isEditing ? 'Editar Cargo' : 'Novo Cargo'}
        </Typography>
      </Box>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Cargo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.departmentId}>
                <InputLabel id="department-label">Departamento</InputLabel>
                <Select
                  labelId="department-label"
                  id="departmentId"
                  name="departmentId"
                  value={formData.departmentId || ''}
                  onChange={handleChange}
                  label="Departamento"
                  required
                >
                  <MenuItem value="">
                    <em>Selecione um departamento</em>
                  </MenuItem>
                  {departments.map(department => (
                    <MenuItem key={department.id} value={department.id}>
                      {department.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.departmentId && (
                  <Typography variant="caption" color="error">
                    {errors.departmentId}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="level-label">Nível</InputLabel>
                <Select
                  labelId="level-label"
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  label="Nível"
                >
                  <MenuItem value={1}>Júnior</MenuItem>
                  <MenuItem value={2}>Pleno</MenuItem>
                  <MenuItem value={3}>Sênior</MenuItem>
                  <MenuItem value={4}>Especialista</MenuItem>
                  <MenuItem value={5}>Coordenador</MenuItem>
                  <MenuItem value={6}>Gerente</MenuItem>
                  <MenuItem value={7}>Diretor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography id="min-salary-slider" gutterBottom>
                Salário Mínimo: {formatCurrency(formData.minSalary)}
              </Typography>
              <TextField
                fullWidth
                label="Salário Mínimo"
                name="minSalary"
                type="number"
                value={formData.minSalary}
                onChange={handleChange}
                error={!!errors.minSalary}
                helperText={errors.minSalary}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography id="max-salary-slider" gutterBottom>
                Salário Máximo: {formatCurrency(formData.maxSalary)}
              </Typography>
              <TextField
                fullWidth
                label="Salário Máximo"
                name="maxSalary"
                type="number"
                value={formData.maxSalary}
                onChange={handleChange}
                error={!!errors.maxSalary}
                helperText={errors.maxSalary}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="active">Ativo</MenuItem>
                  <MenuItem value="inactive">Inativo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Save />}
              sx={{ py: 1.5, px: 3 }}
            >
              {isEditing ? 'Atualizar' : 'Salvar'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PositionForm;
