export interface OrderedSubject {
  subject_id: string;
  name: string;
  average: number;
  count: number;
  marks: SkolaOnlineMark[];
  color?: string;
}

/**
 * Orders subjects for display: entries listed in `subject_order` come first
 * (in that order), followed by any subject not yet mentioned there, sorted
 * locale-aware by name. `subjects[]` in the entity attributes is ordered by
 * Unicode code point, not Czech alphabetical order, and a new/removed subject
 * must not break rendering — subjects missing from `subject_order` just fall
 * back to the sorted tail, and stale ids in `subject_order` are ignored.
 */
export function orderSubjects(attrs: SkolaOnlineMarksAttributes, config: Pick<SkolaOnlineMarksCardConfig, 'subject_order' | 'subject_colors'>): OrderedSubject[] {
  const byId = new Map(attrs.subjects.map((subject) => [subject.subject_id, subject]));
  const colors = config.subject_colors ?? {};
  const seen = new Set<string>();

  const ordered: SkolaOnlineSubject[] = [];
  for (const id of config.subject_order ?? []) {
    const subject = byId.get(id);
    if (subject && !seen.has(id)) {
      ordered.push(subject);
      seen.add(id);
    }
  }

  const remaining = attrs.subjects.filter((subject) => !seen.has(subject.subject_id));
  const collator = new Intl.Collator('cs');
  remaining.sort((a, b) => collator.compare(attrs.subject_names[a.subject_id] ?? a.subject_id, attrs.subject_names[b.subject_id] ?? b.subject_id));

  return [...ordered, ...remaining].map((subject) => ({
    subject_id: subject.subject_id,
    name: attrs.subject_names[subject.subject_id] ?? subject.subject_id,
    average: subject.average,
    count: subject.count,
    marks: subject.marks,
    color: colors[subject.subject_id],
  }));
}
