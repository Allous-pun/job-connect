export function formatRelativeDate(isoDate) {
  const posted = new Date(isoDate).getTime();
  const now = Date.now();
  const diffDays = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  const months = Math.floor(diffDays / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export function formatBudget(value) {
  return `$${value.toLocaleString()}`;
}
