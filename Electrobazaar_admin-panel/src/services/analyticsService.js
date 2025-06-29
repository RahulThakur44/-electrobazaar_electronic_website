import axios from 'axios';

export const getDashboardStats = async () => {
  const res = await axios.get('https://electrobazaar-backend-5.onrender.com/api/analytics/dashboard-stats');
  return res.data;
};

export const getSalesByDate = async () => {
  const res = await axios.get('https://electrobazaar-backend-5.onrender.com/api/analytics/sales-by-date');
  return res.data;
};
