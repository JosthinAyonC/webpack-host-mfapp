import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Main } from './dashboard/Main';

const RemoteRouting = React.lazy(() => import('microapp/RemoteRouting'));

const AppRouting: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Main />} />
      <Route
        path="/clientes/*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            {/* Aquí el micro frontend utiliza los contextos del host */}
            <RemoteRouting />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRouting;
