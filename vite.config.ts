import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dynamically require optional plugins so TypeScript doesn't fail if types are missing
const loadCompression = () => {
  try {
    // @ts-ignore
    return require('vite-plugin-compression')
  } catch {
    return null
  }
}

const loadVisualizer = () => {
  try {
    // @ts-ignore
    return require('rollup-plugin-visualizer')?.visualizer
  } catch {
    return null
  }
}

const apiTarget = process.env.API_TARGET || 'http://localhost:5174'

export default defineConfig(({ mode }) => {
  const compression = loadCompression()
  const visualizer = loadVisualizer()

  return {
    plugins: [
      react(),
      // Generate compressed assets for production (gzip + brotli) when plugin is available
      compression ? compression({ algorithm: 'gzip', ext: '.gz', deleteOriginFile: false }) : undefined,
      compression ? compression({ algorithm: 'brotliCompress', ext: '.br', deleteOriginFile: false }) : undefined,
      mode === 'production' && visualizer ? (visualizer({ filename: 'dist/stats.html', open: false, gzipSize: true }) as any) : undefined,
    ].filter(Boolean),

    server: {
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    build: {
      target: 'es2019',
      minify: 'terser',
      brotliSize: true,
      // Avoid inlining large assets into JS bundles (reduces main thread work)
      assetsInlineLimit: 1024,
      chunkSizeWarningLimit: 600,
      terserOptions: ({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      } as any),
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor_react'
              return 'vendor'
            }
          },
        },
      },
    },
  }
})
