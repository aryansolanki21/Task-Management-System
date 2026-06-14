import { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

import API from "../services/api";

import Loader from "../components/Loader/Loader";

const Profile = () => {
  const { user, loading, updateUser } = useAuth();
  const { darkMode } = useTheme();

  // Store updated name value
  const [name, setName] = useState(user?.name || "");

  // Loading state while profile is saving
  const [saving, setSaving] = useState(false);

  if (loading) {
    return <Loader />;
  }

  // Update profile information
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Send updated name to server
      const response = await API.put("/auth/profile", {
        name,
      });

      // Update user data in context
      updateUser(response.data.user);

      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile Update Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-8 ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <div
          className={`
            rounded-2xl
            shadow-xl
            p-8
            border
            ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}
          `}
        >
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          {/* User basic information */}
          <div className="mb-8">
            <div className="flex items-center gap-4">
              {/* Profile avatar using first letter of username */}
              <div
                className="
                  w-20 h-20
                  rounded-full
                  bg-linear-to-r
                  from-blue-500
                  to-indigo-600
                  flex items-center justify-center
                  text-3xl font-bold text-white
                  shadow-lg
                "
              >
                {user?.name?.charAt(0)}
              </div>

              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>

                <p>{user?.email}</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                className={`
                  block mb-2 font-medium
                  ${darkMode ? "text-slate-300" : "text-gray-700"}
                `}
              >
                Name
              </label>

              {/* Editable name field */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full border p-3 rounded ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>

            <div className="mb-5">
              <label
                className={`
                  block mb-2 font-medium
                  ${darkMode ? "text-slate-300" : "text-gray-700"}
                `}
              >
                Email
              </label>

              {/* Email cannot be edited */}
              <input
                type="email"
                value={user?.email}
                disabled
                className={`w-full border p-3 rounded ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-gray-100 border-gray-300 text-black"
                }`}
              />
            </div>

            <div className="mb-6">
              <label
                className={`
                  block mb-2 font-medium
                  ${darkMode ? "text-slate-300" : "text-gray-700"}
                `}
              >
                Member Since
              </label>

              {/* Account creation date */}
              <input
                type="text"
                value={new Date(user?.createdAt).toLocaleDateString()}
                disabled
                className={`w-full border p-3 rounded ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-gray-100 border-gray-300 text-black"
                }`}
              />
            </div>

            <div className="flex gap-4">
              {/* Save profile changes */}
              <button
                type="submit"
                disabled={saving}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  text-white
                  px-6
                  py-3
                  rounded-lg
                "
              >
                {saving ? "Saving..." : "Update Profile"}
              </button>

              {/* Navigate to password change page */}
              <Link
                to="/change-password"
                className="
                  bg-red-500
                  hover:bg-red-600
                  transition
                  text-white
                  px-6
                  py-3
                  rounded-lg
                "
              >
                Change Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
