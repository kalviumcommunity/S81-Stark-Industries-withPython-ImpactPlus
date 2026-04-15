import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import StatsCard from "../components/StatsCard.jsx";
import { fetchAnalytics } from "../services/analyticsService.js";
import { fetchSurveyStats } from "../services/surveyService.js";

export default function DashboardPage() {
  const { user, logout } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);
  const [surveyStats, setSurveyStats] = useState(null);

  useEffect(() => {
    fetchAnalytics().then(setAnalytics).catch(console.error);
    fetchSurveyStats().then(setSurveyStats).catch(console.error);
  }, []);

  const surveyCounts = surveyStats?.summary?.counts || {
    Excellent: 0,
    Good: 0,
    Better: 0,
    Neutral: 0,
    Bad: 0,
    Poor: 0,
  };

  const positiveSurveyCount =
    surveyCounts.Excellent + surveyCounts.Good + surveyCounts.Better;
  const negativeSurveyCount = surveyCounts.Bad + surveyCounts.Poor;

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[280px_1fr]">
        <Sidebar user={user} onLogout={logout} />
        <main className="space-y-6">
          <section className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-glow">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                  Dashboard Overview
                </p>
                <h1 className="mt-3 text-3xl font-semibold text-white">
                  {user?.name || "NGO Staff"}, your impact snapshot
                </h1>
                <p className="mt-2 text-slate-400">
                  Review the most important program metrics without any charts.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-4">
            <StatsCard
              title="Total Programs"
              value={analytics?.summary?.total_programs ?? "-"}
              icon={<span>📊</span>}
            />
            <StatsCard
              title="Total Beneficiaries"
              value={analytics?.summary?.total_beneficiaries ?? "-"}
              icon={<span>🌍</span>}
            />
            <StatsCard
              title="Total Budget"
              value={
                analytics?.summary?.total_budget
                  ? `$${analytics.summary.total_budget.toLocaleString()}`
                  : "-"
              }
              icon={<span>💰</span>}
            />
            <StatsCard
              title="Avg. Impact"
              value={analytics?.summary?.average_impact_score ?? "-"}
              icon={<span>💡</span>}
            />
          </section>

          <section className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-glow">
            <h2 className="text-lg font-semibold text-white">
              Quick program health
            </h2>
            <p className="mt-3 text-slate-400">
              This page has been simplified to show only the core metrics you
              need at a glance.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-glow">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Survey pulse
                </h2>
                <p className="mt-2 text-slate-400">
                  Public feedback is now part of your daily snapshot.
                </p>
              </div>
              <p className="text-sm text-slate-400">
                Total surveys: {surveyStats?.summary?.total_surveys ?? 0}
              </p>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <StatsCard
                title="Positive"
                value={positiveSurveyCount}
                icon={<span>👍</span>}
                compact
              />
              <StatsCard
                title="Neutral"
                value={surveyCounts.Neutral}
                icon={<span>➖</span>}
                compact
              />
              <StatsCard
                title="Negative"
                value={negativeSurveyCount}
                icon={<span>⚠️</span>}
                compact
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
