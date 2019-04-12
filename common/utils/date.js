exports.isMoreThanXDaysAgo = (maxDays, date) =>
  Date.now() - new Date(date) > maxDays * 60 * 60 * 24
