// components/WishlistButton.js
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';

const WishlistButton = ({ product }) => {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const handleClick = () => {
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <button onClick={handleClick} className="text-red-500 hover:text-red-700 transition">
      <FaHeart className={isWishlisted ? 'fill-current' : 'stroke-current'} />
    </button>
  );
};

export default WishlistButton;
