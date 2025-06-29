import React, { useEffect, useState } from 'react';
import { getDashboardStats, getSalesByDate } from '../services/analyticsService';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Grid, Paper, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentsIcon from '@mui/icons-material/Payments';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({});
  const [salesChart, setSalesChart] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dashboardData = await getDashboardStats();
    setStats(dashboardData);

    const salesData = await getSalesByDate();
    setSalesChart(salesData.reverse());
  };

  const chartData = {
    labels: salesChart.map(item => item.date),
    datasets: [
      {
        label: 'Sales (₹)',
        data: salesChart.map(item => item.total),
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        borderColor: '#3f51b5',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  return (
    <Box mt={4}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Sales & Payment Analytics
      </Typography>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <MonetizationOnIcon color="success" fontSize="large" />
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Total Sales
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {formatter.format(stats.totalSales || 0)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <ShoppingCartIcon color="primary" fontSize="large" />
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Total Orders
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {stats.totalOrders || 0}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <PaymentsIcon color="secondary" fontSize="large" />
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Total Payments
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {stats.totalPayments || 0}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Sales - Last 7 Days
        </Typography>
        <Line data={chartData} />
      </Paper>
    </Box>
  );
};

export default AnalyticsDashboard;
