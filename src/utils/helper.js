export const isInLastThreeMonths = (date) => {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);
  return date >= threeMonthsAgo && date <= now;
};
