export interface OrderedSubject {
  subject_id: string;
  name: string;
  // null for a subject with no marks yet this semester.
  average: number | null;
  count: number;
  marks: SkolaOnlineMark[];
  color?: string;
  // true if the subject_id is in `subject_hidden` — the card must skip it
  // when rendering, but the editor still lists it (dimmed) so it can be
  // shown again.
  hidden: boolean;
}

/**
 * Orders subjects for display: entries listed in `subject_order` come first
 * (in that order), followed by any subject not yet mentioned there, sorted
 * locale-aware by name. `subjects[]` in the entity attributes is ordered by
 * Unicode code point, not Czech alphabetical order, and a new/removed subject
 * must not break rendering — subjects missing from `subject_order` just fall
 * back to the sorted tail, and stale ids in `subject_order` are ignored.
 *
 * Returns every subject the entity knows about, manually hidden or not —
 * whether a hidden or empty (no marks yet) subject should actually be
 * skipped when rendering the card is up to the caller, since the editor
 * needs the full list to let the user show a hidden subject again.
 */
export function orderSubjects(attrs: SkolaOnlineMarksAttributes, config: Pick<SkolaOnlineMarksCardConfig, 'subject_order' | 'subject_colors' | 'subject_hidden'>): OrderedSubject[] {
  const byId = new Map(attrs.subjects.map((subject) => [subject.subject_id, subject]));
  const colors = config.subject_colors ?? {};
  const hiddenIds = new Set(config.subject_hidden ?? []);
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
    hidden: hiddenIds.has(subject.subject_id),
  }));
}
