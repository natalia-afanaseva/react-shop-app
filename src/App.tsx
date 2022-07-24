import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Navigation/Footer";
import Header from "./components/Navigation/Header";

import MainPage from "./views/MainPage";
import ProductPage from "./views/ProductPage";
import UserOrders from "./views/UserOrders";
import CartOffcanvas from "./components/Cart/CartOffcanvas";

import NotFound from "./views/NotFound";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartOffcanvas />
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
