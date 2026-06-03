import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/adminAuth";

function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (login(username, password)) {
        navigate("/admin");
      } else {
        setError("Invalid credentials");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#1D232A] flex items-center justify-center px-4">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF5858]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-4xl font-bold text-white tracking-tight">
            cap<span className="text-[#FF5858]">y</span>
          </span>
          <p className="text-[#6b7280] text-sm mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-[#25262A] border border-white/5 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-white text-xl font-semibold mb-6">Sign in</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[#9ca3af] text-sm mb-1.5 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                className="w-full bg-[#1D232A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#4b5563] focus:outline-none focus:border-[#FF5858]/60 transition-colors text-sm"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="text-[#9ca3af] text-sm mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1D232A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#4b5563] focus:outline-none focus:border-[#FF5858]/60 transition-colors text-sm"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-[#FF5858]/10 border border-[#FF5858]/20 rounded-xl px-4 py-3">
                <p className="text-[#FF5858] text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF5858] hover:bg-[#ff4040] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 font-medium transition-colors text-sm mt-2"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#374151] text-xs mt-6">
          This page is not publicly advertised
        </p>
      </div>
    </div>
  );
}

export default LoginAdmin;
