import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './index.html',
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Tách các thư viện bên thứ 3
          }
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Loại bỏ console.log
        drop_debugger: true, // Loại bỏ debugger
      },
    },
    chunkSizeWarningLimit: 1000, // Tăng giới hạn cảnh báo chunk
  },
});
