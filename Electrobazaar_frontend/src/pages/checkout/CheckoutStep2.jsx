import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const CheckoutStep2 = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    area: '',
    is_default: false,
  });

  // ✅ Fetch user addresses
  useEffect(() => {
    if (!user?.id) return;

    axios
      .get(`https://electrobazaar-backend-5.onrender.com/api/address/${user.id}`)
      .then((res) => {
        const addrList = res.data.addresses || [];
        setAddresses(addrList);

        const defaultAddr = addrList.find(a => a.is_default);
        if (defaultAddr) {
          setSelectedId(defaultAddr.id);
        } else if (addrList.length > 0) {
          setSelectedId(addrList[0].id); // fallback
        }
      })
      .catch((err) => {
        console.error('Failed to load addresses:', err);
      });
  }, [user]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Save new address
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.address) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await axios.post(`https://electrobazaar-backend-5.onrender.com/api/address`, {
        user_id: user.id,
        ...form,
        is_default: true
      });

      setForm({ name: '', contact: '', address: '', area: '', is_default: false });
      setShowForm(false);
      window.location.reload(); // fetch latest addresses
    } catch (error) {
      console.error('Failed to save address:', error);
      alert('Error saving address.');
    }
  };

  // ✅ Use selected address and go to payment
  const handleContinue = () => {
    if (!selectedId) {
      alert("Please select an address to continue.");
      return;
    }

    const selectedAddress = addresses.find(addr => addr.id === selectedId);
    if (!selectedAddress) {
      alert("Selected address not found.");
      return;
    }

    // Store address in localStorage
    localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));

    navigate('/checkout/step3');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select Delivery Address</h2>

      {/* Existing Addresses */}
      {addresses.length > 0 && (
        <div className="space-y-4 mb-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border p-4 rounded cursor-pointer ${
                selectedId === addr.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => setSelectedId(addr.id)}
            >
              <p><strong>Name:</strong> {addr.name}</p>
              <p><strong>Contact:</strong> {addr.contact}</p>
              <p><strong>Address:</strong> {addr.address}</p>
              {addr.area && <p><strong>Area:</strong> {addr.area}</p>}
              {addr.is_default && (
                <span className="text-green-600 text-sm">Default</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Add New Address'}
        </button>

        <button
          onClick={handleContinue}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Continue to Payment
        </button>
      </div>

      {/* Add Address Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border w-full p-2"
            placeholder="Full Name"
            required
          />
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="border w-full p-2"
            placeholder="Contact Number"
            required
          />
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="border w-full p-2"
            placeholder="Full Address"
            required
          />
          <input
            name="area"
            value={form.area}
            onChange={handleChange}
            className="border w-full p-2"
            placeholder="Area (optional)"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save Address
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutStep2;
