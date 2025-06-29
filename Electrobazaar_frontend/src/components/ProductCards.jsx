import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCards = ({ product }) => {
  const { cartItems, addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  if (!product || !product.id) return null;

  const handleAddToCart = async () => {
    const isLoggedIn = !!localStorage.getItem("token");

    if (!isLoggedIn) {
      toast.info("🔐 Please login to add items to cart", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    const isAlreadyInCart = cartItems.find((item) => item.id === product.id);

    if (isAlreadyInCart) {
      toast.warning("❗ Product already in cart", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      setLoading(true);
      addToCart(product);

      setTimeout(() => {
        setLoading(false);
        toast.success("✅ Product added to cart!", {
          position: "top-center",
          autoClose: 2000,
        });
      }, 1000); // Simulate delay
    }
  };

  const fallbackImage = "path/to/fallback/image.jpg";

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col items-center text-center">
      <Link to={`/product/${product.id}`} className="w-full">
        <img
          src={product?.image || fallbackImage}
          alt={product?.name}
          className="h-40 object-contain mb-2 mx-auto"
          onError={(e) => e.target.src = fallbackImage}
        />
        <h2 className="font-bold text-lg">{product?.name}</h2>
      </Link>
      <p className="text-sm text-gray-500 mb-2">{product?.description}</p>
      <p className="text-gray-600 mb-2 font-semibold text-md">₹{product?.price}</p>
      <button
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCards;
