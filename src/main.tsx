import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { UserProvider } from './components/context/usercontext.tsx';


// Use createRoot from react-dom to create the root
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
        <App />
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
