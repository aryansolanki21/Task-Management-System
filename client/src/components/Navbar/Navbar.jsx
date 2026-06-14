import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";

const Navbar = () => {
  // Get user and theme data
  const { user, isAuthenticated, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  // Handle logout
  const handleLogout = () => {
    setShowDropdown(false);

    toast.success("Logged out successfully");

    logout();

    navigate("/login");
  };

  return (
    <nav
      className={`sticky top-0 z-50 px-8 py-4 flex justify-between items-center shadow-md border-b ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
      }`}
    >
      {/* App logo */}
      <Link
        to={isAuthenticated ? "/dashboard" : "/login"}
        className="text-2xl font-bold text-blue-500"
      >
        📋 TaskFlow
      </Link>

      {/* Navbar for logged in users */}
      {isAuthenticated ? (
        <div className="flex items-center gap-5">
          {/* Theme switch button */}
          <button
            onClick={toggleTheme}
            className="bg-gray-700 px-3 py-2 rounded"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : darkMode
                  ? "text-slate-200"
                  : "text-gray-700"
            }
          >
            Dashboard
          </NavLink>

          {/* Notification section */}
          <NotificationDropdown />

          {/* User profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`
                flex items-center gap-3
                px-3 py-2 rounded-xl
                transition
                ${
                  darkMode
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <span
                className={`font-medium hidden md:block ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {user?.name}
              </span>
            </button>

            {/* Profile menu */}
            {showDropdown && (
              <div
                className={`
                  absolute right-0 mt-3 w-64
                  rounded-xl shadow-xl overflow-hidden z-50 border
                  ${
                    darkMode
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-white text-black border-gray-200"
                  }
                `}
              >
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold">{user?.name}</p>

                  <p
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    {user?.email}
                  </p>
                </div>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `block px-4 py-3 ${
                      darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
                    } ${isActive ? "text-blue-400 font-semibold" : ""}`
                  }
                  onClick={() => setShowDropdown(false)}
                >
                  My Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-3 ${
                    darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Guest user navigation
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className={`
      px-4 py-2 rounded-lg transition font-medium
      ${
        darkMode
          ? "text-slate-300 hover:bg-slate-700 hover:text-white"
          : "text-gray-700 hover:bg-gray-100"
      }
    `}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
      px-5 py-2 rounded-lg
      bg-blue-600 text-white
      hover:bg-blue-700
      transition font-medium
      shadow-md
    "
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
