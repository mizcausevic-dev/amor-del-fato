import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static-exportable SPA. base '/' works at a domain root or a subdomain root.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    // No inline module-preload polyfill: modern browsers support modulepreload
    // natively, and this keeps index.html free of any inline <script> so the
    // strict Content-Security-Policy (script-src 'self') never blocks the app.
    modulePreload: { polyfill: false },
  },
})
