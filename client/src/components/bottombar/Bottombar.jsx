import { useState } from 'react';
import {
  Box,
  Collapse,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Contactform from '../contactform/ContactForm';

function Bottombar() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: 'background.paper',
        boxShadow: 3,
        zIndex: 1200,
      }}
    >
      {/* Toggle Button */}
      <Box sx={{ textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ color: 'white' }}
        >
          {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Box>

      {/* Collapsible Content */}
      <Collapse in={open}>
        <Paper elevation={3} sx={{ maxWidth: 900, margin: '0 auto', p: 2 }}>
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
