import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./style/core.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import ProductPage from "./views/ProductPage";
import Checkout from "./views/Checkout";
import NotFound from "./views/NotFound";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
