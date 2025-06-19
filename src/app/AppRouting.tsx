import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadRemote from '~/components/micro/LoadRemote';
import PrivateRoute from '~/guard/PrivateRouting';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { RootState } from '~/store';
import NotFoundScreen from '~/utils/NotFoundScreen';
import UnauthorizedScreen from '~/utils/UnauthorizedScreen';

import LoginPage from './auth/LoginPage';
import { Sidebar } from './layout/Sidebar';

// Rutas de microfrontend
const microfrontends = [{ path: 'inventario/*', scope: 'microapp', url: process.env.MF_1_URL, module: './RemoteRouting' }];

const AppRouting: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isAuthenticated: showSidebar } = useSelector((state: RootState) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [showSidebar, isMobile]);

  return (
    <div className="flex h-screen bg-[var(--bg)]">
      {/* Sidebar */}
      {showSidebar && <Sidebar isMobile={isMobile} onToggle={(isOpen) => setIsSidebarOpen(isOpen)} />}

      {/* Contenido principal */}
      <div className={`flex-1 space-x-2 overflow-y-auto transition-all duration-200 ${!showSidebar || isMobile ? 'ml-0' : isSidebarOpen ? 'ml-80' : 'ml-16'}`}>
        <div>
          <Routes>
            {/* Rutas de la aplicación */}
            <Route
              path="principal"
              element={
                <PrivateRoute>
                  <>Hello Micro - Front ENDs</>
                </PrivateRoute>
              }
            />

            {/* Microfrontends */}
            {microfrontends.map(({ path, scope, url, module }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PrivateRoute>
                    <LoadRemote scope={scope} remoteUrl={`${url}/remoteEntry.js`} module={module} />
                  </PrivateRoute>
                }
              />
            ))}

            {/* Ruta para not found page */}
            <Route path="*" element={<NotFoundScreen />} />

            {/* Ruta de auth */}
            <Route path="auth/login" element={showSidebar ? <Navigate to={'/'} /> : <LoginPage />} />

            {/* Ruta de unauthorized */}
            <Route path="unauthorized" element={<UnauthorizedScreen />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppRouting;
