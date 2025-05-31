import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ScanHistory from "./pages/general/history/ScanHistory";
import { MemoryRouter } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./Theme";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark">
          <MemoryRouter>
            <ScanHistory />
          </MemoryRouter>
      </ThemeProvider>
    </StrictMode>,
  )
}
