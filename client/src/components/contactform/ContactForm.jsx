import { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/contact', { email, subject, message });
      setStatus('Message sent successfully!');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      setStatus('Error sending message, please try again.');
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Contact Us</h2>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message"
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactForm;
