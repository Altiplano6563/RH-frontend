import React from 'react';
// Removendo a importação do index.css

// Componente de teste simples
const TestApp = () => {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#1976d2' }}>Teste de Aplicação React</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Esta é uma página de teste para verificar se o React está funcionando corretamente.
      </p>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#333' }}>Informações</h2>
        <p>Se você está vendo esta página, o React está funcionando corretamente.</p>
      </div>
      <button style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
      }}>
        Botão de Teste
      </button>
    </div>
  );
};

export default TestApp;
