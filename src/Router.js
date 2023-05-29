import { Route, Routes } from 'react-router-dom';

import React from 'react';
import Home from './pages/Home';
import AddItems from './pages/AddItems';
import ViewItems from './pages/ViewItems';
import Admin from './pages/Admin';
import ViewQr from './pages/ViewQr';
import ViewClients from './pages/ViewClients';
import OrderItem from './pages/OrderItem';
import Cart from './pages/Cart';
import ViewTables from './pages/ViewTables';
import ViewTableCart from './pages/ViewTableCart';

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/:client_id/add-items" exact element={<AddItems />} />
      <Route path="/:client_id/view-items" exact element={<ViewItems />} />
      <Route path="/view-clients" exact element={<ViewClients />} />
      <Route path="/admin" exact element={<Admin />} />
      <Route path="/:id/viewqr" exact element={<ViewQr />} />
      <Route path="/:client_id/view-tables" exact element={<ViewTables />} />
      <Route
        path="/:client_id/orderitem/:table_id"
        exact
        element={<OrderItem />}
      />
      <Route
        path="/:client_id/view-table-cart/:table_id"
        exact
        element={<ViewTableCart />}
      />
      <Route path="/:client_id/cart/:table_id" exact element={<Cart />} />
    </Routes>
  );
};

export default Router;
