import jobsData from "@/data/jobs.json";

// Simulate API: first call fails, retries succeed
let attemptCount = 0;

export function fetchJobs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      attemptCount += 1;
      if (attemptCount === 1) {
        reject(new Error("Failed to fetch jobs. The server returned an unexpected response."));
      } else {
        resolve(jobsData);
      }
    }, 1500);
  });
}

export function resetApiSimulation() {
  attemptCount = 0;
}
