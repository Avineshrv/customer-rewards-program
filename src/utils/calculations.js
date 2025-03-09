export const calculateRewards = (amount) => {
  if (amount <= 50) return 0;

  let points = 0;

  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100;
  }
  if (amount > 50) {
    points += (amount - 50) * 1;
  }

  return Math.floor(points);
};
