// src/components/AboutUs.js
import React from 'react';
import { Container, Typography, Divider } from '@mui/material';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-12">
      <Container maxWidth="md">
        <div className="text-center mb-10">
          <Typography variant="h4" component="h2" className="text-gray-800 font-semibold">
            About Us
          </Typography>
          <Divider className="my-4" />
          <p className="text-gray-600 text-md">
            Welcome to Electronics Store – your one-stop destination for the latest tech gadgets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7"
            alt="Our Store"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />

          <div>
            <Typography variant="h6" className="text-gray-800 mb-2">
              Who We Are
            </Typography>
            <p className="text-gray-600 text-sm mb-4">
              We are a team of tech enthusiasts committed to providing the best electronics at the best prices.
              From smartphones and laptops to accessories and home gadgets, we curate only top-rated products.
            </p>

            <Typography variant="h6" className="text-gray-800 mb-2">
              Our Mission
            </Typography>
            <p className="text-gray-600 text-sm">
              Our mission is to bring the latest technology to your doorstep with unbeatable support and service.
              We believe in transparency, quality, and customer satisfaction.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
