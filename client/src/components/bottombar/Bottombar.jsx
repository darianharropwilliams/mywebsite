import { useState } from 'react';
import {
  Box,
  Collapse,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Contactform from '../contactform/ContactForm';
import './Bottombar.css'; // 👈 import the CSS file

function Bottombar() {
  const [open, setOpen] = useState(false);

  return (
    <Box className="bottombar">
      {/* Toggle Button */}
      <Box className="bottombar-toggle">
      <Button
        variant="text"
        disableRipple
        onClick={() => setOpen(!open)}
        className="bottombar-button"
      >
        {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        Contact
      </Button>

      </Box>

      {/* Collapsible Content */}
      <Collapse in={open}>
        <Paper elevation={3} className="bottombar-paper">
          <Typography variant="h6" gutterBottom align="center">
            Contact Me!
          </Typography>
          <Contactform />
        </Paper>
      </Collapse>
    </Box>
  );
}

export default Bottombar;
