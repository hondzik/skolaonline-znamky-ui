import { describe, expect, it } from 'vitest';
import { averageWeight, markChipSizeEm, weightRange } from '../src/utils/mark-size';

describe('averageWeight', () => {
  it('returns the arithmetic mean', () => {
    expect(averageWeight([0.2, 0.2, 0.3])).toBeCloseTo(0.2333, 3);
  });

  it('returns 0 for an empty list', () => {
    expect(averageWeight([])).toBe(0);
  });
});

describe('weightRange', () => {
  it('returns the smallest and largest weight', () => {
    expect(weightRange([0.2, 1, 0.5])).toEqual({ min: 0.2, max: 1 });
  });

  it('returns a flat 0-0 range for an empty list', () => {
    expect(weightRange([])).toEqual({ min: 0, max: 0 });
  });
});

describe('markChipSizeEm', () => {
  it('returns the base size when the range is flat (min === max)', () => {
    expect(markChipSizeEm(0.2, 0.2, 0.2)).toBeCloseTo(1.8);
  });

  it('falls back to the base size when there is no usable range', () => {
    expect(markChipSizeEm(0.2, 0, 0)).toBeCloseTo(1.8);
  });

  it('scales the same way regardless of the absolute weight scale a school uses', () => {
    // Some schools weight marks 0.1-1, others 1-100 — the size must depend only
    // on where a mark falls within the observed range, never on the absolute numbers.
    const fractionalScale = markChipSizeEm(0.3, 0.1, 1);
    const percentScale = markChipSizeEm(30, 10, 100);
    expect(fractionalScale).toBeCloseTo(percentScale);
  });

  it('grows for a heavier mark', () => {
    expect(markChipSizeEm(0.8, 0.2, 1)).toBeGreaterThan(markChipSizeEm(0.4, 0.2, 1));
  });

  it('never maps two different weights to the same size, even when most other marks are far lighter', () => {
    // The bug this guards against: an earlier clamped-ratio-to-average
    // formula could size a 0.5-weighted mark identically to a 1.0-weighted
    // one whenever the card-wide average was dragged down by much lighter
    // marks in other subjects, saturating both at the same clamp ceiling.
    const min = 0.2;
    const max = 1;
    expect(markChipSizeEm(1, min, max)).toBeGreaterThan(markChipSizeEm(0.5, min, max));
  });

  it('clamps weights outside the observed range instead of extrapolating past it', () => {
    expect(markChipSizeEm(-1, 0.2, 1)).toBe(markChipSizeEm(0.2, 0.2, 1));
    expect(markChipSizeEm(5, 0.2, 1)).toBe(markChipSizeEm(1, 0.2, 1));
  });
});
