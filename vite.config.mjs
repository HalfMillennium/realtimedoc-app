import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },  
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:5050`, 
        changeOrigin: true
      },
    },
  },
});
