// src/pages/Register.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

import {
  storage,
  databases,
  account,
  ID,
  Permission,
  Role,
} from "../appwrite/appwriteConfig";

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID_AVATARS;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS;

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Register with Auth
      await register(form.email, form.password, form.name);

      // 2. Get logged-in user info
      const currentUser = await account.get();
      const userId = currentUser.$id;

      // 3. Upload avatar to Storage
      if (!avatar) throw new Error("Avatar is required.");
      const fileId = ID.unique();
      const uploadedFile = await storage.createFile(
        BUCKET_ID,
        fileId,
        avatar,
        [Permission.read(Role.any())] // 🔓 or use Role.user(userId) for private access
      );

      if (!uploadedFile?.$id) {
        throw new Error("Avatar upload failed.");
      }

      // 4. Get avatar preview URL
      const avatarUrlObj = storage.getFileView(BUCKET_ID, uploadedFile.$id);
      const avatarUrl = avatarUrlObj?.href || avatarUrlObj?.toString();

      if (!avatarUrl) throw new Error("Failed to generate avatar URL.");

      // 5. Create user profile doc in DB
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          name: form.name,
          email: form.email,
          avatar: avatarUrl || `https://ui-avatars.com/api/?name=${form.name}`,
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );

      // 6. Navigate to home

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-8 rounded-xl w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-purple-700">
            Register for Taskly
          </h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <input
            type="text"
            placeholder="Your name"
            required
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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

          {/* Avatar Upload */}
          <input
            type="file"
            accept="image/*"
            required
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleFileChange}
          />

          {preview && (
            <img
              src={preview}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold ${
              loading
                ? "bg-purple-300 text-white"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
