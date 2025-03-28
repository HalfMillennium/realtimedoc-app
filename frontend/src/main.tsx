import { ClerkProvider } from '@clerk/clerk-react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StoreProvider } from './providers/StoreProvider';

const PUBLISHABLE_KEY: string = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <StoreProvider>
      <App />
    </StoreProvider>
  </ClerkProvider>
);
