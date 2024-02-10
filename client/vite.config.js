import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server:{
    open:false,
    host:true,
    strictPort:true,
    port:3000
  }
});