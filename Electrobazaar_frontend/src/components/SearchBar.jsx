import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://electrobazaar-backend-5.onrender.com/api/products'); // ✅ Your real API
        setAllProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length === 0) {
      setSuggestions([]);
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (product) => {
    setQuery(product.name);
    setSuggestions([]);
    onSelect && onSelect(product); // Optional: send product back to parent
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 shadow-md mt-1 rounded max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSuggestionClick(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
