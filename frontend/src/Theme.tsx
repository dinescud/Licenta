import React, { useEffect, createContext, useState, ReactNode, useContext } from "react";

type ThemeType = "dark" | "light";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
  toggleTheme: () => void;
}

// Create context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook for using the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const getTheme = (): ThemeType => {
  const theme = localStorage.getItem("theme") as ThemeType;
  if (!theme) {
    // Default theme is taken as dark-theme
    localStorage.setItem("theme", "dark");
    return "dark";
  } else {
    return theme;
  }
};

interface ThemeProviderProps {
  defaultTheme?: ThemeType;
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(getTheme);

  function toggleTheme(): void {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  useEffect(() => {
    const refreshTheme = (): void => {
      localStorage.setItem("theme", theme);
      // Apply theme to document body or html element
      document.documentElement.className = theme;
    };
    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };