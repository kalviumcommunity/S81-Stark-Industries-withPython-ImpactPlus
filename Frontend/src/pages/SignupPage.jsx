import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { signupUser } from "../services/authService.js";

export default function SignupPage() {
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
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    try {
      const data = await signupUser(payload);
      setToken(data.access_token);
      setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to register. Please check your input.",
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
            Create your organization account
          </h1>
          <p className="mt-2 text-slate-400">
            Register as Admin or NGO Staff to manage program data and access
            insights.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && (
            <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          )}
          <label className="space-y-2 text-sm text-slate-300">
            <span>Name</span>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400"
            />
          </label>
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
          <label className="space-y-2 text-sm text-slate-300">
            <span>Role</span>
            <select
              name="role"
              defaultValue="NGO Staff"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400"
            >
              <option value="NGO Staff">NGO Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-300 hover:text-emerald-200">
            Sign in
          </Link>
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Or{" "}
          <Link
            to="/survey-form"
            className="text-emerald-300 hover:text-emerald-200"
          >
            submit a public survey
          </Link>{" "}
          without login.
        </p>
      </div>
    </div>
  );
}
