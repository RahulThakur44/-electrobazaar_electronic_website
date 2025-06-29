import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

function ProductList({ cartIconRef }) {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [ratings, setRatings] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const imgRefs = useRef([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://electrobazaar-backend-5.onrender.com/api/products");
        setProducts(res.data.products);
        imgRefs.current = res.data.products.map(() => React.createRef());
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedRatings = localStorage.getItem('productRatings');
    if (storedRatings) setRatings(JSON.parse(storedRatings));
  }, []);

  useEffect(() => {
    localStorage.setItem('productRatings', JSON.stringify(ratings));
  }, [ratings]);

  const handleRating = (productId, value) => {
    setRatings((prev) => ({ ...prev, [productId]: value }));
    toast.success(`⭐ You rated ${value} star(s)`, { autoClose: 1500 });
  };

  const flyToCart = (index) => {
    const img = imgRefs.current[index]?.current;
    const cart = cartIconRef?.current;
    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();
    const flyImg = img.cloneNode(true);

    Object.assign(flyImg.style, {
      position: 'fixed',
      top: `${imgRect.top}px`,
      left: `${imgRect.left}px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
      transition: 'all 0.8s ease-in-out',
      zIndex: 9999,
    });

    document.body.appendChild(flyImg);

    requestAnimationFrame(() => {
      flyImg.style.top = `${cartRect.top}px`;
      flyImg.style.left = `${cartRect.left}px`;
      flyImg.style.width = '0px';
      flyImg.style.height = '0px';
      flyImg.style.opacity = 0;
    });

    setTimeout(() => document.body.removeChild(flyImg), 1000);
  };

  const handleAddToCart = (product, index) => {
    const inCart = cartItems.find((item) => item.id === product.id);
    if (inCart) {
      toast.warning('❗ Already in cart', { autoClose: 1500 });
    } else {
      addToCart(product);
      toast.success('✅ Added to cart', { autoClose: 1500 });
      flyToCart(index);
    }
  };

  const handleWishlist = (product) => {
    const inWishlist = wishlistItems.find((item) => item.id === product.id);
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('💔 Removed from wishlist', { autoClose: 1500 });
    } else {
      addToWishlist(product);
      toast.success('❤️ Added to wishlist', { autoClose: 1500 });
    }
  };

  const sortProducts = (data) => {
    switch (sortType) {
      case 'priceLowHigh':
        return [...data].sort((a, b) => a.price - b.price);
      case 'priceHighLow':
        return [...data].sort((a, b) => b.price - a.price);
      case 'ratingHighLow':
        return [...data].sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0));
      case 'nameAZ':
        return [...data].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return data;
    }
  };

  const filteredProducts = sortProducts(
    searchTerm
      ? products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : products
  );

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-4 px-6 pt-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full sm:w-64 mb-2 sm:mb-0"
        />
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="p-2 border rounded w-full sm:w-48"
        >
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="ratingHighLow">Rating: High to Low</option>
          <option value="nameAZ">Name: A-Z</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-300 animate-pulse rounded h-80"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          {filteredProducts.map((product, index) => {
            const isInWishlist = wishlistItems.some((item) => item.id === product.id);
            const isInCart = cartItems.find((item) => item.id === product.id);
            const userRating = ratings[product.id] || 0;

            return (
              <div
                key={product.id}
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <button
                  onClick={() => handleWishlist(product)}
                  className="absolute top-2 right-2 text-xl z-10"
                >
                  <FaHeart className={isInWishlist ? 'text-red-600' : 'text-gray-400'} />
                </button>

                <div onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer">
                  <img
                    ref={imgRefs.current[index]}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-contain mb-4 rounded-lg transition hover:scale-110"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{product.name}</h3>

                  {product.discount && (
                    <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mt-1">
                      {product.discount}% OFF
                    </span>
                  )}

                  <p className="text-gray-600 dark:text-gray-300 mt-2">{product.description}</p>

                  <div className="flex mt-2 space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRating(product.id, star);
                        }}
                        className={`cursor-pointer text-xl ${userRating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                      />
                    ))}
                  </div>

                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-2">
                    ₹{product.price}
                  </p>
                </div>

                {isInCart ? (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-4 py-2 rounded mt-4 cursor-not-allowed opacity-70 w-full"
                  >
                    In Cart
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product, index)}
                    className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded mt-4 flex items-center justify-center gap-2 transition transform duration-300 hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-1.4 5m0 0A1 1 0 007 20h10a1 1 0 001-1l-1.4-5M5.6 18L7 13m0 0h10" />
                    </svg>
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductList;
