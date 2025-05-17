import React from "react";
import './MyStyle.css';
import './App.css';
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import NonVeg from "./NonVeg";
import Veg from "./Veg";
import IceCream from "./IceCream";
import Home from "./Home";
import Chocolate from "./Chocolate";
import Cart from "./Cart";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Orders from "./Orders";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PageNotFound from "./PageNotFound";

import { useDispatch, useSelector } from "react-redux";
import { logOut } from "./store"; // Assuming logOut action is defined in your store

function App() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const currentUser = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
        <h1 className="store-heading">
          <img src="/Images/Image.jpg" alt="Store Logo" />
        </h1>
        <Link to="/home">🏠 Home</Link>
        <Link to="/non-veg">🍗 Non-Veg</Link>
        <Link to="/veg">🥦 Veg</Link>
        <Link to="/ice-cream">🍦 Ice Creams</Link>
        <Link to="/chocolate">🍫 Chocolates</Link>
        <Link to="/cart">🛒 Cart ({totalCartCount})</Link>
        <Link to="/myorder">📦 Orders</Link>
        <Link to="/aboutus">ℹ About Us</Link>
        <Link to="/contactus">📞 Contact Us</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="btn btn-link">Logout</button>
        ) : (
          <Link to="/sign-in">🔐 Sign In</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/non-veg" element={<NonVeg />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/ice-cream" element={<IceCream />} />
        <Route path="/chocolate" element={<Chocolate />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myorder" element={<Orders />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;