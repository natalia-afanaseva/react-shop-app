import React from "react";
import Footer from "./components/Navigation/Footer";
import Header from "./components/Navigation/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import ProductPage from "./views/ProductPage";
import Checkout from "./views/Checkout";
import NotFound from "./views/NotFound";
import CartOffcanvas from "./components/Cart/CartOffcanvas";
import Context from "./Context";
import { getAuth } from "firebase/auth";
import UserOrders from "./views/UserOrders";

const App: React.FC = () => {
  const auth = getAuth();

  console.log(!!auth.currentUser);

  return (
    <Context.Provider value={{ isAuth: !!auth.currentUser }}>
      <BrowserRouter>
        <CartOffcanvas />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<UserOrders />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
