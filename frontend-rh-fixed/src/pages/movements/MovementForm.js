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
  InputAdornment,
  FormHelperText
} from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

const MovementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    employeeId: '',
    type: '',
    previousPositionId: '',
    newPositionId: '',
    previousDepartmentId: '',
    newDepartmentId: '',
    previousSalary: 0,
    newSalary: 0,
    effectiveDate: format(new Date(), 'yyyy-MM-dd'),
    justification: ''
  });
  
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [errors, setErrors] = useState({});

  useEffect(() => {
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

    const fetchPositions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/positions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPositions(response.data);
      } catch (error) {
        console.error('Erro ao buscar cargos:', error);
        toast.error('Erro ao carregar lista de cargos');
      }
    };

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

    fetchEmployees();
    fetchPositions();
    fetchDepartments();

    if (isEditing) {
      const fetchMovement = async () => {
        try {
          setInitialLoading(true);
          const response = await axios.get(`${API_BASE_URL}/movements/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          const movement = response.data;
          
          // Format date to YYYY-MM-DD for input field
          const formattedDate = movement.effectiveDate 
            ? format(new Date(movement.effectiveDate), 'yyyy-MM-dd')
            : format(new Date(), 'yyyy-MM-dd');
          
          setFormData({
            ...movement,
            effectiveDate: formattedDate
          });
          
          // Set selected employee
          if (movement.employeeId) {
            const employeeResponse = await axios.get(`${API_BASE_URL}/employees/${movement.employeeId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            setSelectedEmployee(employeeResponse.data);
          }
        } catch (error) {
          console.error('Erro ao buscar movimentação:', error);
          toast.error('Erro ao carregar dados da movimentação');
          navigate('/movements');
        } finally {
          setInitialLoading(false);
        }
      };

      fetchMovement();
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
    
    // If employee is changed, fetch their current data
    if (name === 'employeeId' && value) {
      fetchEmployeeData(value);
    }
  };

  const fetchEmployeeData = async (employeeId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const employee = response.data;
      setSelectedEmployee(employee);
      
      setFormData(prev => ({
        ...prev,
        previousPositionId: employee.positionId || '',
        previousDepartmentId: employee.departmentId || '',
        previousSalary: employee.salary || 0
      }));
    } catch (error) {
      console.error('Erro ao buscar dados do colaborador:', error);
      toast.error('Erro ao carregar dados do colaborador');
    }
  };

  const calculatePercentageChange = () => {
    const prevSalary = parseFloat(formData.previousSalary) || 0;
    const newSalary = parseFloat(formData.newSalary) || 0;
    
    if (prevSalary === 0) return 0;
    
    return ((newSalary - prevSalary) / prevSalary) * 100;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeeId) {
      newErrors.employeeId = 'Colaborador é obrigatório';
    }
    
    if (!formData.type) {
      newErrors.type = 'Tipo de movimentação é obrigatório';
    }
    
    if (!formData.effectiveDate) {
      newErrors.effectiveDate = 'Data de efetivação é obrigatória';
    }
    
    // Validate based on movement type
    if (formData.type === 'promotion' || formData.type === 'transfer') {
      if (!formData.newPositionId) {
        newErrors.newPositionId = 'Novo cargo é obrigatório para promoção ou transferência';
      }
    }
    
    if (formData.type === 'transfer') {
      if (!formData.newDepartmentId) {
        newErrors.newDepartmentId = 'Novo departamento é obrigatório para transferência';
      }
    }
    
    if (formData.type === 'merit' || formData.type === 'adjustment') {
      if (!formData.newSalary) {
        newErrors.newSalary = 'Novo salário é obrigatório para mérito ou equiparação';
      } else if (parseFloat(formData.newSalary) <= parseFloat(formData.previousSalary)) {
        newErrors.newSalary = 'Novo salário deve ser maior que o salário atual';
      }
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
    
    // Calculate percentage change
    const percentageChange = calculatePercentageChange();
    
    try {
      const movementData = {
        ...formData,
        percentageChange
      };
      
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/movements/${id}`, movementData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Movimentação atualizada com sucesso!');
      } else {
        await axios.post(`${API_BASE_URL}/movements`, movementData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Movimentação criada com sucesso!');
      }
      
      navigate('/movements');
    } catch (error) {
      console.error('Erro ao salvar movimentação:', error);
      toast.error(error.response?.data?.message || 'Erro ao salvar movimentação');
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
          Carregando dados da movimentação...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Button 
          component={Link} 
          to="/movements" 
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Voltar
        </Button>
        <Typography variant="h4" component="h1">
          {isEditing ? 'Editar Movimentação' : 'Nova Movimentação'}
        </Typography>
      </Box>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.employeeId}>
                <InputLabel id="employee-label">Colaborador</InputLabel>
                <Select
                  labelId="employee-label"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId || ''}
                  onChange={handleChange}
                  label="Colaborador"
                  required
                  disabled={isEditing}
                >
                  <MenuItem value="">
                    <em>Selecione um colaborador</em>
                  </MenuItem>
                  {employees.map(employee => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.employeeId && (
                  <FormHelperText>{errors.employeeId}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel id="type-label">Tipo de Movimentação</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  name="type"
                  value={formData.type || ''}
                  onChange={handleChange}
                  label="Tipo de Movimentação"
                  required
                >
                  <MenuItem value="">
                    <em>Selecione o tipo</em>
                  </MenuItem>
                  <MenuItem value="promotion">Promoção</MenuItem>
                  <MenuItem value="merit">Mérito</MenuItem>
                  <MenuItem value="transfer">Transferência</MenuItem>
                  <MenuItem value="adjustment">Equiparação Salarial</MenuItem>
                </Select>
                {errors.type && (
                  <FormHelperText>{errors.type}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data de Efetivação"
                name="effectiveDate"
                type="date"
                value={formData.effectiveDate || ''}
                onChange={handleChange}
                error={!!errors.effectiveDate}
                helperText={errors.effectiveDate}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            
            {selectedEmployee && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Informações Atuais
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cargo Atual"
                    value={positions.find(p => p.id === selectedEmployee.positionId)?.name || 'Não informado'}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Departamento Atual"
                    value={departments.find(d => d.id === selectedEmployee.departmentId)?.name || 'Não informado'}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Salário Atual"
                    value={formatCurrency(selectedEmployee.salary || 0)}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </>
            )}
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Nova Situação
              </Typography>
            </Grid>
            
            {(formData.type === 'promotion' || formData.type === 'transfer') && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.newPositionId}>
                  <InputLabel id="new-position-label">Novo Cargo</InputLabel>
                  <Select
                    labelId="new-position-label"
                    id="newPositionId"
                    name="newPositionId"
                    value={formData.newPositionId || ''}
                    onChange={handleChange}
                    label="Novo Cargo"
                  >
                    <MenuItem value="">
                      <em>Selecione um cargo</em>
                    </MenuItem>
                    {positions.map(position => (
                      <MenuItem key={position.id} value={position.id}>
                        {position.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.newPositionId && (
                    <FormHelperText>{errors.newPositionId}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
            
            {formData.type === 'transfer' && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.newDepartmentId}>
                  <InputLabel id="new-department-label">Novo Departamento</InputLabel>
                  <Select
                    labelId="new-department-label"
                    id="newDepartmentId"
                    name="newDepartmentId"
                    value={formData.newDepartmentId || ''}
                    onChange={handleChange}
                    label="Novo Departamento"
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
                  {errors.newDepartmentId && (
                    <FormHelperText>{errors.newDepartmentId}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
            
            {(formData.type === 'merit' || formData.type === 'adjustment' || 
              formData.type === 'promotion') && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Novo Salário"
                  name="newSalary"
                  type="number"
                  value={formData.newSalary || ''}
                  onChange={handleChange}
                  error={!!errors.newSalary}
                  helperText={errors.newSalary}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                />
              </Grid>
            )}
            
            {formData.previousSalary > 0 && formData.newSalary > 0 && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Variação Percentual"
                  value={`${calculatePercentageChange().toFixed(2)}%`}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Justificativa"
                name="justification"
                value={formData.justification || ''}
                onChange={handleChange}
                multiline
                rows={4}
              />
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

export default MovementForm;
