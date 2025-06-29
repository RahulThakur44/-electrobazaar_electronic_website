// components/Wishlist.js
import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist 💖</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">No items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white shadow p-4 rounded-lg">
              <img src={item.image} alt={item.name} className="h-40 w-full object-contain mb-2" />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600 mb-2">₹{item.price}</p>
              <div className="flex justify-between items-center">
                <Link to={`/product/${item.id}`} className="text-blue-600 hover:underline text-sm">View Product</Link>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
