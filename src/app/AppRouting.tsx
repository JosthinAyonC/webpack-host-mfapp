import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadRemote from '~/components/micro/LoadRemote';
import { useMediaQuery } from '~/hooks/useMediQuery';

import { Main } from './dashboard/Main';
import { Sidebar } from './layout/Sidebar';

const AppRouting: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isMobile={isMobile} />

      {/* Contenido principal */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? 'ml-0' : 'ml-64'}`}>
        <div className="p-4">
          <Routes>
            <Route path="/home" element={<Main />} />
            <Route path="/clientes/*" element={<LoadRemote remoteLoader={() => import('microapp/RemoteRouting')} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppRouting;
