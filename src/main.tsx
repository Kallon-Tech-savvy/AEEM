import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './ThemeProvider'

const app = (
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)

const container = document.getElementById('root')!

// The build prerenders only the Home page (see ADR 0002) and marks it with
// data-prerendered. Take over that markup when it is for the page being
// viewed; for every other route the shell is empty and is rendered from scratch.
if (container.dataset.prerendered === window.location.pathname) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
