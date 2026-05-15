import { useEffect, useMemo, useState } from "react";
import { Search, AlertTriangle, RefreshCw, SlidersHorizontal, Inbox } from "lucide-react";
import Header from "./Header";
import JobCard from "./JobCard";
import JobCardSkeleton from "./JobCardSkeleton";
import JobModal from "./JobModal";
import { fetchJobs } from "@/lib/jobs-api";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [sort, setSort] = useState("newest");
  const [activeJob, setActiveJob] = useState(null);

  function load() {
    setLoading(true);
    setError(null);
    fetchJobs()
      .then((data) => setJobs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(jobs.map((j) => j.category));
    return ["All", ...Array.from(set).sort()];
  }, [jobs]);

  const filtered = useMemo(() => {
    let out = jobs.filter((j) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !j.title.toLowerCase().includes(q) &&
          !j.description.toLowerCase().includes(q)
        )
          return false;
      }
      if (category !== "All" && j.category !== category) return false;
      if (location && !j.location.toLowerCase().includes(location.toLowerCase()))
        return false;
      if (maxBudget && j.budget > Number(maxBudget)) return false;
      return true;
    });

    if (sort === "newest") {
      out = [...out].sort(
        (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
      );
    } else if (sort === "budget-high") {
      out = [...out].sort((a, b) => b.budget - a.budget);
    } else if (sort === "budget-low") {
      out = [...out].sort((a, b) => a.budget - b.budget);
    }
    return out;
  }, [jobs, search, category, location, maxBudget, sort]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Find your next freelance project
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Browse {jobs.length || "hundreds of"} curated opportunities from companies hiring right now.
          </p>
        </section>

        {/* Search + filters */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <label htmlFor="search" className="sr-only">
              Search jobs
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or description..."
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label htmlFor="category" className="mb-1 block text-xs font-medium text-slate-600">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="location" className="mb-1 block text-xs font-medium text-slate-600">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Remote, Berlin"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div>
              <label htmlFor="maxBudget" className="mb-1 block text-xs font-medium text-slate-600">
                Max budget (USD)
              </label>
              <input
                id="maxBudget"
                type="number"
                min="0"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
        </section>

        {/* Results bar */}
        <section className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-600">
            {loading ? (
              "Loading jobs..."
            ) : error ? (
              "Couldn't load jobs"
            ) : (
              <>
                Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
                <span className="font-semibold text-slate-900">{jobs.length}</span> jobs
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <label htmlFor="sort" className="text-sm text-slate-600">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value="newest">Newest</option>
              <option value="budget-high">Budget: High to Low</option>
              <option value="budget-low">Budget: Low to High</option>
            </select>
          </div>
        </section>

        {/* Grid */}
        <section className="mt-6">
          {loading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50/60 p-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
                Something went wrong
              </h3>
              <p className="mt-1 max-w-md text-sm text-slate-600">{error}</p>
              <button
                type="button"
                onClick={load}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <RefreshCw className="h-4 w-4" /> Retry
              </button>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Inbox className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
                No jobs found
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Try adjusting your search or filters.
              </p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} onOpen={setActiveJob} />
              ))}
            </div>
          )}
        </section>
      </main>

      {activeJob && <JobModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </div>
  );
}
