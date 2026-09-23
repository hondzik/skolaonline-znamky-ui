import { describe, expect, it } from 'vitest';
import { gradeColor, parseGrade } from '../src/utils/grades';

describe('parseGrade', () => {
  it('parses plain numeric grades', () => {
    expect(parseGrade('1')).toBe(1);
    expect(parseGrade('3')).toBe(3);
    expect(parseGrade('5')).toBe(5);
  });

  it('extracts the leading digit from a modified grade', () => {
    expect(parseGrade('1+')).toBe(1);
    expect(parseGrade('2-')).toBe(2);
  });

  it('returns null for verbal evaluations, which are not a parseable grade digit', () => {
    expect(parseGrade('Sl')).toBeNull();
  });

  it('returns null for an empty value', () => {
    expect(parseGrade('')).toBeNull();
  });
});

describe('gradeColor', () => {
  it('returns green for the best grade (1)', () => {
    expect(gradeColor(1)).toBe('rgb(76, 175, 80)');
  });

  it('returns red for the worst grade (5)', () => {
    expect(gradeColor(5)).toBe('rgb(244, 67, 54)');
  });

  it('returns the exact stop color for an integer grade (3)', () => {
    expect(gradeColor(3)).toBe('rgb(255, 193, 7)');
  });

  it('interpolates between stops for a fractional average', () => {
    const color = gradeColor(1.5);
    expect(color).toBe('rgb(108, 185, 77)');
  });

  it('clamps values outside the 1-5 range', () => {
    expect(gradeColor(0)).toBe(gradeColor(1));
    expect(gradeColor(6)).toBe(gradeColor(5));
  });
});
