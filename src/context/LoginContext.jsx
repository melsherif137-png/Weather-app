import { createContext, useState, useContext } from "react";

const AuthContext = createContext();
import { useNavigate } from "react-router-dom";
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // States
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);

  const [name, setName] = useState("");

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });
  //   buttom silder
  const handleClick = () => {
    if (currentUser) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  // Validation
  const validatePassword = (value) => {
    const isValid = /^.{8,}$/.test(value);

    setPasswordValid(isValid);
    return isValid;
  };

  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    setEmailValid(isValid);
    return isValid;
  };

  // SIGN UP
  const signUp = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = users.find((u) => u.email === email);

    if (exists) {
      return { success: false, message: "Email already exists" };
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  };

  // LOGIN
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);

    return { success: true, user };
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const updateCurrentUser = (updatedData) => {
    const updated = { ...currentUser, ...updatedData };

    localStorage.setItem("currentUser", JSON.stringify(updated));
    setCurrentUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        password,
        setPassword,
        passwordValid,
        validatePassword,

        email,
        setEmail,
        emailValid,
        validateEmail,

        name,
        setName,
        setCurrentUser,
        signUp,
        login,
        logout,
        handleClick,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
