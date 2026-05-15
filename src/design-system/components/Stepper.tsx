import { Fragment } from 'react';
import { useAhpStore } from '../../store/useAhpStore';
import { useT } from '../../i18n/I18nContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';

function nPairs(n: number) { return (n * (n - 1)) / 2; }

export function Stepper({ currentStep }: { currentStep: number }) {
  const { criteria, alternatives } = useAhpStore();
  const { t } = useT();
  const { isMobile } = useBreakpoint();

  const STEP_LABELS = [
    t('stepGoal'),
    t('stepCriteria'),
    t('stepAlternatives'),
    t('stepCompare'),
    t('stepResults'),
  ];

  const metas = [
    '',
    `${criteria.length}`,
    `${alternatives.length}`,
    currentStep > 4 ? t('stepDone') : `0/${nPairs(criteria.length)}`,
    '',
  ];

  return (
    <div style={{
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-rule)',
      padding: isMobile ? '10px 16px' : '14px 28px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {STEP_LABELS.map((label, idx) => {
          const step = idx + 1;
          const state: 'done' | 'active' | 'next' =
            step < currentStep ? 'done' : step === currentStep ? 'active' : 'next';
          const meta = metas[idx];
          // On mobile: only show label text for the active step
          const showLabel = !isMobile || state === 'active';

          return (
            <Fragment key={label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: showLabel ? 8 : 0 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 11,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: state === 'done'
                    ? 'var(--color-accent)'
                    : state === 'active'
                      ? 'var(--color-ink)'
                      : 'transparent',
                  border: state === 'next' ? '1px solid var(--color-rule-strong)' : 'none',
                  color: state === 'next' ? 'var(--color-muted)' : '#fff',
                  fontSize: 11, fontWeight: 600, flexShrink: 0,
                }}>
                  {state === 'done' ? '✓' : step}
                </div>
                {showLabel && (
                  <div>
                    <div style={{
                      fontSize: 13,
                      fontWeight: state === 'active' ? 600 : 400,
                      color: state === 'next' ? 'var(--color-muted)' : 'var(--color-ink)',
                    }}>
                      {label}
                    </div>
                    {meta && (
                      <div style={{ fontSize: 11, color: 'var(--color-sub)' }}>{meta}</div>
                    )}
                  </div>
                )}
              </div>
              {idx < STEP_LABELS.length - 1 && (
                <div style={{
                  flex: 1, height: 1,
                  background: 'var(--color-rule)',
                  margin: isMobile ? '0 6px' : '0 18px',
                  position: 'relative', alignSelf: 'center',
                }}>
                  {state === 'done' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-accent)' }} />
                  )}
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
