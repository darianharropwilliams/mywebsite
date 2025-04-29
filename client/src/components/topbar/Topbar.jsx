import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Topbar.css';

function Topbar() {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          {/* Name link (home) */}
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

          {/* Topbar text links */}
          <Grid item>
            <Button
              component={Link}
              to="/"
              className="topbar-link"
              style={{ color: 'white', textTransform: 'none' }}
            >
              Bio
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/skills"
              className="topbar-link"
              style={{ color: 'white', textTransform: 'none' }}
            >
              Skills
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/projects"
              className="topbar-link"
              style={{ color: 'white', textTransform: 'none' }}
            >
              Projects
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/blog"
              className="topbar-link"
              style={{ color: 'white', textTransform: 'none' }}
            >
              Blog
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/demos"
              className="topbar-link"
              style={{ color: 'white', textTransform: 'none' }}
            >
              Demos
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
