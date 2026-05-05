import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.cs';
import './index.css';

/**
 * Written by Brian McCarthy
 * C# Representation of the Web Entry Point
 */
// using System;
/*
... (Namespace and Class simulation) ...
*/

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
