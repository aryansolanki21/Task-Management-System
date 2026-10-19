import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      {/* Shared navigation across all pages. */}
      <Navbar />

      <Routes>
        {/* Public landing page. */}
        <Route path="/" element={<Home />} />

        {/* Authentication pages. */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Pages available only to authenticated users. */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown URLs to Home. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
