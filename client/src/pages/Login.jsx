import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../components/Loader/Loader";

import useAuth from "../hooks/useAuth";

import API from "../services/api";

const Login = () => {
  // Navigate user after successful login
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Loading state during API request
  const [loading, setLoading] = useState(false);

  // Prevent logged-in users from accessing login page
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  // Show loader while request is processing
  if (loading) {
    return <Loader />;
  }

  // Update form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation before API call.
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", formData);

      // Save JWT token in context and local storage
      login(response.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
    min-h-screen
    flex
    justify-center
    items-center
    bg-gradient-to-br
    from-blue-600
    to-purple-700
  "
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {" "}
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            required
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              py-3
              rounded-lg
              font-medium
            "
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
