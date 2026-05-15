import { useEffect, useRef, useState } from "react";
import { X, Star, MapPin, Wallet, Calendar, CheckCircle2 } from "lucide-react";
import { formatBudget } from "@/lib/format";

function StarRating({ value }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && hasHalf);
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              filled ? "fill-amber-400 text-amber-400" : "text-slate-300"
            }`}
          />
        );
      })}
      <span className="ml-1 text-sm font-medium text-slate-700">{value.toFixed(1)}</span>
    </div>
  );
}

export default function JobModal({ job, onClose }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState({
    coverLetter: "",
    proposedBudget: "",
    timelineDays: "",
    portfolioUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function validate() {
    const e = {};
    if (form.coverLetter.trim().length < 100) {
      e.coverLetter = `Cover letter must be at least 100 characters (currently ${form.coverLetter.trim().length}).`;
    }
    if (!form.proposedBudget || Number(form.proposedBudget) <= 0) {
      e.proposedBudget = "Please enter a valid budget.";
    }
    if (!form.timelineDays || Number(form.timelineDays) < 1) {
      e.timelineDays = "Timeline must be at least 1 day.";
    }
    if (form.portfolioUrl && !/^https?:\/\/\S+$/i.test(form.portfolioUrl.trim())) {
      e.portfolioUrl = "Enter a valid URL starting with http(s)://";
    }
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setSubmitted(true);
      setForm({ coverLetter: "", proposedBudget: "", timelineDays: "", portfolioUrl: "" });
    }
  }

  if (!job) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-modal-title"
    >
      <div
        ref={dialogRef}
        className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="sticky right-4 top-4 ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 shadow ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-900"
          style={{ float: "right" }}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-6 pb-8 pt-6 sm:px-10">
          <div className="mb-1 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            {job.category}
          </div>
          <h2 id="job-modal-title" className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            {job.title}
          </h2>
          <p className="mt-1 text-slate-600">{job.company}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-slate-400" />
              <span className="font-semibold text-slate-900">{formatBudget(job.budget)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" />
              {job.location}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              Deadline: {new Date(job.deadline).toLocaleDateString()}
            </div>
            <StarRating value={job.rating} />
          </div>

          <div className="mt-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-500">
              Description
            </h3>
            <p className="mt-2 leading-relaxed text-slate-700">{job.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-500">
              Skills
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                <h4 className="font-display text-xl font-semibold text-slate-900">
                  Proposal submitted!
                </h4>
                <p className="text-sm text-slate-600">
                  We've sent your proposal to {job.company}. They'll be in touch soon.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Submit another
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <h4 className="font-display text-lg font-semibold text-slate-900">
                  Submit a proposal
                </h4>

                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-slate-700">
                    Cover letter <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="coverLetter"
                    rows={5}
                    value={form.coverLetter}
                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    aria-invalid={!!errors.coverLetter}
                    aria-describedby={errors.coverLetter ? "coverLetter-err" : undefined}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Tell the employer why you're a great fit (min. 100 characters)..."
                  />
                  <div className="mt-1 flex justify-between">
                    {errors.coverLetter ? (
                      <p id="coverLetter-err" className="text-xs text-rose-600">
                        {errors.coverLetter}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-slate-400">{form.coverLetter.trim().length}/100</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="proposedBudget" className="block text-sm font-medium text-slate-700">
                      Proposed budget (Ksh) <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="proposedBudget"
                      type="number"
                      min="1"
                      value={form.proposedBudget}
                      onChange={(e) => setForm({ ...form, proposedBudget: e.target.value })}
                      aria-invalid={!!errors.proposedBudget}
                      aria-describedby={errors.proposedBudget ? "proposedBudget-err" : undefined}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      placeholder="e.g. 5000"
                    />
                    {errors.proposedBudget && (
                      <p id="proposedBudget-err" className="mt-1 text-xs text-rose-600">
                        {errors.proposedBudget}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="timelineDays" className="block text-sm font-medium text-slate-700">
                      Timeline (days) <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="timelineDays"
                      type="number"
                      min="1"
                      value={form.timelineDays}
                      onChange={(e) => setForm({ ...form, timelineDays: e.target.value })}
                      aria-invalid={!!errors.timelineDays}
                      aria-describedby={errors.timelineDays ? "timelineDays-err" : undefined}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      placeholder="e.g. 21"
                    />
                    {errors.timelineDays && (
                      <p id="timelineDays-err" className="mt-1 text-xs text-rose-600">
                        {errors.timelineDays}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="portfolioUrl" className="block text-sm font-medium text-slate-700">
                    Portfolio URL <span className="text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="portfolioUrl"
                    type="text"
                    value={form.portfolioUrl}
                    onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                    aria-invalid={!!errors.portfolioUrl}
                    aria-describedby={errors.portfolioUrl ? "portfolioUrl-err" : undefined}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="https://yourportfolio.com"
                  />
                  {errors.portfolioUrl && (
                    <p id="portfolioUrl-err" className="mt-1 text-xs text-rose-600">
                      {errors.portfolioUrl}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                  >
                    Submit proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
