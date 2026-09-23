/**
 * Formats a mark's ISO date (always midnight, no timezone offset — parsed
 * as local time per the ES date-time string spec) for display, localized
 * to the given language. Falls back to the raw YYYY-MM-DD slice if the
 * string can't be parsed, rather than showing "Invalid Date".
 */
export function formatMarkDate(dateIso: string, language?: string): string {
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) {
    return dateIso.slice(0, 10);
  }
  return new Intl.DateTimeFormat(language, { day: 'numeric', month: 'numeric', year: 'numeric' }).format(date);
}
