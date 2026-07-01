import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sur Vercel (VERCEL=1), l'app est servie à la racine → base '/'.
// Sur GitHub Pages, elle est servie sous /carte_interactive/.
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/carte_interactive/',
})
