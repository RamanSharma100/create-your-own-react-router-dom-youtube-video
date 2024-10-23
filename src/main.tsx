import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './lib/providers/Router.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
