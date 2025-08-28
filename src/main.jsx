import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App'; 
import { AuthProvider } from './contexts/AuthContext';
import { DraftConfirmationProvider } from './context/DraftConfirmationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DraftConfirmationProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
        </DraftConfirmationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);