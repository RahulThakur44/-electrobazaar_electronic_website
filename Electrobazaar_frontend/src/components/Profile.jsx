import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      {error && <p className="text-red-600">{error}</p>}
      {profile ? (
        <div>
          <p><strong>User ID:</strong> {profile.userId}</p>
          <p><strong>Message:</strong> {profile.message}</p>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
