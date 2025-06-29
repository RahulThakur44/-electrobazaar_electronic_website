import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
//import ProductCards from '../components/ProductCards';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredList = products.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setFiltered(filteredList);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">All Products</h2>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search products..."
        className="border px-4 py-2 mb-6 w-full md:w-1/2 rounded"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">No products found</p>
          ) : (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
