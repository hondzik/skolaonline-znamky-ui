import { describe, expect, it } from 'vitest';
import { formatMarkDate } from '../src/utils/format-date';

describe('formatMarkDate', () => {
  it('formats a date localized to Czech', () => {
    expect(formatMarkDate('2026-09-22T00:00:00', 'cs')).toBe('22. 9. 2026');
  });

  it('formats a date localized to English', () => {
    expect(formatMarkDate('2026-09-22T00:00:00', 'en')).toBe('9/22/2026');
  });

  it('falls back to the language-less default when no language is given', () => {
    expect(formatMarkDate('2026-09-22T00:00:00')).not.toBe('');
  });

  it('falls back to the raw date slice when the string cannot be parsed', () => {
    expect(formatMarkDate('not-a-date', 'cs')).toBe('not-a-date');
  });
});
