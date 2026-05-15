// Port of AHP/ahp_solver.py — power iteration instead of numpy.linalg.eig
// Safe for positive reciprocal matrices (Saaty scale guarantees positivity)

export interface PrioritiesResult {
  weights: number[];
  lambdaMax: number;
  CI: number;
  CR: number;
  consistent: boolean;
  n: number;
}

export interface InconsistentPairResult {
  i: number;
  j: number;
  currentValue: number;
  suggestedValue: number;
  deviationLog: number;
}

export interface AggregateResult {
  finalScores: number[];
  ranking: number[];
  altPrioritiesPerCriterion: number[][];
  consistencyPerCriterion: Array<{ CR: number; consistent: boolean }>;
}

export interface SensitivityResult {
  winnerIdx: number;
  sensitivity: Array<{
    criterionIdx: number;
    originalWeight: number;
    minChangeToPFlipWinner: number | null;
  }>;
}

const RI_TABLE: Record<number, number> = {
  1: 0, 2: 0, 3: 0.58, 4: 0.90, 5: 1.12,
  6: 1.24, 7: 1.32, 8: 1.41, 9: 1.45, 10: 1.49,
};

export function computePriorities(matrix: number[][]): PrioritiesResult {
  const n = matrix.length;
  if (matrix.some(row => row.length !== n)) throw new Error('Matrix must be square');

  let w = Array(n).fill(1 / n) as number[];
  for (let iter = 0; iter < 1000; iter++) {
    const Aw = matrix.map(row => row.reduce((s, v, j) => s + v * w[j], 0));
    const sum = Aw.reduce((s, v) => s + v, 0);
    const wNew = Aw.map(v => v / sum);
    const diff = Math.max(...wNew.map((v, i) => Math.abs(v - w[i])));
    w = wNew;
    if (diff < 1e-10) break;
  }

  const lambdaMax =
    matrix.map((row, i) => row.reduce((s, v, j) => s + v * w[j], 0) / w[i])
      .reduce((s, v) => s + v, 0) / n;

  const CI = n > 1 ? (lambdaMax - n) / (n - 1) : 0;
  const RI = RI_TABLE[n] ?? 1.59;
  const CR = RI > 0 ? CI / RI : 0;

  return { weights: w, lambdaMax, CI, CR, consistent: CR <= 0.10, n };
}

// Builds a reciprocal matrix from a flat comparisons object { 'i_j': saatyValue }
// Only upper triangle (i < j) is needed — lower triangle is auto-filled as 1/value
export function buildMatrix(n: number, comparisons: Record<string, number>): number[][] {
  const A: number[][] = Array.from({ length: n }, () => Array(n).fill(1));
  for (const [key, value] of Object.entries(comparisons)) {
    const parts = key.split('_');
    const i = parseInt(parts[0]);
    const j = parseInt(parts[1]);
    if (!isNaN(i) && !isNaN(j) && i < n && j < n && i !== j) {
      A[i][j] = value;
      A[j][i] = 1 / value;
    }
  }
  return A;
}

export function findMostInconsistentPair(matrix: number[][]): InconsistentPairResult {
  const n = matrix.length;
  const { weights } = computePriorities(matrix);
  let worstPair: [number, number] = [0, 1];
  let worstDev = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dev = Math.abs(Math.log(matrix[i][j]) - Math.log(weights[i] / weights[j]));
      if (dev > worstDev) {
        worstDev = dev;
        worstPair = [i, j];
      }
    }
  }

  const [i, j] = worstPair;
  return {
    i, j,
    currentValue: matrix[i][j],
    suggestedValue: weights[i] / weights[j],
    deviationLog: worstDev,
  };
}

export function aggregate(criteriaWeights: number[], alternativeMatrices: number[][][]): AggregateResult {
  if (alternativeMatrices.length !== criteriaWeights.length)
    throw new Error('Matrix count must match criteria count');

  const altPriorities = alternativeMatrices.map(mat => computePriorities(mat));
  const nAlt = altPriorities[0].weights.length;
  const finalScores = Array(nAlt).fill(0) as number[];

  altPriorities.forEach(({ weights }, i) => {
    weights.forEach((w, k) => { finalScores[k] += criteriaWeights[i] * w; });
  });

  const ranking = [...Array(nAlt).keys()].sort((a, b) => finalScores[b] - finalScores[a]);

  return {
    finalScores,
    ranking,
    altPrioritiesPerCriterion: altPriorities.map(r => r.weights),
    consistencyPerCriterion: altPriorities.map(r => ({ CR: r.CR, consistent: r.consistent })),
  };
}

export function normalizeHardData(values: number[], benefit = true): number[] {
  const arr = benefit ? [...values] : values.map(v => 1 / Math.max(v, 1e-9));
  const sum = arr.reduce((s, v) => s + v, 0);
  return arr.map(v => v / sum);
}

export function analyzeSensitivity(
  criteriaWeights: number[],
  alternativeMatrices: number[][][],
  winnerIdx: number | null = null,
): SensitivityResult {
  const base = aggregate(criteriaWeights, alternativeMatrices);
  const winner = winnerIdx ?? base.ranking[0];

  const sensitivity = criteriaWeights.map((origW, critIdx) => {
    let smallestChange: number | null = null;
    outer: for (let delta = 0.01; delta <= 1.0; delta += 0.01) {
      for (const dir of [1, -1]) {
        const newW = origW + dir * delta;
        if (newW < 0 || newW > 1) continue;
        const othersSum = 1 - origW;
        if (othersSum < 1e-9) continue;
        const scale = (1 - newW) / othersSum;
        const newWeights = criteriaWeights.map((w, i) => i === critIdx ? newW : w * scale);
        if (aggregate(newWeights, alternativeMatrices).ranking[0] !== winner) {
          smallestChange = parseFloat(delta.toFixed(2));
          break outer;
        }
      }
    }
    return { criterionIdx: critIdx, originalWeight: origW, minChangeToPFlipWinner: smallestChange };
  });

  return { winnerIdx: winner, sensitivity };
}

// Convert slider position (-8..8) to Saaty value
export function sliderToSaaty(p: number): number {
  return p >= 0 ? p + 1 : 1 / (-p + 1);
}

// Convert Saaty value to slider position
export function saatyToSlider(v: number): number {
  return v >= 1 ? v - 1 : -(1 / v - 1);
}
