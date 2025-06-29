import { useState, useEffect } from 'react';

const ProductImage = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    // Reset image source when prop changes
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc('/placeholder.jpg')}
    />
  );
};

export default ProductImage;