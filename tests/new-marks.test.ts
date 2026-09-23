import { describe, expect, it } from 'vitest';
import { isRecentMark, shouldHighlightMark } from '../src/utils/new-marks';

const NOW = new Date('2026-09-22T12:00:00'); // Tuesday
const MONDAY = new Date('2026-09-21T12:00:00'); // Monday

describe('isRecentMark', () => {
  it('is true for a mark dated today (the default window is today only)', () => {
    expect(isRecentMark('2026-09-22T00:00:00', NOW)).toBe(true);
  });

  it('is false for yesterday under the default window', () => {
    expect(isRecentMark('2026-09-21T00:00:00', NOW)).toBe(false);
  });

  it('is true for a mark within an explicitly wider window', () => {
    expect(isRecentMark('2026-09-20T00:00:00', NOW, 3)).toBe(true);
  });

  it('is false for a mark older than an explicitly wider window', () => {
    expect(isRecentMark('2026-09-10T00:00:00', NOW, 3)).toBe(false);
  });

  it('is false for an unparseable date', () => {
    expect(isRecentMark('not-a-date', NOW)).toBe(false);
  });

  it('is false for a date in the future', () => {
    expect(isRecentMark('2026-09-25T00:00:00', NOW)).toBe(false);
  });

  it('treats 1 day as "today only", regardless of the time of day', () => {
    expect(isRecentMark('2026-09-22T00:00:00', NOW, 1)).toBe(true);
    expect(isRecentMark('2026-09-21T23:00:00', NOW, 1)).toBe(false);
  });

  it('treats 2 days as "today and yesterday"', () => {
    expect(isRecentMark('2026-09-21T00:00:00', NOW, 2)).toBe(true);
    expect(isRecentMark('2026-09-20T00:00:00', NOW, 2)).toBe(false);
  });

  it('is always false when the window is 0', () => {
    expect(isRecentMark('2026-09-22T00:00:00', NOW, 0)).toBe(false);
  });

  it('skips the weekend: a Friday mark is only 1 business day old on the following Monday', () => {
    expect(isRecentMark('2026-09-18T00:00:00', MONDAY, 2)).toBe(true);
    expect(isRecentMark('2026-09-18T00:00:00', MONDAY, 1)).toBe(false);
  });

  it('skips the weekend: a Friday mark is 2 business days old on the following Tuesday, not 4 calendar days', () => {
    expect(isRecentMark('2026-09-18T00:00:00', NOW, 3)).toBe(true);
    expect(isRecentMark('2026-09-18T00:00:00', NOW, 2)).toBe(false);
  });
});

describe('shouldHighlightMark', () => {
  it('is true when the mark id was seen via the new-mark event, regardless of date', () => {
    expect(shouldHighlightMark('D1', '2020-01-01T00:00:00', new Set(['D1']), 3, NOW)).toBe(true);
  });

  it('is true when the mark is recent, even without a matching event', () => {
    expect(shouldHighlightMark('D2', '2026-09-21T00:00:00', new Set(), 3, NOW)).toBe(true);
  });

  it('is false when the mark is neither recent nor in the event set', () => {
    expect(shouldHighlightMark('D3', '2026-01-01T00:00:00', new Set(), 3, NOW)).toBe(false);
  });

  it('is false when the window is 0, even for a mark just seen via the event', () => {
    expect(shouldHighlightMark('D1', '2020-01-01T00:00:00', new Set(['D1']), 0, NOW)).toBe(false);
  });
});
