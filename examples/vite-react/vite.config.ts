import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteReactModelPlugin from 'vite-plugin-react-use-model';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteReactModelPlugin({
      modelDir: './src/models',
    }),
  ],
});
