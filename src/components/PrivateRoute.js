import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

/**
 * Componente de rota privada que verifica se o usuário está autenticado
 * antes de renderizar o componente filho.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componente filho a ser renderizado se autenticado
 * @param {string[]} [props.requiredPermissions] - Permissões necessárias para acessar a rota
 * @returns {React.ReactNode} - Componente filho ou redirecionamento para login
 */
const PrivateRoute = ({ children, requiredPermissions }) => {
  const { currentUser, isAuthenticated, loading, hasPermission } = useAuth();
  
  // Mostrar indicador de carregamento enquanto verifica autenticação
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  
  // Verificar se o usuário está autenticado
  if (!isAuthenticated || !currentUser) {
    // Redirecionar para a página de login
    return <Navigate to="/login" replace />;
  }
  
  // Verificar permissões se necessário
  if (requiredPermissions && !hasPermission(requiredPermissions)) {
    // Redirecionar para a página de acesso negado ou dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  // Renderizar o componente filho se autenticado e com permissões
  return children;
};

export default PrivateRoute;
