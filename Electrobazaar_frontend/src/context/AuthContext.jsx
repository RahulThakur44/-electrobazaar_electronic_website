import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(); // ✅ Properly exported for direct access

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error('JWT Decode Error:', error);
      logoutUser();
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        logoutUser();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to consume auth anywhere
export const useAuth = () => useContext(AuthContext);
