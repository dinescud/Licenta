import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/ThemeToggle/ThemeContext.tsx'
import { MemoryRouter } from 'react-router-dom'
import Settings from './pages/general/settings/Settings.tsx'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark">
          <MemoryRouter>
            <Settings />
          </MemoryRouter>
      </ThemeProvider>
    </StrictMode>,
  )
}
