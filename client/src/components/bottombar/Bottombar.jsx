import { useState } from 'react';
import {
  Box,
  Collapse,
  Paper,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactForm from '../contactform/ContactForm';
import './Bottombar.css';

function Bottombar() {
  const [open, setOpen] = useState(false);

  return (
    <Box className="bottombar">
      <Box
        className={`bottombar-toggle ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        {!open ? (
          <span className="bottombar-label">
            Contact Me <ExpandLessIcon fontSize="small" />
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
