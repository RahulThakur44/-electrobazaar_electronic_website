// src/services/paymentService.js
import axios from 'axios';

export const getPayments = async () => {
  try {
    const res = await axios.get('https://electrobazaar-backend-5.onrender.com/api/payments'); // ✅ Ye route backend mein hona chahiye
    return res.data;
  } catch (err) {
    console.error('Error fetching payments:', err);
    return [];
  }
};

export const deletePayment = async (id) => {
  try {
    await axios.delete(`https://electrobazaar-backend-5.onrender.com/api/payments/${id}`);
  } catch (err) {
    console.error('Error deleting payment:', err);
  }
};
