import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Stack,
  Alert,
} from '@mui/material';
import ReCAPTCHA from "react-google-recaptcha";

function ContactForm() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/contact', {
        email,
        subject,
        message,
        website: '', // honeypot
        captchaToken,
      });
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      setStatus({ type: 'error', message: 'Error sending message, please try again.' });
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <input type="text" name="website" style={{ display: 'none' }} value="" onChange={() => {}} />
      <Stack spacing={1}>
        {status && <Alert severity={status.type}>{status.message}</Alert>}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ minWidth: 180 }}
          />
          <TextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            sx={{ minWidth: 180 }}
          />
          <TextField
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            multiline
            rows={2}
            sx={{ flexGrow: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ whiteSpace: 'nowrap', height: '100%' }}
          >
            Send
          </Button>
        </Stack>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaChange}
        />
      </Stack>
    </Box>
  );
}

export default ContactForm;
