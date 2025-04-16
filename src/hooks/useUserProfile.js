import { useEffect, useState } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { useAuth } from "../context/AuthContext";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS;

const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      if (!user) return;

      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
      );
      const userDoc = response.documents.find(
        (doc) => doc.email === user.email
      );
      if (userDoc) setProfile(userDoc);
    } catch (err) {
      console.error("❌ Failed to fetch user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return { profile, loading };
};

export default useUserProfile;
