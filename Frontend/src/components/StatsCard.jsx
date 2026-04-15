export default function StatsCard({
  title,
  value,
  icon,
  description,
  compact = false,
}) {
  return (
    <div
      className={`rounded-3xl border border-slate-800/90 bg-slate-900/90 shadow-glow ${
        compact ? "p-4" : "p-6"
      }`}
    >
      <div
        className={`flex items-center justify-between ${compact ? "gap-2" : "gap-4"}`}
      >
        <div>
          <p
            className={`uppercase tracking-[0.24em] text-slate-500 ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            {title}
          </p>
          <p
            className={`font-semibold text-slate-100 ${
              compact ? "mt-2 text-3xl" : "mt-4 text-4xl"
            }`}
          >
            {value}
          </p>
        </div>
        <div
          className={`rounded-2xl bg-emerald-500/10 text-emerald-300 ${
            compact ? "p-2 text-lg" : "p-3"
          }`}
        >
          {icon}
        </div>
      </div>
      {description && (
        <p
          className={`text-slate-400 ${
            compact ? "mt-3 text-xs leading-5" : "mt-4 text-sm leading-6"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
