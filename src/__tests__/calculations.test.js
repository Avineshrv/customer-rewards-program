import { calculateRewards } from '../utils/calculations';

describe('calculateRewards', () => {
  test('should return 25 reward points for amount $75', () => {
    expect(calculateRewards(75)).toBe(25);
  });

  test('should return 90 reward points for amount $120', () => {
    expect(calculateRewards(120)).toBe(90);
  });

  test('should return 250 reward points for amount $200', () => {
    expect(calculateRewards(200)).toBe(250);
  });

  test('should return 91 reward points for fractional amount $120.5', () => {
    expect(calculateRewards(120.5)).toBe(91);
  });

  test('should return 0 reward points for amount $50', () => {
    expect(calculateRewards(50)).toBe(0);
  });

  test('should return 0 reward points for amount $30', () => {
    expect(calculateRewards(30)).toBe(0);
  });

  test('should return 0 reward points for negative amount $-10', () => {
    expect(calculateRewards(-10)).toBe(0);
  });
});
