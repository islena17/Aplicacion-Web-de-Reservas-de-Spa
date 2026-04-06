import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import MainApp from './MainApp';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MainApp />
    </StrictMode>,
);