import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Paper, Typography, Box, 
  CircularProgress, Tabs, Tab, Divider
} from '@mui/material';
import { 
  PieChart, Pie, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { dashboardService } from '../../services/api';
import { toast } from 'react-toastify';

// Cores para gráficos
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [departmentDistribution, setDepartmentDistribution] = useState([]);
  const [workModeDistribution, setWorkModeDistribution] = useState([]);
  const [workloadDistribution, setWorkloadDistribution] = useState([]);
  const [movementHistory, setMovementHistory] = useState([]);
  const [salaryAnalysis, setSalaryAnalysis] = useState(null);
  const [budgetComparison, setBudgetComparison] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Carregar dados em paralelo
        const [
          statsResponse,
          departmentResponse,
          workModeResponse,
          workloadResponse,
          movementResponse,
          salaryResponse,
          budgetResponse
        ] = await Promise.allSettled([
          dashboardService.getStats(),
          dashboardService.getDepartmentDistribution(),
          dashboardService.getWorkModeDistribution(),
          dashboardService.getWorkloadDistribution(),
          dashboardService.getMovementHistory(12), // últimos 12 meses
          dashboardService.getSalaryAnalysis(),
          dashboardService.getBudgetComparison()
        ]);
        
        // Atualizar estados com os dados recebidos ou dados de fallback
        setStats(statsResponse.status === 'fulfilled' ? statsResponse.value.data : {
          totalEmployees: 0,
          activeEmployees: 0,
          departments: 0,
          positions: 0,
          recentMovements: []
        });
        
        setDepartmentDistribution(departmentResponse.status === 'fulfilled' ? departmentResponse.value.data : []);
        setWorkModeDistribution(workModeResponse.status === 'fulfilled' ? workModeResponse.value.data : []);
        setWorkloadDistribution(workloadResponse.status === 'fulfilled' ? workloadResponse.value.data : []);
        setMovementHistory(movementResponse.status === 'fulfilled' ? movementResponse.value.data : []);
        setSalaryAnalysis(salaryResponse.status === 'fulfilled' ? salaryResponse.value.data : {
          salarioMedio: 0,
          salarioPorNivel: [],
          salarioForaTabela: []
        });
        setBudgetComparison(budgetResponse.status === 'fulfilled' ? budgetResponse.value.data : []);
        
        // Log de erros para debug
        [statsResponse, departmentResponse, workModeResponse, workloadResponse, 
         movementResponse, salaryResponse, budgetResponse].forEach((response, index) => {
          if (response.status === 'rejected') {
            console.error(`Erro ao carregar dados do dashboard (${index}):`, response.reason);
          }
        });
        
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        toast.error('Erro ao carregar dados do dashboard. Exibindo dados em branco.');
        
        // Definir dados padrão em caso de erro
        setStats({
          totalEmployees: 0,
          activeEmployees: 0,
          departments: 0,
          positions: 0,
          recentMovements: []
        });
        setDepartmentDistribution([]);
        setWorkModeDistribution([]);
        setWorkloadDistribution([]);
        setMovementHistory([]);
        setSalaryAnalysis({
          salarioMedio: 0,
          salarioPorNivel: [],
          salarioForaTabela: []
        });
        setBudgetComparison([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Resumo de estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">
              Total de Funcionários
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {stats?.totalEmployees || 0}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">
              Funcionários Ativos
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {stats?.activeEmployees || 0}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">
              Departamentos
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {stats?.departments || 0}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">
              Cargos
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {stats?.positions || 0}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Tabs para diferentes visualizações */}
      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Distribuição" />
          <Tab label="Movimentações" />
          <Tab label="Análise Salarial" />
          <Tab label="Orçamento" />
        </Tabs>
        
        {/* Tab de Distribuição */}
        {tabValue === 0 && (
          <Box p={3}>
            <Grid container spacing={4}>
              {/* Distribuição por Modalidade de Trabalho */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Distribuição por Modalidade de Trabalho
                </Typography>
                {workModeDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={workModeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="modalidade"
                        label={({ modalidade, count, percent }) => 
                          `${modalidade}: ${count} (${(percent * 100).toFixed(0)}%)`
                        }
                      >
                        {workModeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                    <Typography variant="body1" color="text.secondary">
                      Nenhum dado disponível
                    </Typography>
                  </Box>
                )}
              </Grid>
              
              {/* Distribuição por Carga Horária */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Distribuição por Carga Horária
                </Typography>
                {workloadDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={workloadDistribution}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="cargaHoraria" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Funcionários" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                    <Typography variant="body1" color="text.secondary">
                      Nenhum dado disponível
                    </Typography>
                  </Box>
                )}
              </Grid>
              
              {/* Distribuição por Departamento */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Distribuição por Departamento
                </Typography>
                {departmentDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={departmentDistribution}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="nome" type="category" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Funcionários" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                    <Typography variant="body1" color="text.secondary">
                      Nenhum dado disponível
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
        
        {/* Tab de Movimentações */}
        {tabValue === 1 && (
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Histórico de Movimentações (12 meses)
            </Typography>
            {movementHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={movementHistory}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="promocoes" name="Promoções" stroke="#8884d8" />
                  <Line type="monotone" dataKey="transferencias" name="Transferências" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="ajustesSalariais" name="Ajustes Salariais" stroke="#ffc658" />
                  <Line type="monotone" dataKey="desligamentos" name="Desligamentos" stroke="#ff8042" />
                  <Line type="monotone" dataKey="afastamentos" name="Afastamentos" stroke="#0088fe" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <Typography variant="body1" color="text.secondary">
                  Nenhum dado disponível
                </Typography>
              </Box>
            )}
            
            {stats?.recentMovements && stats.recentMovements.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                  Movimentações Recentes
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  {stats.recentMovements.map((movement, index) => (
                    <React.Fragment key={movement._id}>
                      <Box sx={{ py: 1 }}>
                        <Typography variant="subtitle1">
                          {movement.tipo} - {movement.funcionario.nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(movement.dataEfetivacao).toLocaleDateString()} - {movement.justificativa}
                        </Typography>
                      </Box>
                      {index < stats.recentMovements.length - 1 && <Divider sx={{ my: 1 }} />}
                    </React.Fragment>
                  ))}
                </Paper>
              </>
            )}
          </Box>
        )}
        
        {/* Tab de Análise Salarial */}
        {tabValue === 2 && (
          <Box p={3}>
            <Grid container spacing={4}>
              {/* Salário Médio */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Typography variant="h6" color="text.secondary">
                    Salário Médio
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ mt: 2 }}>
                    R$ {salaryAnalysis?.salarioMedio?.toFixed(2) || '0.00'}
                  </Typography>
                </Paper>
              </Grid>
              
              {/* Salário por Nível */}
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  Salário Médio por Nível
                </Typography>
                {salaryAnalysis?.salarioPorNivel && salaryAnalysis.salarioPorNivel.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={salaryAnalysis.salarioPorNivel}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nivel" />
                      <YAxis />
                      <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                      <Legend />
                      <Bar dataKey="salarioMedio" name="Salário Médio" fill="#8884d8" />
                      <Bar dataKey="count" name="Quantidade" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                    <Typography variant="body1" color="text.secondary">
                      Nenhum dado disponível
                    </Typography>
                  </Box>
                )}
              </Grid>
              
              {/* Salários Fora da Tabela */}
              {salaryAnalysis?.salarioForaTabela && salaryAnalysis.salarioForaTabela.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Salários Fora da Tabela ({salaryAnalysis.salarioForaTabela.length})
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                      Funcionários com salários fora da faixa salarial do cargo, ordenados por nota de avaliação
                    </Typography>
                    {salaryAnalysis.salarioForaTabela.map((item, index) => (
                      <React.Fragment key={index}>
                        <Box sx={{ py: 1 }}>
                          <Typography variant="subtitle1">
                            {item.funcionario.nome} - {item.cargo} ({item.nivel})
                          </Typography>
                          <Typography variant="body2">
                            Salário: R$ {item.salarioAtual.toFixed(2)} | 
                            Faixa: R$ {item.faixaMinima.toFixed(2)} - R$ {item.faixaMaxima.toFixed(2)} | 
                            Nota: {item.notaAvaliacao}
                          </Typography>
                        </Box>
                        {index < salaryAnalysis.salarioForaTabela.length - 1 && <Divider sx={{ my: 1 }} />}
                      </React.Fragment>
                    ))}
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
        
        {/* Tab de Orçamento */}
        {tabValue === 3 && (
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Comparativo de Orçamento por Departamento
            </Typography>
            {budgetComparison.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={budgetComparison}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="nome" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orcamento.salarios" name="Orçamento Salários" fill="#8884d8" />
                    <Bar dataKey="utilizado.salarios" name="Utilizado Salários" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
                
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                  Comparativo de Headcount por Departamento
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={budgetComparison}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="nome" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orcamento.headcount" name="Orçamento Headcount" fill="#8884d8" />
                    <Bar dataKey="utilizado.headcount" name="Utilizado Headcount" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <Typography variant="body1" color="text.secondary">
                  Nenhum dado disponível
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard;
