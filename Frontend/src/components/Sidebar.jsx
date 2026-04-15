import { NavLink } from "react-router-dom";

export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="w-full md:w-72 shrink-0 bg-slate-950/90 border-r border-slate-800 p-5 shadow-glow">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-emerald-400">
          NGO Impact Optimizer
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Review programs, optimize resources, and monitor impact.
        </p>
      </div>
      <div className="space-y-3">
        {["/", "/programs", "/analytics", "/surveys"].map((path) => {
          const name =
            path === "/"
              ? "Dashboard"
              : path
                  .slice(1)
                  .replace("-", " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase());
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-200"
                    : "text-slate-300 hover:bg-slate-800/80"
                }`
              }
            >
              {name}
            </NavLink>
          );
        })}
      </div>
      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
          Signed in as
        </p>
        <p className="mt-3 font-semibold text-slate-100">
          {user?.name || "Guest"}
        </p>
        <p className="text-sm text-slate-400">{user?.role || "NGO Staff"}</p>
        <button
          type="button"
          onClick={onLogout}
          className="mt-4 w-full rounded-2xl bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/25"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
