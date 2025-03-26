import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import ScanResults from './pages/popup/scan.tsx'
import { ThemeProvider } from './components/ThemeToggle/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <ScanResults />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
