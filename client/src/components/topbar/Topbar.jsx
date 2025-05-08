import React from 'react';
import { AppBar, Box, Button, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './Topbar.css';

function Topbar() {
  const location = useLocation();

  const navItems = [
    { label: 'Darian Harrop-Williams', to: '/', isName: true },
    { label: 'Bio', to: '/bio' },
    { label: 'Skills', to: '/skills' },
    { label: 'Projects', to: '/projects' },
    { label: 'Blog', to: '/blog' },
    { label: 'Demos', to: '/demos' },
  ];

  return (
    <AppBar position="fixed" color="primary">
      <Box className="topbar-container">
        {navItems.map(({ label, to, isName }) =>
          isName ? (
            <Box
              key={to}
              component={Link}
              to={to}
              className={`topbar-box topbar-name ${location.pathname === to ? 'active' : ''}`}
            >
              <Typography variant="h6">{label}</Typography>
            </Box>
          ) : (
            <Box
              key={to}
              component={Link}
              to={to}
              className={`topbar-box topbar-link ${location.pathname === to ? 'active' : ''}`}
            >
              {label}
            </Box>
          )
        )}
      </Box>
    </AppBar>
  );
}

export default Topbar;
