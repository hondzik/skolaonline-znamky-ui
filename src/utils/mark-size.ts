const BASE_SIZE_EM = 1.8;
const MIN_RATIO = 0.7;
const MAX_RATIO = 1.6;

/**
 * Mean of a set of mark weights — used only as the "is this mark heavier
 * than usual" reference for the heavy-mark indicator, independent of
 * size_by_weight.
 */
export function averageWeight(weights: number[]): number {
  if (weights.length === 0) {
    return 0;
  }
  return weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
}

export interface WeightRange {
  min: number;
  max: number;
}

/**
 * Smallest and largest weight among a set of marks — the normalization
 * range markChipSizeEm maps into [MIN_RATIO, MAX_RATIO]. A single shared
 * range across the whole card (not per subject) is what makes a given
 * weight render the same size everywhere. Comparing each mark only to the
 * card-wide *average* and clamping (an earlier version of this function)
 * could map two genuinely different weights to the exact same clamped
 * size whenever the average sat far from both — e.g. weights 0.5 and 1.0
 * both getting clamped to the same MAX_RATIO ceiling because most other
 * marks on the card were much lighter, making them visually
 * indistinguishable despite one being twice the other.
 */
export function weightRange(weights: number[]): WeightRange {
  if (weights.length === 0) {
    return { min: 0, max: 0 };
  }
  return { min: Math.min(...weights), max: Math.max(...weights) };
}

/**
 * Chip size (in em) for a mark when "size by weight" is enabled — linearly
 * maps this mark's weight from [min, max] (the full range of weights shown
 * on the card) to a [MIN_RATIO, MAX_RATIO] size multiplier. Normalizing
 * against the observed range rather than an absolute number keeps this
 * correct regardless of which weight scale a school uses (e.g. 0.1-1 vs.
 * 1-100), and — unlike clamping a ratio to a reference — never maps two
 * different weights to the same size unless the whole range is flat.
 */
export function markChipSizeEm(weight: number, min: number, max: number): number {
  const range = max - min;
  if (range <= 0) {
    return BASE_SIZE_EM;
  }
  const normalized = Math.min(1, Math.max(0, (weight - min) / range));
  const ratio = MIN_RATIO + normalized * (MAX_RATIO - MIN_RATIO);
  return BASE_SIZE_EM * ratio;
}
