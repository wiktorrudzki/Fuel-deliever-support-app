import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { UserProvider } from './hooks/UserProvider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
