import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';
import AnalyticsDashboard from './AnalyticsDashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PaymentsIcon from '@mui/icons-material/Payments';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    totalPayments: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get('https://electrobazaar-backend-5.onrender.com/api/analytics/dashboard-stats');
      setStats(res.data);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    }
  };

  const statItems = [
    { label: 'Total Users', value: stats.totalUsers, bg: '#e3f2fd', icon: <PeopleAltIcon fontSize="large" color="primary" /> },
    { label: 'Total Orders', value: stats.totalOrders, bg: '#e8f5e9', icon: <ShoppingCartIcon fontSize="large" color="success" /> },
    { label: 'Total Products', value: stats.totalProducts, bg: '#fffde7', icon: <Inventory2Icon fontSize="large" color="warning" /> },
    { label: 'Total Payments', value: stats.totalPayments, bg: '#ede7f6', icon: <PaymentsIcon fontSize="large" color="secondary" /> },
    { label: 'Total Revenue', value: `₹${Number(stats.totalRevenue).toLocaleString()}`, bg: '#fbe9e7', icon: <AttachMoneyIcon fontSize="large" color="error" /> },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {statItems.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ backgroundColor: item.bg, display: 'flex', alignItems: 'center', padding: 2 }}>
              <Box sx={{ marginRight: 2 }}>{item.icon}</Box>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {item.label}
                </Typography>
                <Typography variant="h5" fontWeight={600}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={5}>
        <AnalyticsDashboard />
      </Box>
    </Box>
  );
};

export default Dashboard;
