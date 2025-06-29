import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);
  const fallbackImage = "/fallback.jpg";

  useEffect(() => {
    if (category) {
      axios.get(`https://electrobazaar-backend-5.onrender.com/api/products`)
        .then(res => {
          let products = [];
          if (Array.isArray(res.data)) {
            products = res.data;
          } else if (Array.isArray(res.data.products)) {
            products = res.data.products;
          }

          // Filter out the current product
          const filtered = products.filter(p => p.id !== currentProductId);
          setRelatedProducts(filtered);
        })
        .catch(err => {
          console.error("Error fetching related products:", err);
          setError("Failed to load related products.");
        });
    }
  }, [category, currentProductId]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (relatedProducts.length === 0) return <p>No related products found.</p>;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="border p-2 rounded shadow hover:shadow-lg transition no-underline"
          >
            <img
              src={item.image || fallbackImage}
              alt={item.name}
              className="w-full h-60 object-cover mb-2 p-2"
              onError={(e) => (e.target.src = fallbackImage)}
            />
            <p className="font-semibold">{item.name}</p>
            <p className='no-underline'>{item.description}</p>
            <p className="text-green-600 font-bold">₹{item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default RelatedProducts;
