import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";

import Loader from "../components/Loader/Loader";

import API from "../services/api";

const Register = () => {
  // Redirect after successful registration
  const navigate = useNavigate();

  // Check if user is already logged in
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Prevent logged-in users from accessing register page
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  if (loading) {
    return <Loader />;
  }

  // Update input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit registration form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Create new user account
      const response = await API.post("/auth/register", formData);

      toast.success(response.data.message);

      // Redirect user to login page after registration
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
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
    bg-linear-to-br
    from-blue-600
    to-purple-700
  "
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          <input
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
