import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Multi-page: además de la app (index.html), se generan páginas
      // estáticas indexables (guías + privacidad) que apuntan de vuelta
      // a la herramienta. Ver requisitos.md / README para el porqué.
      input: {
        main: resolve(__dirname, 'index.html'),
        guiaWifi: resolve(__dirname, 'guias/qr-wifi/index.html'),
        guiaWhatsapp: resolve(__dirname, 'guias/qr-whatsapp-business/index.html'),
        guiaVcard: resolve(__dirname, 'guias/qr-vcard-tarjeta-digital/index.html'),
        privacidad: resolve(__dirname, 'privacidad/index.html'),
      },
    },
  },
})
