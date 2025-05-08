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
import './ContactForm.css';

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
    <Box component="form" onSubmit={handleSubmit} className="contact-form-container">
      <input type="text" name="website" style={{ display: 'none' }} value="" onChange={() => {}} />
      {status && <Alert severity={status.type}>{status.message}</Alert>}

      <div className="contact-form-row">
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="contact-input"
        />
        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="contact-input"
        />
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          multiline
          rows={2}
          className="contact-message"
        />
        <div className="contact-side">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
            className="contact-captcha"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="contact-send"
          >
            Send
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default ContactForm;
