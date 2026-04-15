import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import StatsCard from "../components/StatsCard.jsx";
import {
  ImpactBarChart,
  BudgetPieChart,
  TrendLineChart,
} from "../components/ChartGrid.jsx";
import {
  fetchAnalytics,
  fetchRecommendations,
} from "../services/analyticsService.js";
import { fetchSurveyStats } from "../services/surveyService.js";
import { fetchPrograms } from "../services/programService.js";

export default function AnalyticsPage() {
  const { user, logout } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [surveyStats, setSurveyStats] = useState(null);
  const [surveyError, setSurveyError] = useState("");
  const [programImpactData, setProgramImpactData] = useState([]);

  useEffect(() => {
    fetchAnalytics().then(setAnalytics).catch(console.error);
    fetchRecommendations().then(setRecommendations).catch(console.error);
    fetchPrograms({})
      .then((programs) => {
        const chartData = (programs || [])
          .slice(0, 12)
          .reverse()
          .map((program) => ({
            name: program.name,
            impact_score:
              program.adjusted_impact_score ?? program.impact_score ?? 0,
          }));
        setProgramImpactData(chartData);
      })
      .catch(console.error);
    fetchSurveyStats()
      .then(setSurveyStats)
      .catch((err) => {
        setSurveyError(
          err.response?.data?.error || "Unable to load survey stats.",
        );
      });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[280px_1fr]">
        <Sidebar user={user} onLogout={logout} />
        <main className="space-y-6">
          <section className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-glow">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                  Analytics
                </p>
                <h1 className="mt-3 text-3xl font-semibold text-white">
                  Program performance insights
                </h1>
                <p className="mt-2 text-slate-400">
                  View budget distribution, impact trends, and optimization
                  recommendations.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-4">
            <StatsCard
              title="Total Programs"
              value={analytics?.summary?.total_programs ?? "-"}
              icon={<span>📊</span>}
              compact
            />
            <StatsCard
              title="Total Beneficiaries"
              value={analytics?.summary?.total_beneficiaries ?? "-"}
              icon={<span>🌍</span>}
              compact
            />
            <StatsCard
              title="Avg. Impact"
              value={analytics?.summary?.average_impact_score ?? "-"}
              icon={<span>💡</span>}
              compact
            />
            <StatsCard
              title="Survey Adjusted"
              value={analytics?.summary?.average_adjusted_impact_score ?? "-"}
              icon={<span>🔧</span>}
              compact
            />
          </section>
          <section className="grid gap-4 lg:grid-cols-3">
            <StatsCard
              title="Total Surveys"
              value={surveyStats?.summary?.total_surveys ?? "-"}
              icon={<span>📝</span>}
              compact
            />
            <StatsCard
              title="Adjustment factor"
              value={analytics?.summary?.survey_adjustment_factor ?? "1.0"}
              icon={<span>⚖️</span>}
              compact
            />
            <StatsCard
              title="Positive surveys"
              value={Object.values(surveyStats?.summary?.counts || {})
                .slice(0, 3)
                .reduce((sum, v) => sum + v, 0)}
              icon={<span>👍</span>}
              compact
            />
          </section>

          {surveyError && (
            <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
              {surveyError}
            </div>
          )}

          <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <ImpactBarChart
              data={
                programImpactData.length > 0
                  ? programImpactData
                  : (analytics?.trend_data?.map((item) => ({
                      name: item.month,
                      impact_score: item.averageImpact,
                    })) ?? [])
              }
            />
            <BudgetPieChart data={analytics?.region_distribution ?? []} />
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <TrendLineChart data={analytics?.trend_data ?? []} />
            <div className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-glow">
              <h2 className="text-xl font-semibold text-white">
                Funding Recommendations
              </h2>
              <p className="mt-2 text-slate-400">
                Programs with top impact and cost-efficiency rank highest for
                future funding.
              </p>
              <div className="mt-5 space-y-4">
                {(recommendations?.top_by_impact ?? []).map((program) => (
                  <div
                    key={program._id}
                    className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4"
                  >
                    <p className="font-semibold text-slate-100">
                      {program.name}
                    </p>
                    <p className="text-sm text-slate-400">
                      Impact: {program.impact_score} · Cost per beneficiary:{" "}
                      {program.cost_per_beneficiary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-glow">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Survey sentiment overview
                </h2>
                <p className="mt-2 text-slate-400">
                  This view now includes survey feedback from the public form so
                  the NGO can see how people feel.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {Object.entries(
                  surveyStats?.summary?.counts || {
                    Excellent: 0,
                    Good: 0,
                    Better: 0,
                    Neutral: 0,
                    Bad: 0,
                    Poor: 0,
                  },
                ).map(([label, count]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-center"
                  >
                    <p className="text-sm text-slate-400">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {count}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
