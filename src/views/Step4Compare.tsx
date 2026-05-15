import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAhpStore } from '../store/useAhpStore';
import { SaatySlider } from '../design-system';
import { computePriorities, buildMatrix, aggregate, findMostInconsistentPair, sliderToSaaty, saatyToSlider } from '../lib/ahp';

type CompareMode = 'criteria' | 'alternatives';

function generatePairs(n: number): [number, number][] {
  const pairs: [number, number][] = [];
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      pairs.push([i, j]);
  return pairs;
}

export function Step4Compare() {
  const navigate = useNavigate();
  const { criteria, alternatives, criteriaComparisons, altComparisons, setCriteriaComparison, setAltComparison } = useAhpStore();

  const [mode, setMode] = useState<CompareMode>('criteria');
  const [critPairIdx, setCritPairIdx] = useState(0);
  const [altCritIdx, setAltCritIdx] = useState(0);
  const [altPairIdx, setAltPairIdx] = useState(0);

  const critPairs = useMemo(() => generatePairs(criteria.length), [criteria.length]);
  const altPairs = useMemo(() => generatePairs(alternatives.length), [alternatives.length]);

  const totalPairs = critPairs.length + criteria.length * altPairs.length;
  const donePairs = mode === 'criteria'
    ? critPairIdx
    : critPairs.length + altCritIdx * altPairs.length + altPairIdx;

  const currentSaatyKey = mode === 'criteria'
    ? `${critPairs[critPairIdx]?.[0]}_${critPairs[critPairIdx]?.[1]}`
    : `${altCritIdx}_${altPairs[altPairIdx]?.[0]}_${altPairs[altPairIdx]?.[1]}`;
  const storedSaaty = mode === 'criteria'
    ? criteriaComparisons[currentSaatyKey]
    : altComparisons[currentSaatyKey];
  // Negate: visual convention = drag RIGHT → right card wins (AHP stores left-vs-right ratio)
  const sliderValue = storedSaaty != null ? -Math.round(saatyToSlider(storedSaaty)) : 0;

  // Current items
  const leftCritIdx = critPairs[critPairIdx]?.[0] ?? 0;
  const rightCritIdx = critPairs[critPairIdx]?.[1] ?? 1;
  const leftAltIdx = altPairs[altPairIdx]?.[0] ?? 0;
  const rightAltIdx = altPairs[altPairIdx]?.[1] ?? 1;

  const leftLabel = mode === 'criteria'
    ? (criteria[leftCritIdx]?.label ?? '')
    : (alternatives[leftAltIdx]?.label ?? '');
  const rightLabel = mode === 'criteria'
    ? (criteria[rightCritIdx]?.label ?? '')
    : (alternatives[rightAltIdx]?.label ?? '');
  const leftDesc = mode === 'criteria'
    ? (criteria[leftCritIdx]?.description ?? '')
    : (alternatives[leftAltIdx]?.subtitle ?? '');
  const rightDesc = mode === 'criteria'
    ? (criteria[rightCritIdx]?.description ?? '')
    : (alternatives[rightAltIdx]?.subtitle ?? '');
  const leftColor = mode === 'criteria' ? criteria[leftCritIdx]?.color : undefined;
  const rightColor = mode === 'criteria' ? criteria[rightCritIdx]?.color : undefined;
  const leftNum = mode === 'criteria'
    ? `Criterion ${leftCritIdx + 1}`
    : `Alternative ${leftAltIdx + 1}`;
  const rightNum = mode === 'criteria'
    ? `Criterion ${rightCritIdx + 1}`
    : `Alternative ${rightAltIdx + 1}`;

  function handleSliderChange(p: number) {
    const saaty = sliderToSaaty(-p); // negate: slider right = right wins = left gets 1/saaty
    if (mode === 'criteria') {
      setCriteriaComparison(critPairs[critPairIdx][0], critPairs[critPairIdx][1], saaty);
    } else {
      setAltComparison(altCritIdx, altPairs[altPairIdx][0], altPairs[altPairIdx][1], saaty);
    }
  }

  function handleNext() {
    if (mode === 'criteria') {
      if (critPairIdx + 1 < critPairs.length) {
        setCritPairIdx(p => p + 1);
      } else {
        setMode('alternatives');
        setAltCritIdx(0);
        setAltPairIdx(0);
      }
    } else {
      if (altPairIdx + 1 < altPairs.length) {
        setAltPairIdx(p => p + 1);
      } else if (altCritIdx + 1 < criteria.length) {
        setAltCritIdx(c => c + 1);
        setAltPairIdx(0);
      } else {
        navigate('/step/5');
      }
    }
  }

  function handlePrev() {
    if (mode === 'criteria') {
      if (critPairIdx > 0) setCritPairIdx(p => p - 1);
    } else {
      if (altPairIdx > 0) {
        setAltPairIdx(p => p - 1);
      } else if (altCritIdx > 0) {
        setAltCritIdx(c => c - 1);
        setAltPairIdx(altPairs.length - 1);
      } else {
        setMode('criteria');
        setCritPairIdx(critPairs.length - 1);
      }
    }
  }

  const isFirst = mode === 'criteria' && critPairIdx === 0;
  const isLast = mode === 'alternatives'
    && altCritIdx === criteria.length - 1
    && altPairIdx === altPairs.length - 1;

  const pipsTotal = mode === 'criteria' ? critPairs.length : altPairs.length;
  const pipsDone = mode === 'criteria' ? critPairIdx : altPairIdx;

  // Live results
  const liveResults = useMemo(() => {
    try {
      const critMat = buildMatrix(criteria.length, criteriaComparisons);
      const critResult = computePriorities(critMat);
      if (Object.keys(altComparisons).length === 0) return { critResult, aggResult: null };
      const altMatrices = criteria.map((_, ci) => {
        const filtered: Record<string, number> = {};
        for (const [k, v] of Object.entries(altComparisons)) {
          if (k.startsWith(`${ci}_`)) filtered[k.slice(k.indexOf('_') + 1)] = v;
        }
        return buildMatrix(alternatives.length, filtered);
      });
      const aggResult = aggregate(critResult.weights, altMatrices);
      return { critResult, aggResult };
    } catch { return null; }
  }, [criteria, alternatives, criteriaComparisons, altComparisons]);

  const inconsistencyHint = useMemo(() => {
    if (!liveResults?.critResult || liveResults.critResult.CR <= 0.10) return null;
    try {
      const critMat = buildMatrix(criteria.length, criteriaComparisons);
      return findMostInconsistentPair(critMat);
    } catch { return null; }
  }, [liveResults, criteria, criteriaComparisons]);

  // Already judged (show last criteria pairs judged)
  const judgedPairs = useMemo(() => {
    const pairs: { a: string; b: string; v: number }[] = [];
    for (const [key, val] of Object.entries(criteriaComparisons)) {
      const parts = key.split('_');
      const i = parseInt(parts[0]);
      const j = parseInt(parts[1]);
      if (criteria[i] && criteria[j]) {
        pairs.push({ a: criteria[i].label, b: criteria[j].label, v: val });
      }
    }
    return pairs;
  }, [criteriaComparisons, criteria]);

  const modeLabel = mode === 'criteria'
    ? `Pairwise comparison · ${donePairs + 1} of ${totalPairs}`
    : `For "${criteria[altCritIdx]?.label}" · comparison ${donePairs + 1} of ${totalPairs}`;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', flex: 1, minHeight: 0 }}>
      {/* Main content */}
      <div style={{ overflow: 'auto', padding: '36px 28px' }}>
        {/* Header + progress pips */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 24,
        }}>
          <div>
            <div style={{
              fontSize: 12, color: 'var(--color-sub)', fontWeight: 500,
              letterSpacing: 0.3, marginBottom: 6, textTransform: 'uppercase',
            }}>
              {modeLabel}
            </div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: -0.5 }}>
              {mode === 'criteria'
                ? 'Which criterion matters more for this decision?'
                : `Which option performs better on "${criteria[altCritIdx]?.label}"?`}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginLeft: 20, marginTop: 4 }}>
            {Array.from({ length: pipsTotal }, (_, n) => (
              <div key={n} style={{
                width: 24, height: 4, borderRadius: 2,
                background: n < pipsDone
                  ? 'var(--color-accent)'
                  : n === pipsDone
                    ? 'var(--color-ink)'
                    : 'var(--color-rule)',
              }} />
            ))}
          </div>
        </div>

        {/* Comparison card */}
        <div style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-rule)',
          borderRadius: 14, padding: 28,
        }}>
          {/* Two comparison cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, alignItems: 'center' }}>
            {/* Left card */}
            <div style={{
              padding: '20px 22px', background: '#fff',
              border: `1.5px solid ${sliderValue < 0 ? 'var(--color-ink)' : 'var(--color-rule)'}`,
              borderRadius: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                {leftColor && (
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: leftColor, flexShrink: 0 }} />
                )}
                <span style={{
                  fontSize: 11, color: 'var(--color-sub)', fontWeight: 500,
                  letterSpacing: 0.3, textTransform: 'uppercase',
                }}>
                  {leftNum}
                </span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.4, marginBottom: 6, color: 'var(--color-ink)' }}>
                {leftLabel}
              </div>
              {leftDesc && (
                <div style={{ fontSize: 13, color: 'var(--color-sub)', lineHeight: 1.5 }}>{leftDesc}</div>
              )}
            </div>

            {/* VS */}
            <div style={{
              width: 32, height: 32, borderRadius: 16,
              background: 'var(--color-bg)', border: '1px solid var(--color-rule)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-muted)', fontSize: 12,
            }}>vs</div>

            {/* Right card */}
            <div style={{
              padding: '20px 22px', background: '#fff',
              border: `1.5px solid ${sliderValue > 0 ? 'var(--color-ink)' : 'var(--color-rule)'}`,
              borderRadius: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                {rightColor && (
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: rightColor, flexShrink: 0 }} />
                )}
                <span style={{
                  fontSize: 11, color: 'var(--color-sub)', fontWeight: 500,
                  letterSpacing: 0.3, textTransform: 'uppercase',
                }}>
                  {rightNum}
                </span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.4, marginBottom: 6, color: 'var(--color-ink)' }}>
                {rightLabel}
              </div>
              {rightDesc && (
                <div style={{ fontSize: 13, color: 'var(--color-sub)', lineHeight: 1.5 }}>{rightDesc}</div>
              )}
            </div>
          </div>

          {/* Slider */}
          <div style={{ marginTop: 32 }}>
            <SaatySlider
              leftLabel={leftLabel}
              rightLabel={rightLabel}
              leftColor={leftColor}
              rightColor={rightColor}
              value={sliderValue}
              onChange={handleSliderChange}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
          <button
            onClick={handlePrev}
            disabled={isFirst}
            style={{
              appearance: 'none', cursor: isFirst ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', fontSize: 13,
              padding: '8px 16px', borderRadius: 8, fontWeight: 500,
              background: '#fff', color: 'var(--color-ink)', border: '1px solid var(--color-rule)',
              opacity: isFirst ? 0.4 : 1,
            }}
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            style={{
              appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
              padding: '10px 18px', borderRadius: 8, fontWeight: 600,
              background: 'var(--color-accent)', color: '#fff', border: 'none',
            }}
          >
            {isLast ? 'View results →' : 'Save and continue →'}
          </button>
          <button
            onClick={handleNext}
            style={{
              appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
              padding: '8px 16px', borderRadius: 8, fontWeight: 500,
              background: 'transparent', border: 'none', color: 'var(--color-sub)',
            }}
          >
            Skip
          </button>
        </div>

        {/* Already judged */}
        {judgedPairs.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <div style={{
              fontSize: 12, color: 'var(--color-sub)', fontWeight: 500,
              marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.3,
            }}>
              Already judged
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {judgedPairs.slice(-6).map(({ a, b, v }) => (
                <div key={`${a}-${b}`} style={{
                  background: 'var(--color-surface)', border: '1px solid var(--color-rule)',
                  borderRadius: 999, padding: '6px 12px', fontSize: 12, color: 'var(--color-sub)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span>{a}</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-ink)', fontVariantNumeric: 'tabular-nums' }}>
                    {v >= 1 ? Math.round(v) : `1/${Math.round(1 / v)}`}
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {inconsistencyHint && (
          <p style={{ fontSize: 11, color: 'var(--color-muted)', marginTop: 12 }}>
            Hint: reconsider "{criteria[inconsistencyHint.i]?.label}" vs "{criteria[inconsistencyHint.j]?.label}"
            — suggested ratio {inconsistencyHint.suggestedValue.toFixed(2)}
          </p>
        )}
      </div>

      {/* Right sidebar */}
      <aside style={{
        background: 'var(--color-surface)',
        borderLeft: '1px solid var(--color-rule)',
        padding: '28px 24px', overflow: 'auto',
      }}>
        {/* Live ranking */}
        <div style={{
          fontSize: 11, color: 'var(--color-sub)', fontWeight: 600,
          letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 16,
        }}>
          Live ranking
        </div>

        {liveResults?.aggResult ? (
          liveResults.aggResult.ranking.map((idx, rank) => (
            <div key={idx} style={{ marginBottom: 18 }}>
              <div style={{
                display: 'flex', alignItems: 'baseline',
                justifyContent: 'space-between', marginBottom: 6,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{
                    fontSize: 11, color: 'var(--color-muted)', fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                  }}>0{rank + 1}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-ink)' }}>
                    {alternatives[idx]?.label}
                  </span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--color-ink)' }}>
                  {((liveResults.aggResult!.finalScores[idx] ?? 0) * 100).toFixed(0)}
                  <span style={{ color: 'var(--color-sub)', fontSize: 11 }}>%</span>
                </span>
              </div>
              <div style={{ height: 6, background: 'var(--color-bg)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(liveResults.aggResult!.finalScores[idx] ?? 0) * 100}%`,
                  background: rank === 0
                    ? 'var(--color-accent)'
                    : rank === 1
                      ? 'var(--color-ink)'
                      : 'var(--color-muted)',
                  borderRadius: 3,
                }} />
              </div>
            </div>
          ))
        ) : (
          <p style={{ fontSize: 13, color: 'var(--color-sub)', marginBottom: 18 }}>
            Complete more comparisons to see ranking.
          </p>
        )}

        {/* Consistency */}
        {liveResults?.critResult && (
          <div style={{
            marginTop: 8, padding: 14,
            background: 'var(--color-bg)', borderRadius: 10,
          }}>
            <div style={{
              fontSize: 11, color: 'var(--color-sub)', fontWeight: 600,
              letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 6,
            }}>
              Consistency
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--color-ink)' }}>
              CR{' '}
              <span style={{ color: liveResults.critResult.consistent ? 'var(--color-accent)' : 'oklch(0.50 0.10 30)' }}>
                {liveResults.critResult.CR.toFixed(3)}
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-sub)', marginTop: 4 }}>
              {liveResults.critResult.consistent
                ? 'Within 0.10 threshold — judgments hang together.'
                : 'Above 0.10 — consider revising some judgments.'}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
