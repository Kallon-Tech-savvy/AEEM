import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <App />
      </AnimatePresence>
    </ThemeProvider>
  </React.StrictMode>,
)
