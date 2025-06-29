// src/components/Sidebar.js
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  
} from '@mui/material';
import {
  Dashboard,
  ShoppingCart,
  Inventory,
  People,
  Payment,
  BarChart,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { drawerWidth } from '../constants/Layout';
//import logo from '../assets/logo.png'; // ✅ If using inside src/

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1e2a38',
          color: 'white',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* ✅ Logo Section */}
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <img
          src='website_logo.png'
          alt="Logo"
          style={{ width: '200px',height:'120px', marginBottom: '-30px',marginTop:'-30px' }}
        />
        
      </Box>

      <List sx={{marginTop:'-20px'}}>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon sx={{ color: 'white' }}><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemIcon sx={{ color: 'white' }}><Inventory /></ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="/orders">
          <ListItemIcon sx={{ color: 'white' }}><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon sx={{ color: 'white' }}><People /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/payments">
          <ListItemIcon sx={{ color: 'white' }}><Payment /></ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>
        <ListItem button component={Link} to="/analytics">
          <ListItemIcon sx={{ color: 'white' }}><BarChart /></ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
