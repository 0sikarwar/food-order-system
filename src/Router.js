import { Route, Routes } from 'react-router-dom';

import React from 'react';
import Home from './pages/Home';
import EnterData from './pages/EnterData';
import Admin from './pages/Admin';

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/enter-data" exact element={<EnterData />} />
      <Route path="/admin" exact element={<Admin />} />
    </Routes>
  );
};

export default Router;
