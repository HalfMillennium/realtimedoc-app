import ReactDOM from 'react-dom/client';
import App from './App';
import { StoreProvider } from './providers/StoreProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
