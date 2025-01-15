import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Main } from './dashboard/Main';

const AppRouting: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Main />} />
    </Routes>
  );
};

export default AppRouting;
