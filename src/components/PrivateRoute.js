import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

// Componente para rotas privadas que requerem autenticação
const PrivateRoute = ({ children, requiredPermissions = [] }) => {
  const { isAuthenticated, loading, hasPermission } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Se não estiver autenticado, redirecionar para login
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
    
    // Se houver permissões requeridas, verificar se o usuário tem acesso
    if (!loading && isAuthenticated && requiredPermissions.length > 0 && !hasPermission(requiredPermissions)) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, isAuthenticated, requiredPermissions, hasPermission, navigate]);

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

  // Se não estiver autenticado, mostrar carregamento enquanto redireciona
  if (!isAuthenticated) {
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

  // Se houver permissões requeridas e não tiver acesso, mostrar carregamento enquanto redireciona
  if (requiredPermissions.length > 0 && !hasPermission(requiredPermissions)) {
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

  // Se estiver autenticado e tiver permissão, renderizar o conteúdo
  return children || <Outlet />;
};

export default PrivateRoute;
