import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  ArrowBack, 
  Person, 
  Business, 
  DateRange, 
  AttachMoney, 
  Visibility,
  Edit,
  Delete
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

const MovementDetail = () => {
  const { id } = useParams();
  const [movement, setMovement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovement = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/movements/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMovement(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da movimentação:', error);
        setError('Não foi possível carregar os detalhes da movimentação. Tente novamente mais tarde.');
        toast.error('Erro ao carregar detalhes da movimentação');
      } finally {
        setLoading(false);
      }
    };

    fetchMovement();
  }, [id]);

  const getMovementTypeLabel = (type) => {
    const types = {
      'promotion': 'Promoção',
      'merit': 'Mérito',
      'transfer': 'Transferência',
      'adjustment': 'Equiparação Salarial'
    };
    return types[type] || type;
  };

  const getMovementTypeColor = (type) => {
    const colors = {
      'promotion': 'success',
      'merit': 'primary',
      'transfer': 'info',
      'adjustment': 'warning'
    };
    return colors[type] || 'default';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Carregando detalhes da movimentação...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Button 
            component={Link} 
            to="/movements" 
            variant="contained" 
            startIcon={<ArrowBack />}
            sx={{ mt: 2 }}
          >
            Voltar para Movimentações
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!movement) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Movimentação não encontrada
          </Typography>
          <Button 
            component={Link} 
            to="/movements" 
            variant="contained" 
            startIcon={<ArrowBack />}
            sx={{ mt: 2 }}
          >
            Voltar para Movimentações
          </Button>
        </Paper>
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
          Detalhes da Movimentação
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2">
            {movement.employee?.name || 'Colaborador'}
          </Typography>
          <Chip 
            label={getMovementTypeLabel(movement.type)} 
            color={getMovementTypeColor(movement.type)}
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Person color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                <strong>Colaborador:</strong> {movement.employee?.name || 'Não informado'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Business color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                <strong>Departamento:</strong> {movement.employee?.department?.name || 'Não informado'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DateRange color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                <strong>Data da Movimentação:</strong> {formatDate(movement.effectiveDate)}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoney color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                <strong>Salário Anterior:</strong> {formatCurrency(movement.previousSalary || 0)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoney color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                <strong>Novo Salário:</strong> {formatCurrency(movement.newSalary || 0)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoney color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                <strong>Variação (%):</strong> {movement.percentageChange ? `${movement.percentageChange.toFixed(2)}%` : 'N/A'}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom>
          Detalhes da Movimentação
        </Typography>

        <Grid container spacing={3}>
          {movement.previousPosition && movement.newPosition && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Cargo Anterior:</strong> {movement.previousPosition?.name || 'Não informado'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Novo Cargo:</strong> {movement.newPosition?.name || 'Não informado'}
                </Typography>
              </Grid>
            </>
          )}
          
          {movement.previousDepartment && movement.newDepartment && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Departamento Anterior:</strong> {movement.previousDepartment?.name || 'Não informado'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Novo Departamento:</strong> {movement.newDepartment?.name || 'Não informado'}
                </Typography>
              </Grid>
            </>
          )}
          
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Justificativa:</strong>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              {movement.justification || 'Nenhuma justificativa fornecida.'}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom>
          Informações Adicionais
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Criado por:</strong> {movement.createdBy || 'Não informado'}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Data de Criação:</strong> {formatDate(movement.createdAt)}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Atualizado por:</strong> {movement.updatedBy || 'Não informado'}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Última Atualização:</strong> {formatDate(movement.updatedAt)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          component={Link}
          to={`/movements/${id}/edit`}
          variant="outlined"
          color="primary"
          startIcon={<Edit />}
        >
          Editar
        </Button>
        
        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
        >
          Excluir
        </Button>
      </Box>
    </Container>
  );
};

export default MovementDetail;
