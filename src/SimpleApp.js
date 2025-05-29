import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Página inicial simples
const HomePage = () => {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#1976d2' }}>Sistema de Gestão</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Bem-vindo à página inicial do sistema.
      </p>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#333' }}>Dashboard</h2>
        <p>Esta é a página principal do sistema.</p>
      </div>
    </div>
  );
};

// Página de login simples
const LoginPage = () => {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      maxWidth: '400px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#1976d2' }}>Login</h1>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p>Página de login simplificada.</p>
      </div>
    </div>
  );
};

// Aplicativo com roteamento básico
const SimpleApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default SimpleApp;
