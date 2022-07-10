import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import template from 'vite-plugin-react-use-model';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    template({
      modelDir: path.resolve(process.cwd(), 'src/models'),
    }),
  ],
});
