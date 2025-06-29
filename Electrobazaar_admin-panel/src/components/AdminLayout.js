// src/components/AdminLayout.js
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
//import { drawerWidth } from '../constants/Layout';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 1,
          //marginLeft: `${drawerWidth}px`, // 👈 Fix main content position
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
