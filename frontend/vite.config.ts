import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true
  },
  // base: "/deploy_react_app_github_pages_vercel"
})
