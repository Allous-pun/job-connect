// src/components/jobs/JobCard.jsx
import { MapPin, Wallet, Calendar, Briefcase } from "lucide-react";
import { formatBudget } from "@/lib/format";

export default function JobCard({ job, onOpen }) {
  // WHY: Show preview of job to help users decide before opening full modal
  const daysAgo = Math.ceil((new Date() - new Date(job.postedAt)) / (1000 * 60 * 60 * 24));
  
  return (
    <article className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md" onClick={() => onOpen(job)}>
      <header className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">{job.title}</h3>
          <p className="text-sm text-slate-500">{job.company}</p>
        </div>
        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
          {job.category}
        </span>
      </header>
      
      <section className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
        <div className="flex items-center gap-1">
          <Wallet className="h-3.5 w-3.5" />
          {formatBudget(job.budget)}
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {job.location}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <time dateTime={job.postedAt}>{daysAgo} days ago</time>
        </div>
      </section>
      
      <footer className="mt-3 flex flex-wrap gap-1.5">
        {job.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="text-xs text-slate-400">+{job.skills.length - 3}</span>
        )}
      </footer>
    </article>
  );
}