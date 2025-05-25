import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Collapse, Paper } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactForm from '../contactform/ContactForm';
import './Bottombar.css';

function Bottombar() {
  const [open, setOpen] = useState(false);
  const [bounce, setBounce] = useState(false);
  const bounceTimeoutRef = useRef(null);
  const collapseIntervalRef = useRef(null);
  const location = useLocation();

  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    if (location.pathname === '/') {
      bounceTimeoutRef.current = setTimeout(() => {
        setBounce(true);
        setTimeout(() => setBounce(false), 800);
      }, 3000);
    }

    collapseIntervalRef.current = setInterval(() => {
      setOpen(false);
    }, 300000);

    return () => {
      clearTimeout(bounceTimeoutRef.current);
      clearInterval(collapseIntervalRef.current);
    };
  }, [location]);

  return (
    <Box className="bottombar">
      <Box
        className={`bottombar-toggle ${open ? 'open' : ''}`}
        onClick={toggleOpen}
      >
        {!open ? (
          <span className={`bottombar-label ${bounce ? 'bounce-text' : ''}`}>
            Have a Question? Contact Me! <ExpandLessIcon fontSize="small" />
          </span>
        ) : (
          <ExpandMoreIcon fontSize="small" />
        )}
      </Box>

      <Collapse in={open}>
        <Paper elevation={3} className="bottombar-paper">
          <ContactForm />
        </Paper>
      </Collapse>
    </Box>
  );
}

export default Bottombar;
