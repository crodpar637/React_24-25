/**
 * @file main.jsx
 * @description Punto de entrada principal de la aplicación React.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Crear el root de la aplicación y renderizar el componente principal App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
