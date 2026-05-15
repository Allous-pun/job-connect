export default function JobCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 animate-pulse rounded bg-slate-200" />
        ))}
      </div>
      <div className="flex gap-1.5">
        <div className="h-6 w-16 animate-pulse rounded-md bg-slate-200" />
        <div className="h-6 w-20 animate-pulse rounded-md bg-slate-200" />
        <div className="h-6 w-14 animate-pulse rounded-md bg-slate-200" />
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
        <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}
