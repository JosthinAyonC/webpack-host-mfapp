import React from 'react';
import ThemeToggle from '~/components/ui/ThemeTogle';

const Main: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-font-light dark:text-font-dark min-h-screen p-4">
      <h1 className="text-2xl">Modo Noche y Día con TailwindCSS</h1>
      <ThemeToggle />
    </div>
  );
};

export default Main;
