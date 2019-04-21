exports.isLessThanXDaysAgo = (maxDays, date) =>
  Date.now() - new Date(date) < maxDays * 1000 * 60 * 60 * 24
