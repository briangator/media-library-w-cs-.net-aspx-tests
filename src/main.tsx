import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Logger } from './lib/logging';

Logger.info('main.tsx: Starting hydration...');

try {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Could not find root element');
  }
  
  Logger.info('main.tsx: Found root element, rendering...');
  
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  Logger.info('main.tsx: Hydration command sent.');
} catch (error) {
  Logger.error('main.tsx: Critical error during hydration:', error);
}
