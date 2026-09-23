const BASE_SIZE_EM = 1.8;
const MIN_RATIO = 0.7;
const MAX_RATIO = 1.6;

/**
 * Mean of a set of mark weights. Used as the reference point for
 * markChipSizeEm — weight is not on a fixed scale across schools (some use
 * 0-1, others 0-100), so sizing has to be relative to the marks actually
 * being shown rather than to any absolute constant.
 */
export function averageWeight(weights: number[]): number {
  if (weights.length === 0) {
    return 0;
  }
  return weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
}

/**
 * Chip size (in em) for a mark when the "size by weight" option is enabled —
 * scales around the base chip size based on the ratio of this mark's weight
 * to a reference weight (the average weight of the marks being displayed),
 * clamped so a single very light/heavy mark can't blow up the layout. Using
 * a ratio rather than an absolute weight keeps this correct regardless of
 * which weight scale a school uses (e.g. 0-1 vs. 0-100).
 */
export function markChipSizeEm(weight: number, referenceWeight: number): number {
  if (referenceWeight <= 0) {
    return BASE_SIZE_EM;
  }
  const ratio = weight / referenceWeight;
  const clampedRatio = Math.min(MAX_RATIO, Math.max(MIN_RATIO, ratio));
  return BASE_SIZE_EM * clampedRatio;
}
