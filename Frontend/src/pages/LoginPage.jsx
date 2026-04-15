import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { loginUser } from "../services/authService.js";

export default function LoginPage() {
  const { setToken, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.target);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const data = await loginUser(payload);
      setToken(data.access_token);
      setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to login. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-[2rem] border border-slate-800/80 bg-slate-900/90 p-10 shadow-glow">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
            NGO Impact Optimizer
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Sign in to your account
          </h1>
          <p className="mt-2 text-slate-400">
            Access program analytics, resource recommendations, and impact
            dashboards.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && (
            <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          )}
          <label className="space-y-2 text-sm text-slate-300">
            <span>Email</span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Password</span>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-sm text-slate-400">
          New here?{" "}
          <Link
            to="/signup"
            className="text-emerald-300 hover:text-emerald-200"
          >
            Create an account
          </Link>
          <span className="mx-1">or</span>
          <Link
            to="/survey-form"
            className="text-emerald-300 hover:text-emerald-200"
          >
            submit a public survey
          </Link>
          without logging in.
        </p>
      </div>
    </div>
  );
}
