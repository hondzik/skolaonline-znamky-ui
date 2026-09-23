import { describe, expect, it } from 'vitest';
import { averageWeight, markChipSizeEm } from '../src/utils/mark-size';

describe('averageWeight', () => {
  it('returns the arithmetic mean', () => {
    expect(averageWeight([0.2, 0.2, 0.3])).toBeCloseTo(0.2333, 3);
  });

  it('returns 0 for an empty list', () => {
    expect(averageWeight([])).toBe(0);
  });
});

describe('markChipSizeEm', () => {
  it('returns the base size when the mark is exactly at the reference weight', () => {
    expect(markChipSizeEm(0.2, 0.2)).toBeCloseTo(1.8);
  });

  it('falls back to the base size when there is no usable reference weight', () => {
    expect(markChipSizeEm(0.2, 0)).toBeCloseTo(1.8);
  });

  it('scales the same way regardless of the absolute weight scale a school uses', () => {
    // Some schools weight marks 0.1-1, others 1-100 — the size must depend only
    // on how a mark compares to the reference, never on the absolute numbers.
    const fractionalScale = markChipSizeEm(0.3, 0.2);
    const percentScale = markChipSizeEm(30, 20);
    expect(fractionalScale).toBeCloseTo(percentScale);
  });

  it('grows for a heavier-than-reference mark', () => {
    expect(markChipSizeEm(0.3, 0.2)).toBeGreaterThan(markChipSizeEm(0.2, 0.2));
  });

  it('shrinks for a lighter-than-reference mark', () => {
    expect(markChipSizeEm(0.1, 0.2)).toBeLessThan(markChipSizeEm(0.2, 0.2));
  });

  it('clamps the ratio for an extremely heavy mark', () => {
    expect(markChipSizeEm(100, 1)).toBe(markChipSizeEm(1000, 1));
  });

  it('clamps the ratio for an extremely light mark', () => {
    expect(markChipSizeEm(0.001, 1)).toBe(markChipSizeEm(0.00001, 1));
  });
});
