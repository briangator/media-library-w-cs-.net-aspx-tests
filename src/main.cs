import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Logger } from './lib/logging';

/**
 * [ C# ENTRY POINT SIMULATION ]
 * namespace MediaLibrarySystem.Client
 * {
 *     public class Program {
 *         public static void Main(string[] args) { ... }
 *     }
 * }
 */

Logger.info('PROGRAM_START: Initializing React runtime...');

try {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('System.NullReferenceException: Root container not found in DOM.');
  }
  
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  Logger.info('PROGRAM_INIT_SUCCESS: Hydration complete.');
} catch (error) {
  Logger.error('SYSTEM_CRITICAL: Hydration failed.', error);
}
