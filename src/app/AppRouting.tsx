import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoadRemote from '~/components/micro/LoadRemote';
import PrivateRoute from '~/guard/PrivateRouting';
import { useMediaQuery } from '~/hooks/useMediQuery';
import { RootState } from '~/store';
import NotFoundScreen from '~/utils/NotFoundScreen';
import UnauthorizedScreen from '~/utils/UnauthorizedScreen';

import { Main } from './dashboard/Main';
import { FormUse } from './examples/form/FormUse';
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
            {/* Rutas para el dashboard */}
            <Route path="/" element={<Main />} />

            {/* Ejemplo de privateRouting. */}
            <Route
              path="/private"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <FormUse />
                </PrivateRoute>
              }
            />

            {/* Rutas para los micro frontends */}
            <Route
              path="/clientes/*"
              element={
                // Leer el archivo LoadRemote
                <LoadRemote remoteUrl={`${process.env.MF_1_URL}/remoteEntry.js`} scope="microapp" module="./RemoteRouting" />
              }
            />

            {/* Ruta para cuando no se encuentra la página */}
            <Route path="*" element={<NotFoundScreen />} />
            {/* Ruta para cuando no se tiene permisos */}
            <Route path="/unauthorized" element={<UnauthorizedScreen />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppRouting;
