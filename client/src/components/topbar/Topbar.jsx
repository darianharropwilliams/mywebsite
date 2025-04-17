import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './Topbar.css';

function DropdownMenu({ label, items }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="topbar-link"
        style={{ color: 'white', textTransform: 'none' }}
      >
        {label}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item, index) => (
          <MenuItem
            key={index}
            component={Link}
            to={item.path}
            onClick={handleClose}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function Topbar() {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          {/* Name link (no dropdown) */}
          <Grid item>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Darian Harrop-Williams
            </Typography>
          </Grid>

          {/* Dropdown menus */}
          <Grid item>
            <DropdownMenu
              label="Bio"
              items={[
                { label: 'Overview', path: '/bio' },
                // { label: 'Timeline', path: '/' }
              ]}
            />
          </Grid>
          <Grid item>
            <DropdownMenu
              label="Projects"
              items={[
                { label: 'Solo Projects', path: '/projects' },
                // { label: 'Group Projects', path: '/' }
              ]}
            />
          </Grid>
          <Grid item>
            <DropdownMenu
              label="Blog"
              items={[
                { label: 'All Posts', path: '/blog' },
                // { label: 'Tags', path: '/' }
              ]}
            />
          </Grid>
          <Grid item>
            <DropdownMenu
              label="Demos"
              items={[
                { label: 'Project Demos', path: '/demos' },
                { label: 'Games', path: '/' }
              ]}
            />
          </Grid>

          {/* Spacer and search bar
          <Grid item xs />
          <Grid item>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid> */}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
