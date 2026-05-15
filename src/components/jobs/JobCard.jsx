import { MapPin, Wallet, Clock, Users } from "lucide-react";
import { formatBudget, formatRelativeDate } from "@/lib/format";

export default function JobCard({ job, onOpen }) {
  return (
    <article
      onClick={() => onOpen(job)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(job);
        }
      }}
      role="button"
      tabIndex={0}
      className="group flex cursor-pointer flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 group-hover:text-indigo-700">
            {job.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{job.company}</p>
        </div>
        <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          {job.category}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-slate-400" />
          <span className="font-semibold text-slate-900">{formatBudget(job.budget)}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-400" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-400" />
          <span>{formatRelativeDate(job.postedAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-slate-400" />
          <span>{job.proposals} proposals</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {job.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="rounded-md px-2 py-1 text-xs font-medium text-slate-500">
            +{job.skills.length - 3}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-500">Click to view details</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(job);
          }}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Apply
        </button>
      </div>
    </article>
  );
}
