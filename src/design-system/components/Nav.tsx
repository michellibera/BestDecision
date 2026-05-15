import { useNavigate } from 'react-router-dom';
import { useAhpStore } from '../../store/useAhpStore';
import { useT } from '../../i18n/I18nContext';
import { Lang } from '../../i18n/translations';

interface NavProps {
  currentStep: number;
}

export function Nav({ currentStep: _currentStep }: NavProps) {
  const navigate = useNavigate();
  const { goal } = useAhpStore();
  const { lang, setLang, t } = useT();
  const projectName = goal.trim() || t('newDecision');

  return (
    <div style={{
      height: 56,
      borderBottom: '1px solid var(--color-rule)',
      background: 'var(--color-surface)',
      display: 'flex', alignItems: 'center',
      padding: '0 28px', gap: 24, flexShrink: 0,
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('/step/1')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
      >
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
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
        {(['en', 'pl'] as Lang[]).map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              appearance: 'none', fontFamily: 'inherit', cursor: 'pointer',
              fontSize: 12, fontWeight: lang === l ? 700 : 400,
              padding: '3px 7px', borderRadius: 5, border: 'none',
              background: lang === l ? 'var(--color-ink)' : 'transparent',
              color: lang === l ? '#fff' : 'var(--color-sub)',
              letterSpacing: 0.3, textTransform: 'uppercase',
            }}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
