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
        <span style={{ fontWeight: 600, letterSpacing: -0.2, fontSize: 15, color: 'var(--color-ink)' }}>
          BestDecision
        </span>
      </div>

      {/* Separator */}
      <div style={{ width: 1, height: 18, background: 'var(--color-rule)' }} />

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-sub)' }}>
        <span style={{ color: 'var(--color-ink)', fontWeight: 500 }}>{projectName}</span>
      </div>

      {/* Right side */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Lang switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--color-sub)' }}>EN PL</span>
        </div>
      </div>
    </div>
  );
}
