import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Only used by the build-time prerender (src/entry-server.tsx). Bundling every
  // dependency avoids Node's CommonJS/ESM mismatches (react-helmet-async has no
  // named ESM exports in Node) and keeps a single copy of React in the bundle.
  ssr: { noExternal: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-helmet-async')) {
            return 'vendor-router'
          }
        },
      },
    },
  },
})
