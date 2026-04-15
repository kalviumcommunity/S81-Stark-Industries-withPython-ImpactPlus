import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import StatsCard from "../components/StatsCard.jsx";
import { fetchSurveyStats } from "../services/surveyService.js";

const surveyLabels = ["Excellent", "Good", "Better", "Neutral", "Bad", "Poor"];

export default function SurveysPage() {
  const { user, logout } = useContext(AuthContext);
  const [surveyData, setSurveyData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSurveyStats()
      .then(setSurveyData)
      .catch((err) => {
        setError(
          err.response?.data?.error ||
            "Unable to load survey stats. Please try again.",
        );
      });
  }, []);

  const counts = surveyData?.summary?.counts || {
    Excellent: 0,
    Good: 0,
    Better: 0,
    Neutral: 0,
    Bad: 0,
    Poor: 0,
  };

  const surveys = surveyData?.surveys || [];

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[280px_1fr]">
        <Sidebar user={user} onLogout={logout} />
        <main className="space-y-6">
          <section className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-glow">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                  Surveys
                </p>
                <h1 className="mt-3 text-3xl font-semibold text-white">
                  Survey results for NGO review
                </h1>
                <p className="mt-2 text-slate-400">
                  The survey text is sent to the backend, predicted there, and
                  shown here for NGO decision-making.
                </p>
              </div>
              <Link
                to="/survey-form"
                className="inline-flex items-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
              >
                Open Survey Form
              </Link>
            </div>
          </section>

          {error && (
            <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
              {error}
            </div>
          )}

          <section className="grid gap-4 lg:grid-cols-3">
            {surveyLabels.map((label) => (
              <StatsCard
                key={label}
                title={label}
                value={counts[label] ?? 0}
                icon={<span>📝</span>}
              />
            ))}
          </section>

          <section className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Submitted Surveys
                </h2>
                <p className="mt-3 text-slate-400">
                  These responses were classified on the backend and are
                  available for NGO review.
                </p>
              </div>
              <p className="text-sm text-slate-400">
                Total: {surveyData?.summary?.total_surveys ?? 0}
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {surveys.length > 0 ? (
                surveys.map((survey) => (
                  <div
                    key={survey.id}
                    className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold text-slate-100">Feedback</p>
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                        {survey.sentiment}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {survey.feedback}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5 text-slate-400">
                  No survey submissions yet.
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
