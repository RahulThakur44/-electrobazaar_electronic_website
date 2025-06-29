import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: "Mobiles", img: "https://i5.walmartimages.com/seo/AT-T-iPhone-16-256GB-Teal-Apple-Intelligence_1fb37735-2473-41fb-912e-936a95049c30.85758052dd5630da9c43357e8bf748ae.jpeg" },
  { name: "Laptops", img: "https://laptopmedia.com/wp-content/uploads/2022/10/c08280389.jpg" },
  { name: "Headphones", img: "https://th.bing.com/th/id/OIP.RZjRvaO9IfDAwpD20I7e5wHaHa?rs=1&pid=ImgDetMain" },
  { name: "Smartwatches", img: "https://www.bhphotovideo.com/images/images2500x2500/apple_mj362ll_a_apple_watch_38mm_smartwatch_1293065.jpg" },
  { name: "Accessories", img: "https://th.bing.com/th/id/OIP.s2-_pPEFBqVdrkxTstQc-AHaDj?rs=1&pid=ImgDetMain" }
];

const ProductCategories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(cat.name)}
            className="cursor-pointer flex flex-col items-center hover:scale-105 transition"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
            <p className="mt-2 font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
