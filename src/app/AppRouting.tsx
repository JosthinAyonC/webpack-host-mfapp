import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadRemote from '~/components/micro/LoadRemote';
import PrivateRoute from '~/guard/PrivateRouting';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { RootState } from '~/store';
import NotFoundScreen from '~/utils/NotFoundScreen';
import UnauthorizedScreen from '~/utils/UnauthorizedScreen';

import LoginPage from './auth/LoginPage';
import { Main } from './dashboard/Main';
import { Sidebar } from './layout/Sidebar';

const AppRouting: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isAuthenticated: showSidebar } = useSelector((state: RootState) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[var(--bg)]">
      {/* Sidebar */}
      {showSidebar && <Sidebar isMobile={isMobile} className="" onToggle={(isOpen) => setIsSidebarOpen(isOpen)} />}

      {/* Contenido principal */}
      <div className={`flex-1 overflow-y-auto transition-all duration-200 ${!showSidebar || isMobile ? 'ml-0' : isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div>
          <Routes>
            {/* Rutas de la aplicación */}
            <Route path="/home" element={<Main />} />

            {/* Ejemplo de private routing */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              }
            />

            {/* Rutas para microapps */}
            <Route path="/clientes/*" element={<LoadRemote scope="microapp" remoteUrl={`${process.env.MF_1_URL}/remoteEntry.js`} module="./RemoteRouting" />} />

            {/* Ruta para not found page */}
            <Route path="*" element={<NotFoundScreen />} />

            {/* Ruta de auth */}
            <Route path="auth/login" element={showSidebar ? <Navigate to={'/'} /> : <LoginPage />} />

            {/* Ruta de unauthorized */}
            <Route path="/unauthorized" element={<UnauthorizedScreen />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppRouting;
