import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Criterion {
  id: string;
  label: string;
  description: string;
  direction: 'benefit' | 'cost';
  color: string;
}

export interface Alternative {
  id: string;
  label: string;
  subtitle: string;
  description: string;
}

interface AhpState {
  currentStep: number;
  goal: string;
  context: string;
  criteria: Criterion[];
  alternatives: Alternative[];
  criteriaComparisons: Record<string, number>;
  altComparisons: Record<string, number>;
}

interface AhpActions {
  setStep: (step: number) => void;
  setGoal: (goal: string) => void;
  setContext: (context: string) => void;
  addCriterion: () => void;
  updateCriterion: (id: string, updates: Partial<Criterion>) => void;
  removeCriterion: (id: string) => void;
  addAlternative: () => void;
  updateAlternative: (id: string, updates: Partial<Alternative>) => void;
  removeAlternative: (id: string) => void;
  setCriteriaComparison: (i: number, j: number, value: number) => void;
  setAltComparison: (critIdx: number, i: number, j: number, value: number) => void;
  reset: () => void;
}

type AhpStore = AhpState & AhpActions;

const DEFAULT_CRITERIA: Criterion[] = [
  { id: 'c1', label: 'Revenue impact', description: 'Forecast contribution to ARR over 12 months.', direction: 'benefit', color: 'oklch(0.92 0.06 60)' },
  { id: 'c2', label: 'Strategic fit', description: 'Alignment with FY plan & platform direction.', direction: 'benefit', color: 'oklch(0.92 0.06 220)' },
  { id: 'c3', label: 'Cost', description: 'Total fully-loaded delivery cost incl. ongoing support.', direction: 'cost', color: 'oklch(0.92 0.06 350)' },
];

const DEFAULT_ALTERNATIVES: Alternative[] = [
  { id: 'a1', label: 'Option A', subtitle: '', description: '' },
  { id: 'a2', label: 'Option B', subtitle: '', description: '' },
  { id: 'a3', label: 'Option C', subtitle: '', description: '' },
];

const INITIAL_STATE: AhpState = {
  currentStep: 1,
  goal: '',
  context: '',
  criteria: DEFAULT_CRITERIA,
  alternatives: DEFAULT_ALTERNATIVES,
  criteriaComparisons: {},
  altComparisons: {},
};

const CRITERION_COLORS = [
  'oklch(0.92 0.06 60)',
  'oklch(0.92 0.06 220)',
  'oklch(0.92 0.06 140)',
  'oklch(0.92 0.06 350)',
  'oklch(0.92 0.06 300)',
  'oklch(0.92 0.06 30)',
  'oklch(0.92 0.06 190)',
  'oklch(0.92 0.06 100)',
  'oklch(0.92 0.06 260)',
];

export const useAhpStore = create<AhpStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setStep: (step) => set({ currentStep: step }),
      setGoal: (goal) => set({ goal }),
      setContext: (context) => set({ context }),

      addCriterion: () =>
        set(s => ({
          criteria: [
            ...s.criteria,
            {
              id: `c${Date.now()}`,
              label: 'New criterion',
              description: '',
              direction: 'benefit',
              color: CRITERION_COLORS[s.criteria.length % CRITERION_COLORS.length],
            },
          ],
          criteriaComparisons: {},
          altComparisons: {},
        })),

      updateCriterion: (id, updates) =>
        set(s => ({ criteria: s.criteria.map(c => c.id === id ? { ...c, ...updates } : c) })),

      removeCriterion: (id) =>
        set(s => ({
          criteria: s.criteria.filter(c => c.id !== id),
          criteriaComparisons: {},
          altComparisons: {},
        })),

      addAlternative: () =>
        set(s => ({
          alternatives: [
            ...s.alternatives,
            { id: `a${Date.now()}`, label: 'New option', subtitle: '', description: '' },
          ],
          altComparisons: {},
        })),

      updateAlternative: (id, updates) =>
        set(s => ({ alternatives: s.alternatives.map(a => a.id === id ? { ...a, ...updates } : a) })),

      removeAlternative: (id) =>
        set(s => ({
          alternatives: s.alternatives.filter(a => a.id !== id),
          altComparisons: {},
        })),

      setCriteriaComparison: (i, j, value) =>
        set(s => ({ criteriaComparisons: { ...s.criteriaComparisons, [`${i}_${j}`]: value } })),

      setAltComparison: (critIdx, i, j, value) =>
        set(s => ({ altComparisons: { ...s.altComparisons, [`${critIdx}_${i}_${j}`]: value } })),

      reset: () => set(INITIAL_STATE),
    }),
    { name: 'ahp-store' },
  ),
);
