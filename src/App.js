import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar, Sidebar, Footer } from "./components";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import useRequest from "./hooks/useRequest";
import SingleProductPage from "./pages/SingleProductPage";

function App() {
  useRequest();
  return (
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route path={"/products/:id"}>
            <SingleProductPage />
          </Route>
          <Route path={"/cart"}>
            <CartPage />
          </Route>
          <Route path={"/products"}>
            <ProductsPage />
          </Route>
          <Route path={"/about"}>
            <AboutPage />
          </Route>
          <Route path={"/"}>
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
