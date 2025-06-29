import React, { useRef } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const featuredProducts = [
  {
    id: 1,
    name: 'Samsung Galaxy S24 Ultra',
    description: 'A powerful phone with a great camera.',
    image: 'https://rukminim2.flixcart.com/image/850/1250/xif0q/mobile/w/5/h/-original-imahyvnuta2aadbw.jpeg?q=90&crop=false',
    price: 29999,
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    description: 'High-quality sound and comfort.',
    image: 'https://m.media-amazon.com/images/I/61XuLr92V3L._UF1000,1000_QL80_.jpg',
    price: 4999,
  },
  {
    id: 3,
    name: 'Gaming Laptop',
    description: 'High performance for serious gaming.',
    image: 'https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/B/9/B90KQPA-1_T1741316146.png',
    price: 84999,
  },
  {
    id: 4,
    name: 'Smart Watch',
    description: 'Track your fitness and notifications.',
    image: 'https://g.sdlcdn.com/imgs/k/0/v/VENKAT-ZONE-IPS-BT-Calling-SDL379884977-1-a6b69.jpg',
    price: 6999,
  },
];

const FeaturedProducts = ({ cartIconRef }) => {
  const { cartItems, addToCart } = useCart();

  // ✅ Setup ref array
  const imgRefs = useRef([]);

  // Initialize refs once
  if (imgRefs.current.length !== featuredProducts.length) {
    imgRefs.current = Array(featuredProducts.length)
      .fill()
      .map((_, i) => imgRefs.current[i] || React.createRef());
  }

  const flyToCart = (index) => {
    const img = imgRefs.current[index]?.current;
    const cart = cartIconRef?.current;
    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const flyImg = img.cloneNode(true);
    flyImg.style.position = 'fixed';
    flyImg.style.top = `${imgRect.top}px`;
    flyImg.style.left = `${imgRect.left}px`;
    flyImg.style.width = `${imgRect.width}px`;
    flyImg.style.height = `${imgRect.height}px`;
    flyImg.style.transition = 'all 0.8s ease-in-out';
    flyImg.style.zIndex = 9999;

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
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      toast.info('Already in cart');
    } else {
      addToCart({ ...product, qty: 1 });
      toast.success('✅ Added to cart!');
      flyToCart(index);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">✨ Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, index) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <img
              ref={imgRefs.current[index]}
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="mt-2 font-bold text-black">₹{product.price}</p>

            <button
              onClick={() => handleAddToCart(product, index)}
              className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
