import React, { createContext, useContext, useState, useEffect } from 'react';

// Criando o contexto de autenticação
export const AuthContext = createContext(); // Adicione "export" aqui

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Função de login simulada
  const login = (email, password) => {
    // Simulando uma autenticação bem-sucedida
    const user = {
      id: '1',
      name: 'Usuário Teste',
      email: email,
      role: 'admin'
    };
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    // Armazenando no localStorage para persistir a sessão
    localStorage.setItem('user', JSON.stringify(user));
    return Promise.resolve(user);
  };

  // Função de logout
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    return Promise.resolve();
  };

  // Verificar permissões do usuário
  const hasPermission = (requiredPermissions) => {
    if (!currentUser) return false;
    
    // Simulando verificação de permissões
    // Neste exemplo, usuários com role 'admin' têm todas as permissões
    if (currentUser.role === 'admin') return true;
    
    return false;
  };

  // Verificar se há um usuário armazenado no localStorage ao carregar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
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
      {children}
    </AuthContext.Provider>
  );
};
