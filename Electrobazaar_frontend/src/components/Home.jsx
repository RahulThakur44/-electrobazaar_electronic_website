import React from 'react';
import Hero from './Hero';
import ProductList from './ProductList';
import ProductCards from './ProductCards';
import ProductCategories from './ProductCategories';
import FeaturedProducts from './FeaturedProducts';

const Home = ({ cartIconRef }) => {
  return (
    <div>
      <Hero />
      <ProductList cartIconRef={cartIconRef} />
      <FeaturedProducts cartIconRef={cartIconRef} />
      <div className="container mt-4">
              
        <ProductCategories />
        <ProductCards />
      </div>
    </div>
  );
};

export default Home;
