import { describe, expect, it } from 'vitest';
import { orderSubjects } from '../src/utils/subjects';

function buildAttrs(overrides: Partial<SkolaOnlineMarksAttributes> = {}): SkolaOnlineMarksAttributes {
  return {
    student_id: 'D3006424',
    student_name: 'Tomáš Kropáč',
    semester_id: 'D44389',
    semester_name: '1. pololetí',
    semester_from: '2026-09-01T00:00:00',
    semester_to: '2027-01-31T00:00:00',
    school_year: '2026/2027',
    previous_semester_id: null,
    marks_count: 4,
    subject_names: {
      D118763: 'Anglický jazyk',
      D118760: 'Český jazyk',
    },
    subjects: [
      {
        subject_id: 'D118763',
        average: 1,
        count: 3,
        marks: [
          { id: 'D90364796', value: '1', weight: 0.2, date: '2026-09-22T00:00:00' },
          { id: 'D90189065', value: '1', weight: 0.2, date: '2026-09-16T00:00:00' },
          { id: 'D89952593', value: '1', weight: 0.2, date: '2026-09-11T00:00:00' },
        ],
      },
      {
        subject_id: 'D118760',
        average: 1,
        count: 1,
        marks: [{ id: 'D90328860', value: '1', weight: 0.2, date: '2026-09-21T00:00:00' }],
      },
    ],
    ...overrides,
  };
}

describe('orderSubjects', () => {
  it('falls back to Czech locale-aware order when subject_order is not configured', () => {
    // "subjects[]" is ordered by Unicode code point ("Fyzika" before "Čeština"),
    // which is not the same as Czech alphabetical order — the card must not
    // rely on the raw attribute order.
    const attrs = buildAttrs({
      subject_names: { S1: 'Fyzika', S2: 'Čeština' },
      subjects: [
        { subject_id: 'S1', average: 2, count: 1, marks: [] },
        { subject_id: 'S2', average: 2, count: 1, marks: [] },
      ],
    });

    const result = orderSubjects(attrs, {});
    expect(result.map((s) => s.subject_id)).toEqual(['S2', 'S1']);
  });

  it('honors subject_order over the locale-aware fallback', () => {
    const attrs = buildAttrs();
    const result = orderSubjects(attrs, { subject_order: ['D118760', 'D118763'] });
    expect(result.map((s) => s.subject_id)).toEqual(['D118760', 'D118763']);
  });

  it('appends subjects missing from subject_order after the ordered ones', () => {
    const attrs = buildAttrs();
    const result = orderSubjects(attrs, { subject_order: ['D118760'] });
    expect(result.map((s) => s.subject_id)).toEqual(['D118760', 'D118763']);
  });

  it('ignores stale ids in subject_order that no longer exist on the entity', () => {
    const attrs = buildAttrs();
    const result = orderSubjects(attrs, { subject_order: ['D999999', 'D118763', 'D118760'] });
    expect(result.map((s) => s.subject_id)).toEqual(['D118763', 'D118760']);
  });

  it('falls back to the subject_id when subject_names has no entry for it', () => {
    const attrs = buildAttrs({
      subject_names: {},
      subjects: [{ subject_id: 'D999', average: 2, count: 1, marks: [] }],
    });
    const result = orderSubjects(attrs, {});
    expect(result[0].name).toBe('D999');
  });

  it('attaches the configured color and resolves the display name', () => {
    const attrs = buildAttrs();
    const result = orderSubjects(attrs, { subject_colors: { D118763: '#3f51b5' } });
    const english = result.find((s) => s.subject_id === 'D118763');
    expect(english?.color).toBe('#3f51b5');
    expect(english?.name).toBe('Anglický jazyk');
    const czech = result.find((s) => s.subject_id === 'D118760');
    expect(czech?.color).toBeUndefined();
  });
});
