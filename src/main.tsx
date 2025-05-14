import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // Import global styles with Tailwind directives
import './index.css';
import App from './App';
import { AppProvider } from './context/AppContext';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
