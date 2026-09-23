// Czech school grading: 1 = best, 5 = worst. Color scale is therefore reversed
// compared to the typical "higher = better" gauge (green at 1, red at 5).
const COLOR_STOPS: Array<[number, [number, number, number]]> = [
  [1, [76, 175, 80]], // green
  [2, [139, 195, 74]], // light green
  [3, [255, 193, 7]], // amber
  [4, [255, 152, 0]], // orange
  [5, [244, 67, 54]], // red
];

/**
 * Extracts the numeric grade (1-5) from a mark value for color/sorting purposes.
 * Modifiers ("1-", "2+") and verbal evaluations ("Sl") are not parseable as a
 * single grade digit, so only a leading 1-5 digit is honored; anything else
 * (verbal evaluation, empty string) returns null and must not be fed to
 * gradeColor.
 */
export function parseGrade(value: string): number | null {
  const match = /^[1-5]/.exec(value.trim());
  return match ? Number(match[0]) : null;
}

/**
 * Interpolates a color along the 1(green)-5(red) scale for a (possibly
 * fractional, e.g. a subject/overall average) grade value.
 */
export function gradeColor(value: number): string {
  const clamped = Math.min(5, Math.max(1, value));
  const lowerStopIndex = Math.min(COLOR_STOPS.length - 2, Math.floor(clamped - 1));
  const [lowerGrade, lowerRgb] = COLOR_STOPS[lowerStopIndex];
  const [upperGrade, upperRgb] = COLOR_STOPS[lowerStopIndex + 1];
  // COLOR_STOPS grades are always 1 apart, so upperGrade - lowerGrade never divides by zero.
  const ratio = (clamped - lowerGrade) / (upperGrade - lowerGrade);

  const rgb = lowerRgb.map((channel, i) => Math.round(channel + (upperRgb[i] - channel) * ratio));
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}
