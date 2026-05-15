import { useNavigate } from 'react-router-dom';
import { useAhpStore, Alternative } from '../store/useAhpStore';
import { StepLayout } from '../layouts/StepLayout';
import { useT } from '../i18n/I18nContext';

function nPairs(n: number) { return (n * (n - 1)) / 2; }

const ALT_COLORS = [
  'oklch(0.92 0.06 60)',
  'oklch(0.92 0.06 220)',
  'oklch(0.92 0.06 350)',
  'oklch(0.92 0.06 140)',
  'oklch(0.92 0.06 300)',
  'oklch(0.92 0.06 30)',
  'oklch(0.92 0.06 190)',
];

export function Step3Alternatives() {
  const navigate = useNavigate();
  const { goal, criteria, alternatives, addAlternative, updateAlternative, removeAlternative } = useAhpStore();
  const { t } = useT();
  const critPairs = nPairs(criteria.length);
  const totalCompares = critPairs + criteria.length * nPairs(alternatives.length);

  const main = (
    <div style={{ maxWidth: 760 }}>
      <div style={{
        fontSize: 12, color: 'var(--color-sub)', fontWeight: 500,
        letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8,
      }}>
        {t('s3Label')}
      </div>
      <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
        {t('s3Title')}
      </h1>
      <p style={{ margin: '0 0 28px', fontSize: 14, color: 'var(--color-sub)', lineHeight: 1.55 }}>
        {t('s3Desc')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {alternatives.map((a: Alternative, i: number) => {
          const color = ALT_COLORS[i % ALT_COLORS.length];
          return (
            <div key={a.id} style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-rule)',
              borderRadius: 12, padding: 18, position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, background: color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: 'var(--color-ink)',
                }}>
                  {a.label.charAt(0).toUpperCase()}
                </div>
                <div style={{
                  fontSize: 11, color: 'var(--color-sub)', fontWeight: 500,
                  letterSpacing: 0.3, textTransform: 'uppercase',
                }}>
                  {t('s3OptionN', { n: i + 1 })}
                </div>
              </div>

              <input
                value={a.label}
                onChange={e => updateAlternative(a.id, { label: e.target.value })}
                placeholder={t('s3OptionNamePh')}
                style={{
                  display: 'block', width: '100%', background: 'transparent',
                  border: 'none', outline: 'none',
                  fontSize: 18, fontWeight: 600, marginBottom: 4,
                  color: 'var(--color-ink)', fontFamily: 'var(--font-base)',
                }}
              />
              <input
                value={a.subtitle}
                onChange={e => updateAlternative(a.id, { subtitle: e.target.value })}
                placeholder={t('s3SubtitlePh')}
                style={{
                  display: 'block', width: '100%', background: 'transparent',
                  border: 'none', outline: 'none',
                  fontSize: 13, color: 'var(--color-sub)', marginBottom: 14,
                  fontFamily: 'var(--font-base)',
                }}
              />
              <textarea
                value={a.description}
                onChange={e => updateAlternative(a.id, { description: e.target.value })}
                placeholder={t('s3DescPh')}
                rows={2}
                style={{
                  display: 'block', width: '100%', background: 'transparent',
                  border: 'none', outline: 'none',
                  fontSize: 13, color: 'var(--color-ink)', lineHeight: 1.5,
                  fontFamily: 'var(--font-base)', resize: 'none',
                }}
              />

              {alternatives.length > 2 && (
                <button
                  onClick={() => removeAlternative(a.id)}
                  style={{
                    position: 'absolute', top: 10, right: 10,
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--color-muted)', fontSize: 14, lineHeight: 1,
                  }}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}

        {/* Add alternative */}
        {alternatives.length < 7 && (
          <div
            onClick={addAlternative}
            style={{
              background: 'transparent',
              border: '1.5px dashed var(--color-rule-strong)',
              borderRadius: 12, padding: 18,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-sub)', cursor: 'pointer', minHeight: 220,
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 18,
              border: '1.5px dashed var(--color-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 8, fontSize: 18, color: 'var(--color-muted)',
            }}>+</div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{t('s3AddAlt')}</div>
            <div style={{ fontSize: 11, color: 'var(--color-muted)', marginTop: 4 }}>{t('s3UpTo7')}</div>
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
          {t('s3Info', { alts: alternatives.length, crits: criteria.length, total: totalCompares, critPairs })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
        <button
          onClick={() => navigate('/step/2')}
          style={{
            appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
            padding: '8px 16px', borderRadius: 8, fontWeight: 500,
            background: '#fff', color: 'var(--color-ink)', border: '1px solid var(--color-rule)',
          }}
        >
          {t('s3Back')}
        </button>
        <button
          onClick={() => navigate('/step/4')}
          style={{
            appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
            padding: '10px 18px', borderRadius: 8, fontWeight: 600,
            background: 'var(--color-accent)', color: '#fff', border: 'none',
          }}
        >
          {t('s3Continue')}
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
        {t('s3HierarchyTitle')}
      </div>

      <div style={{ background: 'var(--color-bg)', borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 12, color: 'var(--color-sub)', fontWeight: 500, marginBottom: 6 }}>{t('s3GoalLabel')}</div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: 'var(--color-ink)' }}>
          {goal || t('s3YourDecision')}
        </div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
          {criteria.map(c => (
            <div key={c.id} style={{
              fontSize: 11, padding: '3px 8px', borderRadius: 4,
              background: c.color, color: 'var(--color-ink)', fontWeight: 500,
            }}>
              {c.label}
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: 'var(--color-rule)', margin: '0 0 14px' }} />
        <div style={{ fontSize: 12, color: 'var(--color-sub)', fontWeight: 500, marginBottom: 6 }}>
          {t('s3AltsLabel')}
        </div>
        {alternatives.map(a => (
          <div key={a.id} style={{ fontSize: 13, padding: '4px 0', color: 'var(--color-ink)' }}>
            <strong>{a.label}</strong>
            {a.subtitle && <span style={{ color: 'var(--color-sub)' }}> · {a.subtitle}</span>}
          </div>
        ))}
      </div>
    </>
  );

  return <StepLayout main={main} sidebar={sidebar} />;
}
