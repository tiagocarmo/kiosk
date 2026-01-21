import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Allow forcing dev server port via env var DEV_PORT or PORT.
const port = Number(process.env.DEV_PORT ?? process.env.PORT ?? 5173);

export default defineConfig({
  plugins: [react()],
  server: {
    port,
    // strictPort = true will cause Vite to fail if the port is in use
    // instead of trying the next free port. This forces the exact port.
    strictPort: true,
  },
});
