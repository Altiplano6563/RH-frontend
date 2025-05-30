import React, { createContext, useContext, useState } from 'react';

// Criando o contexto de autenticação
const AuthContext = createContext();

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor do contexto de autenticação simplificado
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Função de login simplificada
  const login = () => {
    setIsAuthenticated(true);
    return Promise.resolve();
  };

  // Função de logout simplificada
  const logout = () => {
    setIsAuthenticated(false);
    return Promise.resolve();
  };

  // Valores e funções disponibilizados pelo contexto
  const value = {
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
