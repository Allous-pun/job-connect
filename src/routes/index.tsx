import { createFileRoute } from "@tanstack/react-router";
import JobsPage from "@/components/jobs/JobsPage";

export const Route = createFileRoute("/")({
  component: JobsPage,
  head: () => ({
    meta: [
      { title: "Workhive — Find your next freelance project" },
      {
        name: "description",
        content:
          "Browse curated freelance jobs across design, development, writing, and more. Filter by category, location, and budget.",
      },
    ],
  }),
});
