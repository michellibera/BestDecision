import { useNavigate } from 'react-router-dom';
import { useAhpStore } from '../store/useAhpStore';
import { StepLayout } from '../layouts/StepLayout';

const TEMPLATES = [
  { t: 'Vendor selection', d: 'Pick a supplier across cost, quality, risk.', icon: '◐' },
  { t: 'Hiring decision', d: 'Rank candidates against role criteria.', icon: '◑' },
  { t: 'Project prioritization', d: 'Sequence initiatives by value & cost.', icon: '◓' },
];

const TEAM = [
  { n: 'MR', name: 'Marta R.', role: 'PM', c: 'oklch(0.85 0.08 60)' },
  { n: 'AK', name: 'Alex K.', role: 'Eng lead', c: 'oklch(0.82 0.08 220)' },
  { n: 'JT', name: 'Jules T.', role: 'Design', c: 'oklch(0.84 0.08 140)' },
  { n: 'SD', name: 'Sam D.', role: 'Finance', c: 'oklch(0.83 0.08 350)' },
];

export function Step1Goal() {
  const navigate = useNavigate();
  const { goal, context, setGoal, setContext } = useAhpStore();

  const main = (
    <div style={{ maxWidth: 720 }}>
      <div style={{
        fontSize: 12, color: 'var(--color-sub)', fontWeight: 500, letterSpacing: 0.4,
        textTransform: 'uppercase', marginBottom: 8,
      }}>
        Step 1 · Define the goal
      </div>
      <h1 style={{ margin: '0 0 12px', fontSize: 30, fontWeight: 600, letterSpacing: -0.6, lineHeight: 1.15 }}>
        What decision are you making?
      </h1>
      <p style={{ margin: '0 0 32px', fontSize: 15, color: 'var(--color-sub)', lineHeight: 1.55 }}>
        Frame the question in one sentence. Everything else — criteria, alternatives,
        comparisons — hangs off this. Be concrete; "pick a vendor" is better than "improve sourcing."
      </p>

      <label style={{
        fontSize: 12, color: 'var(--color-sub)', fontWeight: 500, display: 'block',
        marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3,
      }}>
        The question
      </label>
      <div style={{
        background: 'var(--color-surface)',
        border: goal ? '1.5px solid var(--color-ink)' : '1.5px solid var(--color-rule)',
        borderRadius: 10, padding: '14px 16px',
      }}>
        <input
          value={goal}
          onChange={e => setGoal(e.target.value)}
          placeholder="e.g. Prioritize Q3 strategic initiatives"
          style={{
            width: '100%', background: 'transparent', border: 'none', outline: 'none',
            fontSize: 19, fontWeight: 500, lineHeight: 1.35, color: 'var(--color-ink)',
            fontFamily: 'var(--font-base)',
          }}
        />
      </div>

      <label style={{
        fontSize: 12, color: 'var(--color-sub)', fontWeight: 500, display: 'block',
        marginBottom: 6, marginTop: 24, textTransform: 'uppercase', letterSpacing: 0.3,
      }}>
        Context · optional
      </label>
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-rule)',
        borderRadius: 10, padding: '14px 16px', minHeight: 88,
      }}>
        <textarea
          value={context}
          onChange={e => setContext(e.target.value)}
          placeholder="Additional background or constraints…"
          rows={3}
          style={{
            width: '100%', background: 'transparent', border: 'none', outline: 'none',
            fontSize: 14, color: 'var(--color-ink)', lineHeight: 1.55,
            fontFamily: 'var(--font-base)', resize: 'none',
          }}
        />
      </div>

      <div style={{ marginTop: 36 }}>
        <div style={{
          fontSize: 12, color: 'var(--color-sub)', fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 12,
        }}>
          Or start from a template
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {TEMPLATES.map(tmpl => (
            <div
              key={tmpl.t}
              onClick={() => setGoal(tmpl.t)}
              style={{
                background: 'var(--color-surface)',
                border: goal === tmpl.t ? '1.5px solid var(--color-ink)' : '1px solid var(--color-rule)',
                borderRadius: 10, padding: 14, cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 6, color: goal === tmpl.t ? 'var(--color-accent)' : 'var(--color-muted)' }}>
                {tmpl.icon}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2, color: 'var(--color-ink)' }}>{tmpl.t}</div>
              <div style={{ fontSize: 12, color: 'var(--color-sub)', lineHeight: 1.4 }}>{tmpl.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
        <button style={{
          appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
          padding: '8px 16px', borderRadius: 8, fontWeight: 500,
          background: 'transparent', color: 'var(--color-muted)', border: '1px solid transparent',
        }}>
          Cancel
        </button>
        <button
          onClick={() => navigate('/step/2')}
          disabled={!goal.trim()}
          style={{
            appearance: 'none', cursor: goal.trim() ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit', fontSize: 13,
            padding: '10px 18px', borderRadius: 8, fontWeight: 600,
            background: 'var(--color-accent)', color: '#fff', border: 'none',
            opacity: goal.trim() ? 1 : 0.4,
          }}
        >
          Continue → Define criteria
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
        What is AHP?
      </div>
      <p style={{ fontSize: 13, color: 'var(--color-ink)', lineHeight: 1.6, margin: '0 0 18px' }}>
        Analytic Hierarchy Process breaks a complex decision into a tree —
        <strong> goal → criteria → alternatives</strong> — and asks you to compare items
        in pairs instead of scoring them all at once.
      </p>
      <p style={{ fontSize: 13, color: 'var(--color-sub)', lineHeight: 1.6, margin: '0 0 18px' }}>
        BestDecision guides you through five steps and computes a single ranking, plus a
        consistency score so you can spot contradictions before committing.
      </p>

      <div style={{ background: 'var(--color-accent-soft)', borderRadius: 10, padding: 14, marginTop: 8 }}>
        <div style={{
          fontSize: 11, color: 'var(--color-accent-ink)', fontWeight: 600,
          letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4,
        }}>
          Estimated time
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>~12 min</div>
        <div style={{ fontSize: 12, color: 'var(--color-sub)' }}>
          3 alternatives × 4 criteria · 18 pairwise judgments.
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--color-sub)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 4, marginBottom: 10 }}>
        Team
      </div>
      {TEAM.map(m => (
        <div key={m.n} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 0', borderBottom: '1px solid var(--color-rule)',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 14, background: m.c,
            color: '#fff', fontSize: 11, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {m.n}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{m.name}</div>
            <div style={{ fontSize: 11, color: 'var(--color-sub)' }}>{m.role}</div>
          </div>
          <div style={{ fontSize: 10, color: 'var(--color-muted)', letterSpacing: 0.4, textTransform: 'uppercase' }}>
            Owner
          </div>
        </div>
      ))}
    </>
  );

  return (
    <StepLayout
      main={main}
      sidebar={sidebar}
      mainPadding="48px 56px"
    />
  );
}
