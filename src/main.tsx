import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './ThemeProvider'

// ─────────────────────────────────────────────────────────────────────────────
// FIX 1: AnimatePresence removed from here.
//
// AnimatePresence must be a direct parent of the <motion.*> components it
// controls. Placing it at root (outside the Router) means it has no motion
// children and page-exit animations never fire.
//
// The correct location is inside App.tsx, wrapping <AnimatedRoutes />, where
// it can observe route changes and run exit animations before unmounting.
// ─────────────────────────────────────────────────────────────────────────────

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)