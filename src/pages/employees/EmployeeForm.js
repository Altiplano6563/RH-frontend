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
    nome: '',
    email: '',
    cpf: '', // Adicionado
    dataNascimento: '', // Adicionado
    telefone: '',
    departamento: '',
    cargo: '',
    salario: '',
    dataAdmissao: '',
    status: 'Ativo',
    modalidadeTrabalho: 'Presencial',
    cargaHoraria: '',
    jornadaTrabalho: '8h-17h',
    genero: 'Prefiro não informar',
    raca: 'Prefiro não informar',
    notaAvaliacao: '',
    observacoes: ''
  });

  useEffect(() => {
    if (isEditing) {
      // Simulando busca de dados do funcionário
      // Em um caso real, aqui seria feita uma chamada à API
      setFormData({
        nome: 'João Silva',
        email: 'joao.silva@empresa.com',
        cpf: '123.456.789-00',
        dataNascimento: '1990-01-01',
        telefone: '(11) 98765-4321',
        departamento: 'TI',
        cargo: 'Desenvolvedor',
        salario: '5000',
        dataAdmissao: '2022-03-01',
        status: 'Ativo',
        modalidadeTrabalho: 'Híbrido',
        cargaHoraria: '40',
        jornadaTrabalho: '09:00 - 18:00',
        genero: 'Masculino',
        raca: 'Parda',
        notaAvaliacao: '8',
        observacoes: 'Ótimo funcionário'
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
                name="nome"
                value={formData.nome}
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
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Data de Nascimento"
                name="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Departamento</InputLabel>
                <Select
                  name="departamento"
                  value={formData.departamento}
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
                  name="cargo"
                  value={formData.cargo}
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
              <TextField
                fullWidth
                label="Salário"
                name="salario"
                type="number"
                value={formData.salario}
                onChange={handleChange}
                InputProps={{ startAdornment: 'R$ ' }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Data de Admissão"
                name="dataAdmissao"
                type="date"
                value={formData.dataAdmissao}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
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
                  <MenuItem value="Ativo">Ativo</MenuItem>
                  <MenuItem value="Inativo">Inativo</MenuItem>
                  <MenuItem value="Afastado">Afastado</MenuItem>
                  <MenuItem value="Férias">Férias</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Modalidade de Trabalho</InputLabel>
                <Select
                  name="modalidadeTrabalho"
                  value={formData.modalidadeTrabalho}
                  onChange={handleChange}
                  label="Modalidade de Trabalho"
                >
                  <MenuItem value="Presencial">Presencial</MenuItem>
                  <MenuItem value="Remoto">Remoto</MenuItem>
                  <MenuItem value="Híbrido">Híbrido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Carga Horária (horas semanais)"
                name="cargaHoraria"
                type="number"
                value={formData.cargaHoraria}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Jornada de Trabalho</InputLabel>
                <Select
                  name="jornadaTrabalho"
                  value={formData.jornadaTrabalho}
                  onChange={handleChange}
                  label="Jornada de Trabalho"
                >
                  <MenuItem value="8h-17h">8h-17h</MenuItem>
                  <MenuItem value="9h-18h">9h-18h</MenuItem>
                  <MenuItem value="10h-19h">10h-19h</MenuItem>
                  <MenuItem value="Flexível">Flexível</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Gênero</InputLabel>
                <Select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  label="Gênero"
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Feminino">Feminino</MenuItem>
                  <MenuItem value="Não-binário">Não-binário</MenuItem>
                  <MenuItem value="Prefiro não informar">Prefiro não informar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Raça</InputLabel>
                <Select
                  name="raca"
                  value={formData.raca}
                  onChange={handleChange}
                  label="Raça"
                >
                  <MenuItem value="Branca">Branca</MenuItem>
                  <MenuItem value="Preta">Preta</MenuItem>
                  <MenuItem value="Parda">Parda</MenuItem>
                  <MenuItem value="Amarela">Amarela</MenuItem>
                  <MenuItem value="Indígena">Indígena</MenuItem>
                  <MenuItem value="Prefiro não informar">Prefiro não informar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Observações"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                multiline
                rows={4}
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

export default EmployeeForm;


