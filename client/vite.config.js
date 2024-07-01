import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@react-oauth/google'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-oauth-google': ['@react-oauth/google'],
        },
      },
    },
  },
});