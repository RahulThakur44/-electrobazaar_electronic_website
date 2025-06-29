import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import Profile from './components/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './components/ProductDetail';
import AboutUs from './components/AboutUs';
import ProtectedRoute from './components/ProtectedRoute';
import ContactUs from './components/ContactUs';
import Wishlist from './components/Wishlist';
import CheckoutStep1 from './pages/checkout/CheckoutStep1';
import CheckoutStep2 from './pages/checkout/CheckoutStep2';
//import CheckoutStep2New from './pages/checkout/CheckoutStep2New';
//import AddressPrompt from './pages/checkout/AddressPrompt';
import CheckoutStep3 from './pages/checkout/CheckoutStep3';
import OrderSuccess from './pages/checkout/OrderSuccess';
import Help from './components/Help';
import UserHome from './pages/UserHome.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const cartIconRef = useRef(null);

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
      <Navbar cartIconRef={cartIconRef} />

      <Routes>
        <Route path="/" element={ <Home  cartIconRef={cartIconRef} />} />
        <Route path="/products" element={<ProductList cartIconRef={cartIconRef} />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/help" element={<Help />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={   <ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-home" element={<UserHome />} /> 
        <Route path="/checkout/step1" element={<CheckoutStep1 />} />
        {/*<Route path="/checkout/step2" element={<AddressPrompt />} />*/}
        <Route path="/checkout/step2" element={<CheckoutStep2 />} />   
        {/*<Route path="/checkout/step2/new" element={<CheckoutStep2New />} />*/}
        <Route path="/checkout/step3" element={<CheckoutStep3 />} />
        <Route path="/order/success" element={<OrderSuccess />} />
      </Routes>

      <Footer />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
