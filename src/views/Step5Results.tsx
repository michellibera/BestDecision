import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAhpStore } from '../store/useAhpStore';
import { computePriorities, buildMatrix, aggregate, analyzeSensitivity } from '../lib/ahp';

const ALT_COLORS = [
  'oklch(0.92 0.06 60)',
  'oklch(0.92 0.06 220)',
  'oklch(0.92 0.06 350)',
  'oklch(0.92 0.06 140)',
  'oklch(0.92 0.06 300)',
  'oklch(0.92 0.06 30)',
  'oklch(0.92 0.06 190)',
];

export function Step5Results() {
  const navigate = useNavigate();
  const { criteria, alternatives, criteriaComparisons, altComparisons, reset } = useAhpStore();

  const results = useMemo(() => {
    if (criteria.length < 2 || alternatives.length < 2) return null;
    try {
      const criteriaMatrix = buildMatrix(criteria.length, criteriaComparisons);
      const { weights: cWeights, CR: critCR, consistent: critConsistent } = computePriorities(criteriaMatrix);

      const altMatrices = criteria.map((_, ci) => {
        const filtered: Record<string, number> = {};
        for (const [k, v] of Object.entries(altComparisons)) {
          if (k.startsWith(`${ci}_`)) filtered[k.slice(k.indexOf('_') + 1)] = v;
        }
        return buildMatrix(alternatives.length, filtered);
      });

      const agg = aggregate(cWeights, altMatrices);
      const sensitivity = analyzeSensitivity(cWeights, altMatrices);

      return { cWeights, critCR, critConsistent, ...agg, sensitivity };
    } catch { return null; }
  }, [criteria, alternatives, criteriaComparisons, altComparisons]);

  if (!results) {
    return (
      <div style={{ flex: 1, overflow: 'auto', padding: '36px 56px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', paddingTop: 60, textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-ink)' }}>Not enough data</h2>
          <p style={{ color: 'var(--color-sub)' }}>Please complete the comparisons in step 4 first.</p>
          <button
            onClick={() => navigate('/step/4')}
            style={{
              appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
              padding: '10px 18px', borderRadius: 8, fontWeight: 600,
              background: 'var(--color-accent)', color: '#fff', border: 'none',
            }}
          >
            ← Go to comparisons
          </button>
        </div>
      </div>
    );
  }

  const winner = results.ranking[0];
  const winnerAlt = alternatives[winner];
  const winnerScore = results.finalScores[winner];

  const final = results.ranking.map(idx => ({
    idx,
    alt: alternatives[idx],
    score: results.finalScores[idx],
  }));

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '36px 56px', minHeight: 0 }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: 28, gap: 24,
      }}>
        <div>
          <div style={{
            fontSize: 12, color: 'var(--color-sub)', fontWeight: 500,
            letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8,
          }}>
            Step 5 · Results
          </div>
          <h1 style={{ margin: '0 0 6px', fontSize: 32, fontWeight: 600, letterSpacing: -0.6, color: 'var(--color-ink)' }}>
            The math says:{' '}
            <span style={{ color: 'var(--color-accent)' }}>{winnerAlt?.label}</span>.
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: 'var(--color-sub)', lineHeight: 1.5, maxWidth: 640 }}>
            {winnerAlt?.label} leads with a score of{' '}
            <strong style={{ color: 'var(--color-ink)' }}>{(winnerScore * 100).toFixed(1)}%</strong>.
            {' '}Consistency ratio CR = {results.critCR.toFixed(3)}{' '}
            {results.critConsistent ? '— judgments are coherent.' : '— consider revising some judgments.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button style={{
            appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
            padding: '8px 16px', borderRadius: 8, fontWeight: 500,
            background: '#fff', color: 'var(--color-ink)', border: '1px solid var(--color-rule)',
          }}>
            ↓ Export PDF
          </button>
          <button style={{
            appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
            padding: '8px 16px', borderRadius: 8, fontWeight: 500,
            background: '#fff', color: 'var(--color-ink)', border: '1px solid var(--color-rule)',
          }}>
            Share link
          </button>
          <button
            onClick={() => { reset(); navigate('/step/1'); }}
            style={{
              appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
              padding: '8px 16px', borderRadius: 8, fontWeight: 600,
              background: 'var(--color-accent)', color: '#fff', border: 'none',
            }}
          >
            Start over
          </button>
        </div>
      </div>

      {/* Result cards (2fr 1fr 1fr) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: final.length === 1 ? '1fr' : final.length === 2 ? '2fr 1fr' : '2fr 1fr 1fr',
        gap: 14, marginBottom: 28,
      }}>
        {final.slice(0, 3).map(({ idx, alt, score }, i) => {
          const isWinner = i === 0;
          return (
            <div key={idx} style={{
              background: isWinner ? 'var(--color-ink)' : 'var(--color-surface)',
              color: isWinner ? '#fff' : 'var(--color-ink)',
              border: `1px solid ${isWinner ? 'var(--color-ink)' : 'var(--color-rule)'}`,
              borderRadius: 14,
              padding: isWinner ? 28 : 20,
              position: 'relative', overflow: 'hidden',
            }}>
              {isWinner && (
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  padding: '6px 12px', background: 'var(--color-accent)',
                  color: '#fff', fontSize: 11, fontWeight: 600,
                  letterSpacing: 0.4, textTransform: 'uppercase',
                  borderBottomLeftRadius: 8,
                }}>
                  ★ Recommended
                </div>
              )}
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
                marginBottom: 8, fontVariantNumeric: 'tabular-nums',
                color: isWinner ? 'rgba(255,255,255,0.6)' : 'var(--color-muted)',
              }}>
                Rank 0{i + 1}
              </div>
              <div style={{
                fontSize: isWinner ? 30 : 20, fontWeight: 600,
                letterSpacing: -0.5, marginBottom: 4,
              }}>
                {alt?.label}
              </div>
              {alt?.subtitle && (
                <div style={{
                  fontSize: 13, marginBottom: 16,
                  color: isWinner ? 'rgba(255,255,255,0.65)' : 'var(--color-sub)',
                }}>
                  {alt.subtitle}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
                <span style={{
                  fontSize: isWinner ? 48 : 32, fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums', lineHeight: 1,
                  color: isWinner ? 'var(--color-accent)' : 'var(--color-ink)',
                }}>
                  {(score * 100).toFixed(1)}
                </span>
                <span style={{ fontSize: 14, color: isWinner ? 'rgba(255,255,255,0.55)' : 'var(--color-muted)' }}>%</span>
                {!isWinner && i > 0 && (
                  <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--color-muted)', fontVariantNumeric: 'tabular-nums' }}>
                    −{((final[0].score - score) * 100).toFixed(1)} pts
                  </span>
                )}
              </div>
              <div style={{
                height: 6, borderRadius: 3, overflow: 'hidden',
                background: isWinner ? 'rgba(255,255,255,0.15)' : 'var(--color-bg)',
              }}>
                <div style={{
                  height: '100%', width: `${score * 100}%`,
                  background: isWinner
                    ? 'var(--color-accent)'
                    : i === 1 ? 'var(--color-ink)' : 'var(--color-muted)',
                  borderRadius: 3,
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-column: breakdown + right panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
        {/* Score breakdown */}
        <div style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-rule)',
          borderRadius: 12, padding: 22,
        }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 11, color: 'var(--color-sub)', fontWeight: 600,
              letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4,
            }}>
              Score breakdown
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-ink)' }}>
              How each criterion contributed
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
            {criteria.map((c, ci) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-sub)' }}>
                <div style={{
                  width: 12, height: 12, borderRadius: 3,
                  background: c.color, border: '1px solid var(--color-rule-strong)',
                }} />
                <span>{c.label}</span>
                <span style={{ color: 'var(--color-muted)', fontVariantNumeric: 'tabular-nums' }}>
                  {((results.cWeights[ci] ?? 0) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>

          {/* Stacked bars */}
          {final.slice(0, 3).map(({ idx, alt, score }, i) => (
            <div key={idx} style={{ marginBottom: 14 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'baseline', marginBottom: 6,
              }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-ink)' }}>
                  <span style={{ color: 'var(--color-muted)', marginRight: 6 }}>0{i + 1}</span>
                  {alt?.label}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--color-ink)' }}>
                  {(score * 100).toFixed(1)}%
                </span>
              </div>
              <div style={{
                display: 'flex', height: 22, borderRadius: 4,
                overflow: 'hidden', border: '1px solid var(--color-rule)',
              }}>
                {criteria.map((c, ci) => {
                  const localW = results.altPrioritiesPerCriterion[ci]?.[idx] ?? 0;
                  const contrib = (results.cWeights[ci] ?? 0) * localW;
                  const pct = score > 0 ? (contrib / score) * 100 : 0;
                  return (
                    <div key={c.id} style={{
                      width: `${pct}%`,
                      background: c.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, color: 'var(--color-ink)', fontWeight: 500,
                      borderRight: '1px solid rgba(255,255,255,0.4)',
                    }}>
                      {contrib > 0.06 ? `${(contrib * 100).toFixed(0)}` : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Consistency */}
          <div style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-rule)',
            borderRadius: 12, padding: 18,
          }}>
            <div style={{
              fontSize: 11, color: 'var(--color-sub)', fontWeight: 600,
              letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8,
            }}>
              Consistency
            </div>
            <div style={{
              fontSize: 28, fontWeight: 600,
              fontVariantNumeric: 'tabular-nums', marginBottom: 4, color: 'var(--color-ink)',
            }}>
              CR{' '}
              <span style={{ color: results.critConsistent ? 'var(--color-accent)' : 'oklch(0.50 0.10 30)' }}>
                {results.critCR.toFixed(3)}
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-sub)', lineHeight: 1.5 }}>
              {results.critConsistent
                ? 'Within 0.10 threshold. Judgments are coherent — no contradictions.'
                : 'Above 0.10 threshold. Consider revisiting step 4.'}
            </div>
            <div style={{
              height: 6, background: 'var(--color-bg)', borderRadius: 3, marginTop: 12,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (results.critCR / 0.10) * 100)}%`,
                background: results.critConsistent ? 'var(--color-accent)' : 'oklch(0.50 0.10 30)',
                borderRadius: 3,
              }} />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 10, color: 'var(--color-muted)', marginTop: 4,
              fontVariantNumeric: 'tabular-nums',
            }}>
              <span>0</span><span>0.10 limit</span>
            </div>
          </div>

          {/* Sensitivity */}
          <div style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-rule)',
            borderRadius: 12, padding: 18,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 12,
            }}>
              <div style={{
                fontSize: 11, color: 'var(--color-sub)', fontWeight: 600,
                letterSpacing: 0.4, textTransform: 'uppercase',
              }}>
                Sensitivity
              </div>
              <span style={{ fontSize: 11, color: 'var(--color-muted)' }}>What if weights shift?</span>
            </div>

            {results.sensitivity.sensitivity.map(s => {
              const c = criteria[s.criterionIdx];
              const w = results.cWeights[s.criterionIdx] ?? 0;
              return (
                <div key={s.criterionIdx} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: 'var(--color-sub)' }}>{c?.label}</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--color-ink)', fontWeight: 500 }}>
                      {(w * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ position: 'relative', height: 6, background: 'var(--color-bg)', borderRadius: 3 }}>
                    <div style={{
                      position: 'absolute',
                      left: `${Math.max(0, w - 0.15) * 100}%`,
                      width: `${Math.min(30, (1 - Math.max(0, w - 0.15)) * 100)}%`,
                      top: 0, height: '100%',
                      background: 'oklch(0.92 0.04 155)', borderRadius: 3,
                    }} />
                    <div style={{
                      position: 'absolute',
                      left: `${w * 100}%`,
                      top: -2, bottom: -2, width: 2,
                      background: 'var(--color-ink)',
                      transform: 'translateX(-1px)',
                    }} />
                  </div>
                </div>
              );
            })}

            <div style={{
              marginTop: 14, padding: 10, background: 'var(--color-accent-soft)',
              borderRadius: 8, fontSize: 12, color: 'oklch(0.30 0.08 155)',
            }}>
              {results.sensitivity.sensitivity.every(s => s.minChangeToPFlipWinner == null)
                ? <><strong>{winnerAlt?.label} stays #1</strong> across all tested perturbations. The decision is robust.</>
                : <>Some criteria shifts could change the winner — review sensitivity above.</>
              }
            </div>
          </div>

          {/* Criteria weights */}
          <div style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-rule)',
            borderRadius: 12, padding: 18,
          }}>
            <div style={{
              fontSize: 11, color: 'var(--color-sub)', fontWeight: 600,
              letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 12,
            }}>
              Criteria weights
            </div>
            {criteria.map((c, i) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13 }}>
                <div style={{
                  width: 12, height: 12, borderRadius: 3,
                  background: c.color, flexShrink: 0,
                  border: '1px solid var(--color-rule-strong)',
                }} />
                <span style={{ flex: 1, color: 'var(--color-sub)' }}>{c.label}</span>
                <span style={{ fontWeight: 600, color: 'var(--color-ink)', fontVariantNumeric: 'tabular-nums' }}>
                  {((results.cWeights[i] ?? 0) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit comparisons button */}
      <div style={{ marginTop: 28 }}>
        <button
          onClick={() => navigate('/step/4')}
          style={{
            appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
            padding: '8px 16px', borderRadius: 8, fontWeight: 500,
            background: '#fff', color: 'var(--color-ink)', border: '1px solid var(--color-rule)',
          }}
        >
          ← Edit comparisons
        </button>
      </div>
    </div>
  );
}
