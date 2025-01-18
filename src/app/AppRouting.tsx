import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoadRemote from '~/components/micro/LoadRemote';
import PrivateRoute from '~/guard/PrivateRouting';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { RootState } from '~/store';
import NotFoundScreen from '~/utils/NotFoundScreen';
import UnauthorizedScreen from '~/utils/UnauthorizedScreen';

import { Main } from './dashboard/Main';
import { Sidebar } from './layout/Sidebar';

const AppRouting: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {isAuthenticated && <Sidebar isMobile={isMobile} />}

      {/* Contenido principal */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? 'ml-0' : 'ml-64'}`}>
        <div className="p-4">
          <Routes>
            {/* Rutas de la aplicación */}
            <Route path="/home" element={<Main />} />

            {/* Ejemplo de private routing */}
            <Route
              path="/"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <Main />
                </PrivateRoute>
              }
            />

            {/* Rutas para microapps */}
            {/* Leer Load Remote */}
            <Route path="/clientes/*" element={<LoadRemote scope="microapp" remoteUrl={`${process.env.MF_1_URL}/remoteEntry.js`} module="./RemoteRouting" />} />

            {/* Ruta para not found page */}
            <Route path="*" element={<NotFoundScreen />} />

            {/* Ruta de unauthorized */}
            <Route path="/unauthorized" element={<UnauthorizedScreen />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppRouting;
