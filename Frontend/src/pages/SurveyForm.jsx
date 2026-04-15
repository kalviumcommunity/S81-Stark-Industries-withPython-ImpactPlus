import { useState } from "react";
import { submitSurvey } from "../services/surveyService.js";

export default function SurveyForm() {
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await submitSurvey(feedback);
      setSuccess("Thank you! Your survey has been submitted.");
      setFeedback("");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to submit feedback. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-800/80 bg-slate-900/90 p-10 shadow-glow">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
            Public Survey
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Tell us how it went
          </h1>
          <p className="mt-2 text-slate-400">
            No login required. Just type a few words about your experience and
            we will classify it behind the scenes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <label className="space-y-3 text-sm text-slate-300">
            <span>How was your experience?</span>
            <textarea
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              rows={6}
              required
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400"
              placeholder="Write a few words about what you liked or didn't like."
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit feedback"}
          </button>
        </form>

        {error && (
          <div className="mt-6 rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
