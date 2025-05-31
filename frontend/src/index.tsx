import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { AuthProvider } from './contexts/AuthContext.tsx'
// import ScanResults from './pages/general/popup/Scan.tsx'
import { ThemeProvider } from './components/ThemeToggle/ThemeContext.tsx'
// import AppRoutes from './routes/routes.tsx'
import { MemoryRouter } from 'react-router-dom'
import ScanResults from './pages/general/popup/Scan.tsx'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark">
          <MemoryRouter>
            <ScanResults />
          </MemoryRouter>
      </ThemeProvider>
    </StrictMode>,
  )
}
