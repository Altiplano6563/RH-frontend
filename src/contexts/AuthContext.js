import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { toast } from 'react-toastify';

// Criando o contexto de autenticação
const AuthContext = createContext();

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Função de login
  const login = async (email, senha) => {
    try {
      const response = await authService.login(email, senha);
      const { user } = response.data;
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      return user;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      const errorMessage = error.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.';
      toast.error(errorMessage);
      throw error;
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, limpar dados locais
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  // Verificar permissões do usuário
  const hasPermission = (requiredPermissions) => {
    if (!currentUser) return false;
    
    // Verificação baseada no perfil do usuário
    if (currentUser.perfil === 'Admin') return true;
    
    if (Array.isArray(requiredPermissions)) {
      return requiredPermissions.includes(currentUser.perfil);
    }
    
    return currentUser.perfil === requiredPermissions;
  };

  // Verificar se há um usuário armazenado ao carregar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar se há token de acesso
        if (authService.isAuthenticated()) {
          // Obter usuário atual do localStorage
          const user = authService.getCurrentUser();
          
          if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Em caso de erro, limpar dados de autenticação
        await logout();
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Valores e funções disponibilizados pelo contexto
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
