import React, { useState, useEffect } from 'react';

const images = [
  'https://cdn-s3.touchofmodern.com/products/000/100/639/9a8d433257a2bb645e1c57aa35ce9780_large.jpg?1405531643',
  'https://img.buzzfeed.com/buzzfeed-static/complex/images/vavbx6twns6o8ol3yk6f/playstation-remote.jpg?output-format=jpg&output-quality=auto',
  'https://m.media-amazon.com/images/I/61TLDQrtEOL._SL1500_.jpg',
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <img
        src={images[current]}
        alt="Slide"
        className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Latest Electronics Deals</h1>
          <p className="text-lg md:text-xl text-white mb-6">Upgrade your tech at unbeatable prices</p>
          <a
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg no-underline"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
