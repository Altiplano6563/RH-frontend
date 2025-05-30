// Para React 18+
import React from 'react';
import { createRoot } from 'react-dom/client';
import SimpleAuthApp from './SimpleAuthApp';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SimpleAuthApp />
  </React.StrictMode>
);

// OU para React 17 e anteriores
/*
import React from 'react';
import ReactDOM from 'react-dom';
import SimpleAuthApp from './SimpleAuthApp';

ReactDOM.render(
  <React.StrictMode>
    <SimpleAuthApp />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
