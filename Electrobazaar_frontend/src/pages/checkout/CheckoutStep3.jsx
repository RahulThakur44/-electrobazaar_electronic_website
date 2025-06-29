import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function CheckoutStep3() {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  // ✅ Load selected address from localStorage
  useEffect(() => {
    const storedAddress = localStorage.getItem('selectedAddress');
    if (storedAddress) {
      setUserDetails(JSON.parse(storedAddress));
    } else {
      navigate('/checkout/step2');
    }
  }, []);

  const handlePayment = async () => {
    if (!userDetails?.address || !userDetails?.contact) {
      alert("Please provide shipping address first.");
      navigate('/checkout/step2');
      return;
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (totalAmount <= 0) {
      alert("Cart is empty or invalid total.");
      return;
    }

    const products = cartItems.map(item => ({
      product_id: item.id,
      product_name: item.name,
      product_image: item.image,
      qty: item.qty,
      price: item.price,
    }));

    const orderData = {
      user_id: user.id,
      total_amount: totalAmount,
      payment_method: paymentMethod,
      address: `${userDetails.address}, ${userDetails.area || ''}`,
      contact: userDetails.contact,
      products,
    };

    try {
      console.log("🧾 Creating Order with:", orderData);

      if (paymentMethod === "COD") {
        const orderRes = await axios.post('https://electrobazaar-backend-5.onrender.com/api/orders', orderData);

        await axios.post('https://electrobazaar-backend-5.onrender.com/api/payments', {
          order_id: orderRes.data.orderId,
          user_id: user.id,
          amount: totalAmount,
          payment_method: 'COD',
          payment_status: 'Pending',
          transaction_id: null,
          gateway_response: null,
          status_message: 'COD order placed'
        });

        alert('Order placed with Cash on Delivery!');
        setCartItems([]);
        localStorage.removeItem('cart');
        localStorage.removeItem('selectedAddress');
        navigate('/order/success');
        return;
      }

      // ✅ Razorpay Payment Flow
      const razorRes = await axios.post('https://electrobazaar-backend-5.onrender.com/api/payments/create-order', {
        amount: totalAmount,
      });

      const options = {
        key: '',  // put your razorpay key_ID
        amount: razorRes.data.amount,
        currency: 'INR',
        name: 'ElectroBazaar',
        description: 'Order Payment',
        order_id: razorRes.data.id,
        handler: async (response) => {
          const finalRes = await axios.post('https://electrobazaar-backend-5.onrender.com/api/orders', orderData);

          await axios.post('https://electrobazaar-backend-5.onrender.com/api/payments', {
            order_id: finalRes.data.orderId,
            user_id: user.id,
            amount: totalAmount,
            payment_method: 'Razorpay',
            payment_status: 'Paid',
            transaction_id: response.razorpay_payment_id,
            gateway_response: JSON.stringify(response),
            status_message: 'Payment success'
          });

          alert('Payment successful & order placed!');
          setCartItems([]);
          localStorage.removeItem('cart');
          localStorage.removeItem('selectedAddress');
          navigate('/order/success');
        },
        prefill: {
          name: userDetails.name || user.name,
          email: user.email,
          contact: userDetails.contact,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error('❌ Payment Error:', err.response?.data || err.message);
      alert('Something went wrong while placing your order.');
    }
  };

  const handleBack = () => {
    navigate('/checkout/step2');
  };

  if (!userDetails) {
    return <div className="text-center mt-10 text-gray-500">Loading address...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Step 3: Payment</h2>

      <div className="space-y-2 mb-4">
        <label className="block">
          <input
            type="radio"
            name="payment"
            value="Razorpay"
            checked={paymentMethod === "Razorpay"}
            onChange={() => setPaymentMethod("Razorpay")}
            className="mr-2"
          />
          Razorpay (Online)
        </label>
        <label className="block">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
            className="mr-2"
          />
          Cash on Delivery (COD)
        </label>
      </div>

      <div className="flex gap-4">
        <button
          className="bg-gray-400 text-white px-6 py-2 rounded"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          onClick={handlePayment}
        >
          {paymentMethod === "COD" ? "Place Order (COD)" : "Complete Payment"}
        </button>
      </div>
    </div>
  );
}

export default CheckoutStep3;
