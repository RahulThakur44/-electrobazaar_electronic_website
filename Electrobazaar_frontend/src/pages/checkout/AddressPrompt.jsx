import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AddressPrompt() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    if (user?.id) {
      const data = localStorage.getItem(`address_${user.id}`);
      if (data) {
        setSaved(JSON.parse(data));
      } else {
        navigate('/checkout/step2/new');
      }
    }
  }, [user, navigate]);

  const handleUseOld = () => {
    navigate('/checkout/step3');
  };

  const handleNew = () => {
    navigate('/checkout/step2/new');
  };

  if (!saved) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
      <div className="bg-gray-100 p-4 rounded shadow">
        <p><strong>Name:</strong> {saved.name}</p>
        <p><strong>Contact:</strong> {saved.contact}</p>
        <p><strong>Address:</strong> {saved.address}</p>
        <p><strong>Area:</strong> {saved.area}</p>
        <div className="mt-4 flex gap-4">
          <button onClick={handleUseOld} className="bg-green-600 text-white px-4 py-2 rounded">
            Use This Address
          </button>
          <button onClick={handleNew} className="bg-blue-500 text-white px-4 py-2 rounded">
            Enter New Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressPrompt;
