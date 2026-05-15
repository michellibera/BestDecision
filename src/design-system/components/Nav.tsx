import { useNavigate } from 'react-router-dom';
import { useAhpStore } from '../../store/useAhpStore';

const TEAM = [
  { n: 'MR', c: 'oklch(0.85 0.08 60)' },
  { n: 'AK', c: 'oklch(0.82 0.08 220)' },
  { n: 'JT', c: 'oklch(0.84 0.08 140)' },
  { n: 'SD', c: 'oklch(0.83 0.08 350)' },
];

interface NavProps {
  currentStep: number;
}

export function Nav({ currentStep }: NavProps) {
  const navigate = useNavigate();
  const { goal } = useAhpStore();
  const projectName = goal.trim() || 'New Decision';

  function handleNext() {
    if (currentStep < 5) navigate(`/step/${currentStep + 1}`);
  }

  return (
    <div style={{
      height: 56,
      borderBottom: '1px solid var(--color-rule)',
      background: 'var(--color-surface)',
      display: 'flex', alignItems: 'center',
      padding: '0 28px', gap: 24, flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 22, height: 22, borderRadius: 6, background: 'var(--color-ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: 2, background: 'var(--color-accent)',
            transform: 'rotate(45deg)',
          }} />
        </div>
        <span style={{ fontWeight: 600, letterSpacing: -0.2, fontSize: 15, color: 'var(--color-ink)' }}>
          BestDecision
        </span>
      </div>

      {/* Separator */}
      <div style={{ width: 1, height: 18, background: 'var(--color-rule)' }} />

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-sub)' }}>
        <span>Workspace</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="var(--color-muted)" strokeWidth="1.5">
          <path d="M3 4l2 2 2-2" />
        </svg>
        <span style={{ color: 'var(--color-ink)', fontWeight: 500 }}>{projectName}</span>
      </div>

      {/* Right side */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Team avatars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex' }}>
            {TEAM.map((p, i) => (
              <div key={p.n} style={{
                width: 26, height: 26, borderRadius: 13,
                background: p.c, color: '#fff', fontSize: 10, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid var(--color-surface)',
                marginLeft: i ? -8 : 0,
              }}>
                {p.n}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'var(--color-sub)' }}>4 collaborators</span>
        </div>

        {/* Save button */}
        <button style={{
          appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
          padding: '8px 16px', borderRadius: 8, fontWeight: 500,
          background: '#fff', color: 'var(--color-ink)', border: '1px solid var(--color-rule)',
        }}>
          Save
        </button>

        {/* Next / Share button */}
        <button
          onClick={handleNext}
          style={{
            appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
            padding: '8px 16px', borderRadius: 8, fontWeight: 500,
            background: 'var(--color-ink)', color: '#fff', border: '1px solid var(--color-ink)',
          }}
        >
          {currentStep === 5 ? 'Share results' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
