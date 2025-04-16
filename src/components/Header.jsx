import { useAuth } from "../context/AuthContext";
import useUserProfile from "../hooks/useUserProfile";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const { profile, loading } = useUserProfile();

  return (
    <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-5 px-6 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-wide">
        <Link to={"/"}>📝 Taskly</Link>
      </h1>

      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-purple-700 px-4 py-2 rounded-xl shadow-lg border border-purple-200">
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
            ) : profile && profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle size={32} className="text-purple-500" />
            )}

            <div className="text-sm leading-tight">
              <p className="font-semibold">{profile?.name || user.name}</p>
              <p className="text-xs">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="bg-white text-red-600 font-semibold px-4 py-1.5 rounded-xl hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
