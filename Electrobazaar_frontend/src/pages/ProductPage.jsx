import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetail from '../components/ProductDetail';

const ProductPage = () => {
  const { productId } = useParams(); // Grabbing the productId from the URL params
  const [product, setProduct] = useState(null); // Initializing state to hold product data
  const [loading, setLoading] = useState(true); // Flag to indicate loading state
  const [error, setError] = useState(null); // To hold error message if something goes wrong

  useEffect(() => {
    setLoading(true); // Set loading to true when the API call is made
    axios.get(`http://localhost:5000/api/products/${productId}`)
      .then(res => {
        setProduct(res.data); // Set the product state to the fetched data
        setLoading(false); // Set loading to false after the data is fetched
      })
      .catch(err => {
        setError('Failed to load product');
        setLoading(false); // Set loading to false even if there's an error
        console.error('Error:', err);
      });
  }, [productId]); // Runs every time productId changes (when navigating to a different product page)

  if (loading) {
    return <p>Loading...</p>; // Show loading state while the data is being fetched
  }

  if (error) {
    return <p>{error}</p>; // Show error if fetching the product fails
  }

  return (
    <div className="py-10 px-4 bg-gray-100">
      {product ? <ProductDetail product={product} /> : <p>No product found</p>}
    </div>
  );
};

export default ProductPage;
