// src/main.jsx (or src/index.jsx)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext"; // ✅ Make sure this path is correct
import "./index.css"; // ✅ Ensure this file exists and is correctly linked

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* ✅ This must wrap App */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
