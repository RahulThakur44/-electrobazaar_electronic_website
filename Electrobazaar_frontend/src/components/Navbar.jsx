import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const StyledInput = styled(InputBase)(() => ({
  color: 'black',
  backgroundColor: 'white',
  padding: '2px 8px',
  borderRadius: 4,
  width: '200px',
}));

const Navbar = ({ cartIconRef }) => {
  const { cartItems } = useCart();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const navLinks = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Products', path: '/products', icon: <StoreIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
    { label: 'About Us', path: '/about', icon: <InfoIcon /> },
    { label: 'Help', path: '/help', icon: <HelpOutlineIcon /> },
  ];

  const handleLogout = () => {
    handleMenuClose();
    logoutUser();
    navigate('/login');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo + Name */}
        <Box display="flex" alignItems="center">
          <img src="/website.png" alt="logo" style={{ height: 50, marginRight: 10 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="inherit"
            sx={{ textDecoration: 'none' }}
          >
            ElectroBazaar
          </Typography>
        </Box>

        {/* Main Nav Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          {navLinks.map((link) => (
            <Box
              key={link.path}
              component={Link}
              to={link.path}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                gap: 1,
              }}
            >
              {link.icon}
              <Typography variant="body1">{link.label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Right Side Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton component={Link} to="/wishlist" color="inherit">
            <FavoriteIcon />
          </IconButton>

          {/* Search */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box display="flex" alignItems="center" bgcolor="white" borderRadius={1} px={1}>
              <SearchIcon sx={{ color: 'black' }} />
              <StyledInput
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
              />
            </Box>
          </Box>

          {/* Cart */}
          <IconButton component={Link} to="/cart" color="inherit" ref={cartIconRef}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Auth Section */}
          {user ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem disabled>
                  <Box display="flex" alignItems="center" gap={1}>
                    <AccountCircle fontSize="small" />
                    <Typography fontWeight="bold">
                      {user?.name || 'User'}
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon fontSize="small" style={{ marginRight: 6 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton component={Link} to="/login" color="inherit">
              <AccountCircle />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Hamburger Icon on Mobile */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: isXs ? 'center' : 'flex-end',
          px: 2,
          pb: 1,
        }}
      >
        <IconButton color="inherit" onClick={toggleDrawer(true)}>
          <MenuIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>

      {/* Drawer for Mobile Nav */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          exit={{ x: -250 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              width: 250,
              bgcolor: 'black',
              color: 'white',
              height: '100vh',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
          >
            <List>
              {navLinks.map((link) => (
                <ListItem button key={link.label} component={Link} to={link.path}>
                  <ListItemIcon sx={{ color: 'white' }}>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItem>
              ))}
            </List>
          </Box>
        </motion.div>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
