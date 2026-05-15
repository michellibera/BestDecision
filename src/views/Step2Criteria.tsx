import { useNavigate } from 'react-router-dom';
import { useAhpStore, Criterion } from '../store/useAhpStore';
import { StepLayout } from '../layouts/StepLayout';

function nPairs(n: number) { return (n * (n - 1)) / 2; }

export function Step2Criteria() {
  const navigate = useNavigate();
  const { criteria, addCriterion, updateCriterion, removeCriterion } = useAhpStore();

  const main = (
    <div style={{ maxWidth: 760 }}>
      <div style={{
        fontSize: 12, color: 'var(--color-sub)', fontWeight: 500,
        letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8,
      }}>
        Step 2 · Criteria
      </div>
      <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
        How will you judge each option?
      </h1>
      <p style={{ margin: '0 0 28px', fontSize: 14, color: 'var(--color-sub)', lineHeight: 1.55 }}>
        List the dimensions that matter. 3–7 criteria works best — too few oversimplifies, too many
        dilutes attention. You'll weigh them against each other in step 4.
      </p>

      {/* Criteria table */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-rule)',
        borderRadius: 12, overflow: 'hidden',
      }}>
        {/* Header row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '48px 1fr 2fr 90px 40px',
          fontSize: 11, color: 'var(--color-sub)', fontWeight: 500,
          letterSpacing: 0.3, textTransform: 'uppercase',
          padding: '12px 18px', borderBottom: '1px solid var(--color-rule)',
          background: 'var(--color-bg)',
        }}>
          <span />
          <span>Name</span>
          <span>Description</span>
          <span style={{ textAlign: 'right' }}>Direction</span>
          <span />
        </div>

        {/* Criteria rows */}
        {criteria.map((c: Criterion, i: number) => (
          <div
            key={c.id}
            style={{
              display: 'grid', gridTemplateColumns: '48px 1fr 2fr 90px 40px',
              alignItems: 'center', padding: '14px 18px',
              borderBottom: i < criteria.length - 1 ? '1px solid var(--color-rule)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--color-muted)', cursor: 'grab', fontSize: 14, letterSpacing: -1 }}>⋮⋮</span>
              <div style={{
                width: 12, height: 12, borderRadius: 3,
                background: c.color, border: '1px solid var(--color-rule-strong)',
                flexShrink: 0,
              }} />
            </div>
            <input
              value={c.label}
              onChange={e => updateCriterion(c.id, { label: e.target.value })}
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 14, fontWeight: 600, color: 'var(--color-ink)',
                fontFamily: 'var(--font-base)', width: '100%',
              }}
            />
            <input
              value={c.description}
              onChange={e => updateCriterion(c.id, { description: e.target.value })}
              placeholder="Short description"
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 13, color: 'var(--color-sub)',
                fontFamily: 'var(--font-base)', width: '100%',
              }}
            />
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => updateCriterion(c.id, { direction: c.direction === 'benefit' ? 'cost' : 'benefit' })}
                style={{
                  appearance: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 600, border: 'none',
                  background: c.direction === 'benefit' ? 'var(--color-accent-soft)' : 'oklch(0.95 0.04 30)',
                  color: c.direction === 'benefit' ? 'var(--color-accent-ink)' : 'oklch(0.50 0.10 30)',
                }}
              >
                {c.direction === 'benefit' ? '↑ higher' : '↓ lower'}
              </button>
            </div>
            <div style={{ textAlign: 'right' }}>
              {criteria.length > 2 && (
                <button
                  onClick={() => removeCriterion(c.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--color-muted)', fontSize: 16, lineHeight: 1,
                    fontFamily: 'inherit',
                  }}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add criterion row */}
        {criteria.length < 9 && (
          <div
            onClick={addCriterion}
            style={{
              padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8,
              color: 'var(--color-sub)', cursor: 'pointer',
              borderTop: '1px solid var(--color-rule)',
            }}
          >
            <span style={{
              width: 22, height: 22, borderRadius: 11,
              border: '1px dashed var(--color-rule-strong)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>+</span>
            <span style={{ fontSize: 13 }}>Add criterion</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--color-muted)' }}>or paste a list</span>
          </div>
        )}
      </div>

      {/* Info box */}
      <div style={{
        marginTop: 24, display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px', background: 'var(--color-accent-soft)', borderRadius: 8,
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: 9, background: 'var(--color-accent)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, flexShrink: 0,
        }}>i</div>
        <div style={{ fontSize: 13, color: 'oklch(0.30 0.08 155)' }}>
          <strong>{criteria.length} criteria</strong> means{' '}
          <strong>{nPairs(criteria.length)} pairwise judgments</strong> in step 4.
          {' '}Keep what's essential.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
        <button
          onClick={() => navigate('/step/1')}
          style={{
            appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
            padding: '8px 16px', borderRadius: 8, fontWeight: 500,
            background: '#fff', color: 'var(--color-ink)', border: '1px solid var(--color-rule)',
          }}
        >
          ← Back
        </button>
        <button
          onClick={() => navigate('/step/3')}
          style={{
            appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
            padding: '10px 18px', borderRadius: 8, fontWeight: 600,
            background: 'var(--color-accent)', color: '#fff', border: 'none',
          }}
        >
          Continue → Add alternatives
        </button>
      </div>
    </div>
  );

  const sidebar = (
    <>
      <div style={{
        fontSize: 11, color: 'var(--color-sub)', fontWeight: 600,
        letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 14,
      }}>
        Tips
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 13, color: 'var(--color-sub)', lineHeight: 1.55 }}>
        {[
          { strong: 'Independent.', text: " Each criterion should measure something the others don't." },
          { strong: 'Comparable.', text: ' All alternatives can be meaningfully scored on it.' },
          { strong: 'Same level.', text: ' Avoid mixing strategic and tactical concerns.' },
        ].map(({ strong, text }) => (
          <li key={strong} style={{ paddingLeft: 16, position: 'relative', marginBottom: 10 }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)' }}>•</span>
            <strong style={{ color: 'var(--color-ink)' }}>{strong}</strong>
            {text}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 8, paddingTop: 20, borderTop: '1px solid var(--color-rule)' }}>
        <div style={{
          fontSize: 11, color: 'var(--color-sub)', fontWeight: 600,
          letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10,
        }}>
          Effort
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
          <span style={{ color: 'var(--color-sub)' }}>Pairwise comparisons</span>
          <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{nPairs(criteria.length)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
          <span style={{ color: 'var(--color-sub)' }}>Estimated time</span>
          <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
            ~{Math.max(1, Math.round(nPairs(criteria.length) / 2))} min
          </span>
        </div>
        <div style={{ height: 4, background: 'var(--color-bg)', borderRadius: 2, marginTop: 10 }}>
          <div style={{
            width: `${Math.min(100, (criteria.length / 7) * 100)}%`,
            height: '100%', background: 'var(--color-accent)', borderRadius: 2,
          }} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--color-muted)', marginTop: 4 }}>Sweet spot</div>
      </div>
    </>
  );

  return <StepLayout main={main} sidebar={sidebar} />;
}
