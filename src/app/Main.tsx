import MicroTestPage from 'microapp/MicroTestPage';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ThemeToggle from '~/components/ui/ThemeTogle';
import { RootState, login } from '~/store';

const Main: React.FC = () => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleDispatch = () => {
    dispatch(
      login({
        token: 'dada',
        isAuthenticated: true,
        username: 'Pepe',
      })
    );
  };

  return (
    <div className="bg-[var(--bg-color)] min-h-screen p-4">
      <h1 className="text-2xl text-[var(--font-color)]">Modo Noche y Día con TailwindCSS</h1>
      {`${isAuthenticated}`}
      {`${token}`}
      <ThemeToggle />
      <MicroTestPage />
      <button onClick={handleDispatch}>Test dispatch</button>
    </div>
  );
};

export default Main;
