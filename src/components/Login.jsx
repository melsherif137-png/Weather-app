import { useState } from "react";
import { useAuth } from "../context/LoginContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogOut";
const Login = () => {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    emailValid,
    validateEmail,

    password,
    setPassword,
    passwordValid,
    validatePassword,
    currentUser,
    login,
  } = useAuth();

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const emailOk = validateEmail(email);
    const passOk = validatePassword(password);

    if (!emailOk || !passOk) {
      setMsg("Check your inputs");
      setMsgType("error");
      return;
    }

    setLoading(true);

    await new Promise((r) => setTimeout(r, 700));

    const result = login(email, password);

    setLoading(false);

    if (result.success) {
      setMsg("Welcome back!");
      setMsgType("success");
      navigate("/Home");
    } else {
      setMsg(result.message);
      setMsgType("error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const border = (valid) =>
    valid === null
      ? "border-white/20"
      : valid
        ? "border-green-400/60"
        : "border-red-400/60";

  return (
    <>
      {currentUser ? (
        <LogoutButton />
      ) : (
        <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
          {/* Card */}
          <div className="relative z-10 w-full max-w-md lg:max-w-lg lg:mb-20">
            <div
              className="rounded-3xl border border-white/10 p-8 md:p-10"
              style={{
                background: "rgba(15, 23, 42, 0.82)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              }}
            >
              {/* Header */}
              <div className="flex flex-col items-center mb-8">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-white/10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(99,102,241,0.20))",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ddd6fe"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  >
                    <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 13c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
                  </svg>
                </div>

                <h1 className="text-gray-100 text-3xl font-semibold tracking-tight">
                  Welcome back
                </h1>

                <p className="text-gray-400 text-sm mt-2">
                  Sign in to continue
                </p>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-gray-200 text-sm mb-2 tracking-[2px] font-medium">
                  EMAIL
                </label>

                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`w-full px-4 py-3 rounded-2xl text-sm text-white border outline-none
                placeholder:text-gray-400 transition-all duration-200
                focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/20
                ${border(emailValid)}`}
                    style={{
                      background: "rgba(255,255,255,0.09)",
                    }}
                  />

                  {emailValid === true && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-sm">
                      ✓
                    </span>
                  )}
                </div>

                {emailValid === false && (
                  <p className="text-red-400 text-sm font-medium mt-2">
                    Enter a valid email
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-gray-200 text-sm mb-2 tracking-[2px] font-medium">
                  PASSWORD
                </label>

                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`w-full px-4 py-3 pr-12 rounded-2xl text-sm text-white border outline-none
                placeholder:text-gray-400 transition-all duration-200
                focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/20
                ${border(passwordValid)}`}
                    style={{
                      background: "rgba(255,255,255,0.09)",
                    }}
                  />

                  {/* Toggle Password */}
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showPass ? (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {passwordValid === false && (
                  <p className="text-red-400 text-sm font-medium mt-2">
                    8 chars minimum
                  </p>
                )}
              </div>

              {/* Message */}
              {msg && (
                <div
                  className={`text-sm text-center px-4 py-3 rounded-2xl mb-5 border ${
                    msgType === "success"
                      ? "bg-green-500/10 text-green-300 border-green-500/30"
                      : "bg-red-500/10 text-red-300 border-red-500/30"
                  }`}
                >
                  {msg}
                </div>
              )}

              {/* Button */}
              <button
                onClick={handleSubmit}
                disabled={!emailValid || !passwordValid || loading}
                className="w-full py-3 rounded-2xl text-sm font-semibold
            transition-all duration-200 active:scale-[0.98]
            disabled:opacity-40 disabled:cursor-not-allowed
            flex items-center justify-center gap-2 text-white"
                style={{
                  background: loading
                    ? "rgba(139, 92, 246, 0.35)"
                    : "linear-gradient(135deg, #8b5cf6, #6366f1)",
                  boxShadow: "0 10px 30px rgba(139,92,246,0.35)",
                }}
              >
                {loading && (
                  <svg
                    className="animate-spin"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                )}

                {loading ? "Loging in..." : "Login in"}
              </button>

              {/* Footer */}
              <p className="text-center text-gray-400 text-sm mt-6">
                Don&apos;t have an account?{" "}
                <Link to={"/SignUp"}>
                  <span className="text-purple-300 hover:text-purple-200 cursor-pointer transition-colors font-medium">
                    sign Up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
