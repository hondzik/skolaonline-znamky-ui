import { describe, expect, it } from 'vitest';
import { isRecentMark, shouldHighlightMark } from '../src/utils/new-marks';

const NOW = new Date('2026-09-22T12:00:00Z');

describe('isRecentMark', () => {
  it('is true for a mark dated today', () => {
    expect(isRecentMark('2026-09-22T00:00:00', NOW)).toBe(true);
  });

  it('is true for a mark within the recent window', () => {
    expect(isRecentMark('2026-09-20T00:00:00', NOW)).toBe(true);
  });

  it('is false for a mark older than the recent window', () => {
    expect(isRecentMark('2026-09-10T00:00:00', NOW)).toBe(false);
  });

  it('is false for an unparseable date', () => {
    expect(isRecentMark('not-a-date', NOW)).toBe(false);
  });

  it('is false for a date in the future', () => {
    expect(isRecentMark('2026-09-25T00:00:00', NOW)).toBe(false);
  });
});

describe('shouldHighlightMark', () => {
  it('is true when the mark id was seen via the new-mark event, regardless of date', () => {
    expect(shouldHighlightMark('D1', '2020-01-01T00:00:00', new Set(['D1']), NOW)).toBe(true);
  });

  it('is true when the mark is recent, even without a matching event', () => {
    expect(shouldHighlightMark('D2', '2026-09-21T00:00:00', new Set(), NOW)).toBe(true);
  });

  it('is false when the mark is neither recent nor in the event set', () => {
    expect(shouldHighlightMark('D3', '2026-01-01T00:00:00', new Set(), NOW)).toBe(false);
  });
});
