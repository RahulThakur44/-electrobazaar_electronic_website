import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function CheckoutStep1() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleNext = () => {
    const key = `address_${user?.id}`;
    const hasOldAddress = !!localStorage.getItem(key);
    if (hasOldAddress) navigate('/checkout/step2');
    else navigate('/checkout/step2');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      <div className="bg-white p-4 rounded shadow">
        {/* ✅ Added table to show cart items */}
        <table className="w-full table-auto text-left mb-4">
          <thead>
            <tr>
              <th className="border-b py-2">Product</th>
              <th className="border-b py-2">Qty</th>
              <th className="border-b py-2">Price</th>
              <th className="border-b py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td className="py-2 flex items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                  <span>{item.name}</span>
                </td>
                <td className="py-2">{item.qty}</td>
                <td className="py-2">₹{item.price}</td>
                <td className="py-2 font-medium">₹{item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ✅ Totals */}
        <div className="text-right mt-4 space-y-1">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Tax (18% GST): ₹{tax.toFixed(2)}</p>
          <p className="font-bold text-lg">Total: ₹{total.toFixed(2)}</p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-400 text-white px-6 py-2 rounded"
            onClick={() => navigate('/cart')}
          >
            Back
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutStep1;
