import { useState } from "react";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";

import API from "../services/api";

import useTheme from "../hooks/useTheme";

const ChangePassword = () => {
  // Password form state
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const { darkMode } = useTheme();

  // Update input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Change password request
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password confirmation
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      setLoading(true);

      const response = await API.put("/auth/change-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success(response.data.message);

      setTimeout(() => {
        window.location.href = "/profile";
      }, 1500);

      // Reset form after success
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        min-h-screen
        flex
        justify-center
        items-center
        p-6
        ${darkMode ? "bg-slate-900" : "bg-gray-100"}
      `}
    >
      <div
        className={`
          w-full
          max-w-lg
          p-8
          rounded-2xl
          shadow-xl
          ${darkMode ? "bg-slate-800 text-white" : "bg-white"}
        `}
      >
        <Link
          to="/profile"
          className={`text-sm font-medium hover:underline ${
            darkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          ← Back to Profile
        </Link>
        <h1 className="text-3xl font-bold mb-6">Change Password</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            className={`
              w-full
              p-3
              rounded-lg
              mb-4
              border
              ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-gray-300"
              }
            `}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className={`
              w-full
              p-3
              rounded-lg
              mb-4
              border
              ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-gray-300"
              }
            `}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`
              w-full
              p-3
              rounded-lg
              mb-4
              border
              ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-gray-300"
              }
            `}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
