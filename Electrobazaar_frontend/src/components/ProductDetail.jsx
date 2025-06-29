import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RelatedProducts from './RelatedProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // ✅ import wishlist
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist(); // ✅ use wishlist
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://electrobazaar-backend-5.onrender.com/api/products/${productId}`)
      .then(res => {
        setProduct(res.data.product);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      toast.info("🔐 Please login to add to cart");
      navigate("/login");
      return;
    }

    addToCart(product);
    toast.success("✅ Product added to cart");
  };

  const handleAddToWishlist = () => {
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      toast.info("🔐 Please login to add to wishlist");
      navigate("/login");
      return;
    }

    addToWishlist(product); // ✅ Add to wishlist
    toast.success("❤️ Product added to wishlist");
    //navigate("/wishlist");  // ✅ Redirect to wishlist page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  const fallbackImage = "/fallback.jpg";

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full h-auto"
            onError={(e) => e.target.src = fallbackImage}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">₹{product.price}</p>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Ratings & Reviews</h2>
            <div className="flex items-center">
              <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
            </div>
            <p>“This product is amazing!” </p>
          </div>

          {/* ✅ Buttons Row */}
          <div className="flex gap-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts category={product.category} currentProductId={product.id} />

    </div>
  );
};

export default ProductDetail;
