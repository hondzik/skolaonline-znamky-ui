const DEFAULT_WINDOW_DAYS = 1;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Number of business days (Mon-Fri) strictly between `from` and `to`
 * (both start-of-day, from <= to) — Saturdays and Sundays are skipped
 * rather than counted, so a weekend never "spends" any of the configured
 * window. Marks are never given on a weekend, so without this a mark from
 * last Friday would look 3 calendar days old by Monday morning even though
 * no school day was actually missed.
 */
function businessDaysBetween(from: Date, to: Date): number {
  let count = 0;
  const cursor = new Date(from);
  while (cursor.getTime() < to.getTime()) {
    cursor.setDate(cursor.getDate() + 1);
    if (!isWeekend(cursor)) {
      count++;
    }
  }
  return count;
}

/**
 * Fallback "new mark" heuristic for marks that predate the card's own
 * connection to the skolaonline_znamky_new_mark bus event (e.g. right after
 * a dashboard reload) — a mark dated recently enough is still highlighted
 * even without a matching event.
 *
 * Counts business days, not calendar days, so the configured window has
 * the intuitive meaning the new_mark_days option documents: 1 = only marks
 * dated today, 2 = today and the previous school day (skipping any
 * weekend in between), and so on — regardless of what time of day "now"
 * happens to be. withinDays <= 0 disables the heuristic entirely.
 */
export function isRecentMark(dateIso: string, now: Date = new Date(), withinDays: number = DEFAULT_WINDOW_DAYS): boolean {
  if (withinDays <= 0) {
    return false;
  }
  const markTime = new Date(dateIso).getTime();
  if (Number.isNaN(markTime)) {
    return false;
  }
  const markDay = startOfDay(new Date(markTime));
  const today = startOfDay(now);
  if (markDay > today) {
    return false;
  }
  return businessDaysBetween(markDay, today) < withinDays;
}

/**
 * A mark is highlighted as "new" either because its id arrived via the
 * skolaonline_znamky_new_mark event since the card connected, or as a
 * fallback because it's recent enough by date — unless withinDays is 0,
 * which turns the whole highlight off, including for marks that just
 * arrived via the event.
 */
export function shouldHighlightMark(markId: string, dateIso: string, newMarkIds: ReadonlySet<string>, withinDays: number = DEFAULT_WINDOW_DAYS, now: Date = new Date()): boolean {
  if (withinDays <= 0) {
    return false;
  }
  return newMarkIds.has(markId) || isRecentMark(dateIso, now, withinDays);
}
