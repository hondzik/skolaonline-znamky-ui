const RECENT_WINDOW_DAYS = 3;

/**
 * Fallback "new mark" heuristic for marks that predate the card's own
 * connection to the skolaonline_znamky_new_mark bus event (e.g. right after
 * a dashboard reload) — a mark dated within the last few days is still
 * highlighted even without a matching event.
 */
export function isRecentMark(dateIso: string, now: Date = new Date(), withinDays = RECENT_WINDOW_DAYS): boolean {
  const markTime = new Date(dateIso).getTime();
  if (Number.isNaN(markTime)) {
    return false;
  }
  const ageMs = now.getTime() - markTime;
  return ageMs >= 0 && ageMs <= withinDays * 24 * 60 * 60 * 1000;
}

/**
 * A mark is highlighted as "new" either because its id arrived via the
 * skolaonline_znamky_new_mark event since the card connected, or as a
 * fallback because it's recent enough by date.
 */
export function shouldHighlightMark(markId: string, dateIso: string, newMarkIds: ReadonlySet<string>, now: Date = new Date()): boolean {
  return newMarkIds.has(markId) || isRecentMark(dateIso, now);
}
