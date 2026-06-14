import { useEffect, useState } from "react";

import API from "../services/api";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  // Store JWT token from localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Logged in user details
  const [user, setUser] = useState(null);

  // Track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );

  // Prevent rendering before auth check completes
  const [loading, setLoading] = useState(true);

  // Save token after successful login
  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);

    setToken(jwtToken);

    setIsAuthenticated(true);
  };

  // Clear user session
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);

    setUser(null);

    setIsAuthenticated(false);
  };

  // Get logged in user information
  const fetchCurrentUser = async () => {
    try {
      const response = await API.get("/auth/me");

      setUser(response.data.user);

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Fetch user failed:", error);

      logout();
    } finally {
      setLoading(false);
    }
  };

  // Update user data after profile edit
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // Restore user session on page refresh
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        await fetchCurrentUser();
      } else {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [token]);

  return (
    // Share auth data across the app
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
