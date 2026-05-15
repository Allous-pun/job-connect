import { Briefcase } from "lucide-react";

export default function Header() {
  const links = ["Home", "Jobs", "Post a Job", "Sign In"];
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Briefcase className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-slate-900">
            Workhive
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l, i) => (
            <a
              key={l}
              href="#"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                i === 1
                  ? "text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {l}
            </a>
          ))}
          <a
            href="#"
            className="ml-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Get started
          </a>
        </nav>
        <button
          type="button"
          aria-label="Menu"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
