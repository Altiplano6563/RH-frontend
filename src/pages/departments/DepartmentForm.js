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
  CircularProgress
} from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

const DepartmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentDepartmentId: '',
    managerId: '',
    status: 'active'
  });
  
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
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

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/employees`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Erro ao buscar colaboradores:', error);
        toast.error('Erro ao carregar lista de colaboradores');
      }
    };

    fetchDepartments();
    fetchEmployees();

    if (isEditing) {
      const fetchDepartment = async () => {
        try {
          setInitialLoading(true);
          const response = await axios.get(`${API_BASE_URL}/departments/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setFormData(response.data);
        } catch (error) {
          console.error('Erro ao buscar departamento:', error);
          toast.error('Erro ao carregar dados do departamento');
          navigate('/departments');
        } finally {
          setInitialLoading(false);
        }
      };

      fetchDepartment();
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Nome do departamento é obrigatório';
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
        await axios.put(`${API_BASE_URL}/departments/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Departamento atualizado com sucesso!');
      } else {
        await axios.post(`${API_BASE_URL}/departments`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Departamento criado com sucesso!');
      }
      
      navigate('/departments');
    } catch (error) {
      console.error('Erro ao salvar departamento:', error);
      toast.error(error.response?.data?.message || 'Erro ao salvar departamento');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Carregando dados do departamento...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Button 
          component={Link} 
          to="/departments" 
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Voltar
        </Button>
        <Typography variant="h4" component="h1">
          {isEditing ? 'Editar Departamento' : 'Novo Departamento'}
        </Typography>
      </Box>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Departamento"
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
              <FormControl fullWidth>
                <InputLabel id="parent-department-label">Departamento Superior</InputLabel>
                <Select
                  labelId="parent-department-label"
                  id="parentDepartmentId"
                  name="parentDepartmentId"
                  value={formData.parentDepartmentId || ''}
                  onChange={handleChange}
                  label="Departamento Superior"
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  {departments
                    .filter(dept => dept.id !== id) // Evita selecionar o próprio departamento como pai
                    .map(department => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="manager-label">Gestor Responsável</InputLabel>
                <Select
                  labelId="manager-label"
                  id="managerId"
                  name="managerId"
                  value={formData.managerId || ''}
                  onChange={handleChange}
                  label="Gestor Responsável"
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  {employees.map(employee => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default DepartmentForm;
