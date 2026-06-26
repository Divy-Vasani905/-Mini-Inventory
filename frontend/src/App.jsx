import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default App;
