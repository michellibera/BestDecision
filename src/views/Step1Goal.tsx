import { useNavigate } from 'react-router-dom';
import { useAhpStore } from '../store/useAhpStore';
import { StepLayout } from '../layouts/StepLayout';
import { useT } from '../i18n/I18nContext';

export function Step1Goal() {
  const navigate = useNavigate();
  const { goal, context, setGoal, setContext } = useAhpStore();
  const { t } = useT();

  const main = (
    <div style={{ maxWidth: 720 }}>
      <div style={{
        fontSize: 12, color: 'var(--color-sub)', fontWeight: 500, letterSpacing: 0.4,
        textTransform: 'uppercase', marginBottom: 8,
      }}>
        {t('s1Label')}
      </div>
      <h1 style={{ margin: '0 0 12px', fontSize: 30, fontWeight: 600, letterSpacing: -0.6, lineHeight: 1.15 }}>
        {t('s1Title')}
      </h1>
      <p style={{ margin: '0 0 32px', fontSize: 15, color: 'var(--color-sub)', lineHeight: 1.55 }}>
        {t('s1Desc')}
      </p>

      <label style={{
        fontSize: 12, color: 'var(--color-sub)', fontWeight: 500, display: 'block',
        marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3,
      }}>
        {t('s1QuestionLabel')}
      </label>
      <div style={{
        background: 'var(--color-surface)',
        border: goal ? '1.5px solid var(--color-ink)' : '1.5px solid var(--color-rule)',
        borderRadius: 10, padding: '14px 16px',
      }}>
        <input
          value={goal}
          onChange={e => setGoal(e.target.value)}
          placeholder={t('s1QuestionPh')}
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
        {t('s1ContextLabel')}
      </label>
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-rule)',
        borderRadius: 10, padding: '14px 16px', minHeight: 88,
      }}>
        <textarea
          value={context}
          onChange={e => setContext(e.target.value)}
          placeholder={t('s1ContextPh')}
          rows={3}
          style={{
            width: '100%', background: 'transparent', border: 'none', outline: 'none',
            fontSize: 14, color: 'var(--color-ink)', lineHeight: 1.55,
            fontFamily: 'var(--font-base)', resize: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
        <button style={{
          appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
          padding: '8px 16px', borderRadius: 8, fontWeight: 500,
          background: 'transparent', color: 'var(--color-muted)', border: '1px solid transparent',
        }}>
          {t('s1Cancel')}
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
          {t('s1Continue')}
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
        {t('s1SidebarTitle')}
      </div>
      <p style={{ fontSize: 13, color: 'var(--color-ink)', lineHeight: 1.6, margin: '0 0 18px' }}>
        {t('s1AhpDesc1')}
      </p>
      <p style={{ fontSize: 13, color: 'var(--color-sub)', lineHeight: 1.6, margin: '0 0 18px' }}>
        {t('s1AhpDesc2')}
      </p>

      <div style={{ background: 'var(--color-accent-soft)', borderRadius: 10, padding: 14, marginTop: 8 }}>
        <div style={{
          fontSize: 11, color: 'var(--color-accent-ink)', fontWeight: 600,
          letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4,
        }}>
          {t('s1EstimatedTime')}
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>~5 min</div>
        <div style={{ fontSize: 12, color: 'var(--color-sub)' }}>
          {t('s1EstimatedTimeNote')}
        </div>
      </div>
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
