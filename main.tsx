import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // Import global styles first
import './index.css';
import App from './src/App';
import { AppProvider } from './src/context/AppContext';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
