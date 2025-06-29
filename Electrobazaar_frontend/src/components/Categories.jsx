import React from "react";
const categories = [
    { name: "Mobiles", icon: "📱" },
    { name: "Laptops", icon: "💻" },
    { name: "Headphones", icon: "🎧" },
    { name: "Smartwatches", icon: "⌚" },
  ];
  
  const Categories = () => {
    return (
      <section className="py-10 bg-white">
        <h3 className="text-2xl font-bold text-center mb-6">Categories</h3>
        <div className="flex justify-center gap-8 flex-wrap">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-full w-28 h-28 justify-center"
            >
              <span className="text-3xl">{cat.icon}</span>
              <p className="mt-2 text-sm">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Categories;
  