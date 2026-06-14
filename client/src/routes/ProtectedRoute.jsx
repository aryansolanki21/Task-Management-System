import { Navigate } from "react-router-dom";

import Loader from "../components/Loader/Loader";

import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Wait until user authentication is checked
  if (loading) {
    return <Loader />;
  }

  // Allow access only for logged in users
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
