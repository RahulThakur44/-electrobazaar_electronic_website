import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">✅ Order Successful!</h2>
      <p className="text-lg">Thank you, <span className="font-semibold">{userDetails.name}</span>!</p>
      <p className="mt-2">Your order has been placed successfully.</p>

      <button
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded"
        onClick={() => navigate('/products')}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
