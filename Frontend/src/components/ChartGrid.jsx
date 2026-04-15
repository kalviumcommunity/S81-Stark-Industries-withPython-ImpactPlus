import {
  PieChart,
  Pie,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export function ImpactBarChart({ data }) {
  return (
    <div className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-5 shadow-glow">
      <h3 className="mb-4 text-lg font-semibold text-slate-100">
        Impact per Program
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
            }}
            labelStyle={{ color: "#cbd5e1" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="impact_score"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4, fill: "#34d399" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BudgetPieChart({ data }) {
  return (
    <div className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-5 shadow-glow">
      <h3 className="mb-4 text-lg font-semibold text-slate-100">
        Budget Distribution
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#34d399"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendLineChart({ data }) {
  return (
    <div className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-5 shadow-glow">
      <h3 className="mb-4 text-lg font-semibold text-slate-100">
        Impact Trend
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="averageImpact"
            stroke="#34d399"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="budget"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
