// src/pages/Cart.jsx
import React, { useContext, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const incrementQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decrementQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    ));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is empty</p>
          <Link to="/products" className="text-blue-500 underline">Go to Products</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
              <Link to={`/product/${item.id}`} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold hover:underline">{item.name}</h2>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrementQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                  disabled={item.qty === 1}
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button onClick={() => incrementQty(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
              </div>

              <div className="text-right">
                <p className="font-semibold">₹{item.price * item.qty}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm">Remove</button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h2 className="text-xl font-bold">Total: ₹{total.toFixed(2)}</h2>
            <Link to="/checkout/step1">
              <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
