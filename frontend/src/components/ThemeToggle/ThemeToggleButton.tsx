import React from 'react';
import { useTheme } from './ThemeContext';
import './ThemeToggleButton.css';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <div className={`theme-toggle ${className}`}>
      <input 
        type="checkbox" 
        id="theme-toggle-input" 
        checked={isDarkTheme} 
        onChange={toggleTheme}
      />
      <label htmlFor="theme-toggle-input">
        <i className="fa-sun">☀️</i>
        <i className="fa-moon">🌙</i>
        <span className="ball"></span>
      </label>
    </div>
  );
};
