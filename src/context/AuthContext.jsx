// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // ✅ Replace with your actual project ID

const account = new Account(client);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (err) {
      if (err.code === 401) {
        // Not logged in — don't treat this as a crash
        console.warn("⚠️ No active session");
        setUser(null);
      } else {
        console.error("❌ Error checking session:", err);
      }
    } finally {
      setLoading(false); // ✅ make sure this always runs
    }
  };

  const login = async (email, password) => {
    await account.createEmailPasswordSession(email, password);
    await getUser();
  };

  const register = async (email, password, name) => {
    try {
      // ✅ Create account
      await account.create(ID.unique(), email, password, name);

      // ✅ Auto-login after registration
      await account.createEmailPasswordSession(email, password);

      // ✅ Fetch user info
      await getUser();
    } catch (err) {
      console.error("❌ Registration error:", err);
      throw err; // send error to form page
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  useEffect(() => {
    getUser(); // Check session on app start
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
