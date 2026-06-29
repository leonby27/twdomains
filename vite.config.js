import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Деплой в подпапку GitHub Pages: https://leonby27.github.io/twdomains/
  base: '/twdomains/',
  plugins: [react()],
  resolve: {
    // Алиас для FSD-импортов: @app, @pages, @widgets, @features, @entities, @shared.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: { port: process.env.PORT ? Number(process.env.PORT) : 5180, open: true },
})
