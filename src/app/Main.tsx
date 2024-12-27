import React from 'react';
import { useTheme } from 'src/sasf-commons/provider/ThemeContext';

const Main: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-font-light dark:text-font-dark min-h-screen p-4">
      <h1 className="text-2xl">Modo Noche y Día con TailwindCSS</h1>
      <ThemeToggle />
    </div>
  );
};

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="p-2 rounded bg-primary-light dark:bg-primary-dark text-font-light dark:text-font-dark" onClick={toggleTheme}>
      Cambiar a {theme === 'light' ? 'modo oscuro' : 'modo claro'}
    </button>
  );
};

export default Main;
