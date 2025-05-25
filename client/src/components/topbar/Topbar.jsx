import React, { useState } from 'react';
import { AppBar, Box, IconButton, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import './Topbar.css';
import { fetchSkills } from '../../utils/skillsCache';
import { preloadAllProjects } from '../../utils/projectCache';
import { preloadBlogs } from '../../utils/blogCache'; // <- you'll create this file

function Topbar() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: 'Darian Harrop-Williams', to: '/', isName: true },
    { label: 'Bio', to: '/bio' },
    { label: 'Skills', to: '/skills' },
    { label: 'Projects', to: '/projects' },
    { label: 'Blog', to: '/blog' },
    { label: 'Demos', to: '/demos' },
  ];

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Box className="topbar-container">
          <Box className="topbar-name-box">
            <Typography variant="h6" component={Link} to="/" className="topbar-title">
              Darian Harrop-Williams
            </Typography>
          </Box>
          <Box className="topbar-desktop">
            {navItems.slice(1).map(({ label, to }) => (
              <Box
                key={to}
                component={Link}
                to={to}
                className={`topbar-box ${location.pathname === to ? 'active' : ''}`}
                onMouseEnter={() => {
                  if (label === 'Skills') fetchSkills();
                  if (label === 'Projects') preloadAllProjects();
                  if (label === 'Blog') preloadBlogs();
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
          <Box className="topbar-mobile">
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List className="topbar-drawer">
          {navItems.map(({ label, to }) => (
            <ListItem button key={to} component={Link} to={to} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Topbar;
