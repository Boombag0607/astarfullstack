import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import Home from "./pages/HomeLoggedOut";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Category from "./pages/Category";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loggedin" element={<HomeLoggedIn />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/forgotpwd" element={<ForgotPassword />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product" element={<EditProduct />} />
        <Route path="/category/:category" element={<Category />} />
      </Routes>
    </Router>
  );
};

export default App;
