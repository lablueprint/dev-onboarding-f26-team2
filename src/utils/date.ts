const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Formats a valid ISO date relative to now; dates 30+ days old or in the future use UTC dates. */
export function timeAgo(iso: string): string {
  const date = new Date(iso);
  const elapsed = Date.now() - date.getTime();

  if (elapsed >= 0 && elapsed < 30 * DAY) {
    if (elapsed < MINUTE) return 'Just now';

    const [count, unit] = elapsed < HOUR
      ? [Math.floor(elapsed / MINUTE), 'minute']
      : elapsed < DAY
        ? [Math.floor(elapsed / HOUR), 'hour']
        : elapsed < 7 * DAY
          ? [Math.floor(elapsed / DAY), 'day']
          : [Math.floor(elapsed / (7 * DAY)), 'week'];

    return `${count} ${unit}${count === 1 ? '' : 's'} ago`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
