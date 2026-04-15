export default function FilterBar({
  filters,
  setFilters,
  categories,
  regions,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-slate-800/90 bg-slate-900/90 p-4 shadow-glow md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-3">
        <select
          value={filters.category || ""}
          onChange={(event) =>
            setFilters((prev) => ({ ...prev, category: event.target.value }))
          }
          className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-slate-900">
              {cat}
            </option>
          ))}
        </select>
        <select
          value={filters.region || ""}
          onChange={(event) =>
            setFilters((prev) => ({ ...prev, region: event.target.value }))
          }
          className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region} className="bg-slate-900">
              {region}
            </option>
          ))}
        </select>
      </div>
      <input
        placeholder="Search programs"
        value={filters.search || ""}
        onChange={(event) =>
          setFilters((prev) => ({ ...prev, search: event.target.value }))
        }
        className="min-w-[220px] rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400"
      />
    </div>
  );
}
