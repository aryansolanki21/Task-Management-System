import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Authentication context provider
import AuthProvider from "./context/AuthContextProvider";

// Theme context provider
import { ThemeProvider } from "./context/ThemeContext";

// Toast notifications
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
     {/* Wrap app with theme and auth providers */}
    <ThemeProvider>
      <AuthProvider>
        <App />
        {/*  Global toast configuration */}
        <ToastContainer
          theme="colored"
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
