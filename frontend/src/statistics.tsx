import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./Theme";
import Statistics from "./pages/general/statistics/Statistics";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark">
          <MemoryRouter>
            <Statistics />
          </MemoryRouter>
      </ThemeProvider>
    </StrictMode>,
  )
}
