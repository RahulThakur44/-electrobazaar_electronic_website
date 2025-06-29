// src/components/Footer.js
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Description */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold text-white">ElectroBazaar</h2>
          <p className="mt-3 text-sm">
            Your one-stop shop for the latest and greatest electronics and gadgets.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
            <li><a href="/shipping" className="hover:underline">Shipping & Returns</a></li>
            <li><a href="/support" className="hover:underline">Support</a></li>
            <li><a href="/track-order" className="hover:underline">Track Order</a></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📞 +91 99691xxxxx</li>
            <li>✉️ support@electronicsstore.com</li>
            <li>🏢 Mumbai, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
            <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-white text-lg">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
              <FaTwitter />
              </a>
            </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Electronics Store. All rights reserved.</p>
        <p className="mt-2">
          <a href="/privacy" className="hover:underline">Privacy Policy</a> | 
          <a href="/terms" className="hover:underline ml-1">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
