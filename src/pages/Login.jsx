// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ Start loading

    try {
      await login(form.email, form.password);
      navigate("/");
      window.location.reload(); // ✅ Force refresh to re-trigger profile/avatar fetch
    } catch (err) {
      setError(err.message || "Failed to login.");
    } finally {
      setLoading(false); // ✅ Stop loading no matter what
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-8 rounded-xl w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-purple-700">
            Login to Taskly
          </h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold ${
              loading
                ? "bg-purple-300 text-white"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-purple-600 font-semibold hover:underline"
            >
              Register here
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
