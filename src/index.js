import React from 'react';
import ReactDOM from 'react-dom';
import FinalApp from './FinalApp';
import './index.css';

// Importações do Material UI
import '@mui/material/styles';
import '@mui/material/CssBaseline';

ReactDOM.render(
  <React.StrictMode>
    <FinalApp />
  </React.StrictMode>,
  document.getElementById('root')
);
