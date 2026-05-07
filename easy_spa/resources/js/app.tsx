import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '../css/app.css'; 

import MainApp from './MainApp';
import { AuthProvider } from '@/context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  </StrictMode>,
);