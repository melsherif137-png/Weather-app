import { useAuth } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // يمسح المستخدم
    navigate("/login"); // يرجع لصفحة الدخول
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-xl bg-red-500/80 text-white hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
