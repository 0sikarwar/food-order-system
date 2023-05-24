import { Route, Routes } from 'react-router-dom';

import React from 'react';
import Home from './pages/Home';
import AddItems from './pages/AddItems';
import ViewItems from './pages/ViewItems';
import Admin from './pages/Admin';
import ViewQr from './pages/ViewQr';
import ViewClients from './pages/ViewClients';

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/:client_id/add-items" exact element={<AddItems />} />
      <Route path="/:client_id/view-items" exact element={<ViewItems />} />
      <Route path="/view-clients" exact element={<ViewClients />} />
      <Route path="/admin" exact element={<Admin />} />
      <Route path="/:id/viewqr" exact element={<ViewQr />} />
    </Routes>
  );
};

export default Router;
