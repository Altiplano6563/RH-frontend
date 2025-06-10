import axios from 'axios';

// URL base da API
export const API_BASE_URL = 'https://rh-backend-production.up.railway.app/api';

// Configuração do axios
const api = axios.create({
  baseURL: API_BASE_URL
} );

// Adicionar token de autenticação em todas as requisições
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  // Login de usuário
  login: async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      
      // Armazenar tokens e dados do usuário
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },
  
  // Logout de usuário
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
      
      // Limpar dados de autenticação
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      
      // Limpar dados mesmo em caso de erro
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      throw error;
    }
  },
  
  // Verificar se usuário está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },
  
  // Obter usuário atual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  // Renovar token de acesso
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('Refresh token não encontrado');
      }
      
      const response = await api.post('/auth/refresh-token', { refreshToken });
      
      // Atualizar tokens
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      
      return response.data;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      throw error;
    }
  }
};

// Serviços de funcionários
export const employeeService = {
  // Listar funcionários
  getEmployees: async (filters = {}) => {
    try {
      const response = await api.get('/employees', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      throw error;
    }
  },
  
  // Obter funcionário por ID
  getEmployeeById: async (id) => {
    try {
      const response = await api.get(`/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar funcionário:', error);
      throw error;
    }
  },
  
  // Criar funcionário
  createEmployee: async (employeeData) => {
    try {
      const response = await api.post('/employees', employeeData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar funcionário:', error);
      throw error;
    }
  },
  
  // Atualizar funcionário
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await api.put(`/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      throw error;
    }
  },
  
  // Excluir funcionário
  deleteEmployee: async (id) => {
    try {
      const response = await api.delete(`/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
      throw error;
    }
  }
};

// Serviços de departamentos
export const departmentService = {
  // Listar departamentos
  getDepartments: async () => {
    try {
      const response = await api.get('/departments');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error);
      throw error;
    }
  },
  
  // Obter departamento por ID
  getDepartmentById: async (id) => {
    try {
      const response = await api.get(`/departments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar departamento:', error);
      throw error;
    }
  },
  
  // Criar departamento
  createDepartment: async (departmentData) => {
    try {
      const response = await api.post('/departments', departmentData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar departamento:', error);
      throw error;
    }
  },
  
  // Atualizar departamento
  updateDepartment: async (id, departmentData) => {
    try {
      const response = await api.put(`/departments/${id}`, departmentData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar departamento:', error);
      throw error;
    }
  },
  
  // Excluir departamento
  deleteDepartment: async (id) => {
    try {
      const response = await api.delete(`/departments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir departamento:', error);
      throw error;
    }
  }
};

// Serviços de cargos
export const positionService = {
  // Listar cargos
  getPositions: async () => {
    try {
      const response = await api.get('/positions');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cargos:', error);
      throw error;
    }
  },
  
  // Obter cargo por ID
  getPositionById: async (id) => {
    try {
      const response = await api.get(`/positions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cargo:', error);
      throw error;
    }
  },
  
  // Criar cargo
  createPosition: async (positionData) => {
    try {
      const response = await api.post('/positions', positionData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar cargo:', error);
      throw error;
    }
  },
  
  // Atualizar cargo
  updatePosition: async (id, positionData) => {
    try {
      const response = await api.put(`/positions/${id}`, positionData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar cargo:', error);
      throw error;
    }
  },
  
  // Excluir cargo
  deletePosition: async (id) => {
    try {
      const response = await api.delete(`/positions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir cargo:', error);
      throw error;
    }
  }
};

// Serviços de movimentações
export const movementService = {
  // Listar movimentações
  getMovements: async (filters = {}) => {
    try {
      const response = await api.get('/movements', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar movimentações:', error);
      throw error;
    }
  },
  
  // Obter movimentação por ID
  getMovementById: async (id) => {
    try {
      const response = await api.get(`/movements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar movimentação:', error);
      throw error;
    }
  },
  
  // Criar movimentação
  createMovement: async (movementData) => {
    try {
      const response = await api.post('/movements', movementData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar movimentação:', error);
      throw error;
    }
  },
  
  // Atualizar movimentação
  updateMovement: async (id, movementData) => {
    try {
      const response = await api.put(`/movements/${id}`, movementData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar movimentação:', error);
      throw error;
    }
  },
  
  // Excluir movimentação
  deleteMovement: async (id) => {
    try {
      const response = await api.delete(`/movements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir movimentação:', error);
      throw error;
    }
  }
};

// Serviços de tabelas salariais
export const salaryTableService = {
  // Listar tabelas salariais
  getSalaryTables: async () => {
    try {
      const response = await api.get('/salary-tables');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar tabelas salariais:', error);
      throw error;
    }
  },
  
  // Obter tabela salarial por ID
  getSalaryTableById: async (id) => {
    try {
      const response = await api.get(`/salary-tables/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar tabela salarial:', error);
      throw error;
    }
  },
  
  // Criar tabela salarial
  createSalaryTable: async (salaryTableData) => {
    try {
      const response = await api.post('/salary-tables', salaryTableData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar tabela salarial:', error);
      throw error;
    }
  },
  
  // Atualizar tabela salarial
  updateSalaryTable: async (id, salaryTableData) => {
    try {
      const response = await api.put(`/salary-tables/${id}`, salaryTableData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar tabela salarial:', error);
      throw error;
    }
  },
  
  // Excluir tabela salarial
  deleteSalaryTable: async (id) => {
    try {
      const response = await api.delete(`/salary-tables/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir tabela salarial:', error);
      throw error;
    }
  }
};

// Serviços de dashboard
export const dashboardService = {
  // Obter estatísticas gerais
  getStats: async () => {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas do dashboard:', error);
      throw error;
    }
  },
  
  // Obter distribuição por departamento
  getDepartmentDistribution: async () => {
    try {
      const response = await api.get('/dashboard/department-distribution');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar distribuição por departamento:', error);
      throw error;
    }
  },
  
  // Obter distribuição por cargo
  getPositionDistribution: async () => {
    try {
      const response = await api.get('/dashboard/position-distribution');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar distribuição por cargo:', error);
      throw error;
    }
  },
  
  // Obter distribuição por modalidade de trabalho
  getWorkModeDistribution: async () => {
    try {
      const response = await api.get('/dashboard/workmode-distribution');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar distribuição por modalidade de trabalho:', error);
      throw error;
    }
  },
  
  // Obter distribuição por carga horária
  getWorkloadDistribution: async () => {
    try {
      const response = await api.get('/dashboard/workload-distribution');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar distribuição por carga horária:', error);
      throw error;
    }
  },
  
  // Obter histórico de movimentações
  getMovementHistory: async (meses = 12) => {
    try {
      const response = await api.get('/dashboard/movement-history', { params: { meses } });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar histórico de movimentações:', error);
      throw error;
    }
  },
  
  // Obter análise salarial
  getSalaryAnalysis: async () => {
    try {
      const response = await api.get('/dashboard/salary-analysis');
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      throw error;
    }
  },
  
  // Obter comparativo de orçamento
  getBudgetComparison: async () => {
    try {
      const response = await api.get('/dashboard/budget-comparison');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar comparativo de orçamento:', error);
      throw error;
    }
  }
};

export default api;
