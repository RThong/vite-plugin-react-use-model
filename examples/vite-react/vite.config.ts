import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import template from 'vite-plugin-react-use-model';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), template()],
});
