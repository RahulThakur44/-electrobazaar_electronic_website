// src/components/ContactUs.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate API here
    console.log('Form Data:', formData);
    alert('Message Sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-100 py-12">
      <Container maxWidth="md">
        <div className="text-center mb-8">
          <Typography variant="h4" className="text-gray-800 font-bold">
            Contact Us
          </Typography>
          <p className="text-gray-600 mt-2 text-sm">
            Have a question? Fill out the form and we'll get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            fullWidth
          >
            Send Message
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default ContactUs;
