// Pivot — shared design tokens + small primitives reused across screens.
// Centralizing so the desktop flow and the mobile flow stay visually locked.

const PIVOT = {
  bg: '#fafaf8',
  surface: '#ffffff',
  rule: '#ecebe7',
  ruleStrong: '#dbd9d2',
  ink: '#1a1a17',
  sub: '#7a766c',
  muted: '#a8a49a',
  accent: 'oklch(0.58 0.09 155)',
  accentInk: 'oklch(0.40 0.08 155)',
  accentSoft: 'oklch(0.94 0.04 155)',
  warm: 'oklch(0.92 0.06 60)',
  cool: 'oklch(0.92 0.06 220)',
  green: 'oklch(0.92 0.06 140)',
  pink: 'oklch(0.92 0.06 350)',
  font: '"Inter Tight", "Söhne", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
};

const PROJECT = {
  goal: 'Prioritize Q3 strategic initiatives',
  goalDesc: 'Decide which of three candidate projects to fund this quarter, given limited engineering capacity.',
  criteria: [
    { id: 'rev', label: 'Revenue impact', desc: 'Forecast contribution to ARR over 12 months.', color: 'oklch(0.92 0.06 60)', w: 0.498 },
    { id: 'cost', label: 'Cost', desc: 'Total fully-loaded delivery cost incl. ongoing support.', color: 'oklch(0.92 0.06 220)', w: 0.121 },
    { id: 't2m', label: 'Time-to-market', desc: 'Calendar weeks from kickoff to GA.', color: 'oklch(0.92 0.06 140)', w: 0.075 },
    { id: 'fit', label: 'Strategic fit', desc: 'Alignment with FY26 plan & platform direction.', color: 'oklch(0.92 0.06 350)', w: 0.306 },
  ],
  alts: [
    { id: 'atlas', label: 'Atlas', sub: 'Billing rewrite', desc: 'Replace the legacy invoicing engine.', score: 0.42 },
    { id: 'beacon', label: 'Beacon', sub: 'Customer portal', desc: 'Self-serve onboarding + admin.', score: 0.34 },
    { id: 'coral', label: 'Coral', sub: 'Analytics suite', desc: 'In-app dashboards for end users.', score: 0.24 },
  ],
  team: [
    { n: 'MR', name: 'Marta R.', role: 'PM', c: 'oklch(0.85 0.08 60)' },
    { n: 'AK', name: 'Alex K.', role: 'Eng lead', c: 'oklch(0.82 0.08 220)' },
    { n: 'JT', name: 'Jules T.', role: 'Design', c: 'oklch(0.84 0.08 140)' },
    { n: 'SD', name: 'Sam D.', role: 'Finance', c: 'oklch(0.83 0.08 350)' },
  ],
};

// Top nav (desktop)
function PivotNav({ step, mode = 'team' }) {
  const { ink, sub, rule, accent, surface, muted } = PIVOT;
  return (
    <div style={{ height: 56, borderBottom: `1px solid ${rule}`, background: surface,
      display: 'flex', alignItems: 'center', padding: `0 28px`, gap: 24, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: accent,
            transform: 'rotate(45deg)' }} />
        </div>
        <span style={{ fontWeight: 600, letterSpacing: -0.2, fontSize: 15 }}>Pivot</span>
      </div>
      <div style={{ width: 1, height: 18, background: rule }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: sub }}>
        <span>Workspace</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={muted} strokeWidth="1.5"><path d="M3 4l2 2 2-2"/></svg>
        <span style={{ color: ink, fontWeight: 500 }}>Q3 Strategic Priorities</span>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        {mode === 'team' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex' }}>
              {PROJECT.team.map((p, i) => (
                <div key={p.n} style={{ width: 26, height: 26, borderRadius: 13,
                  background: p.c, color: '#fff', fontSize: 10, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${surface}`, marginLeft: i ? -8 : 0 }}>{p.n}</div>
              ))}
            </div>
            <span style={{ fontSize: 12, color: sub }}>4 collaborators</span>
          </div>
        )}
        <button style={pBtn(false)}>Save</button>
        <button style={pBtn(true)}>{step === 5 ? 'Share results' : 'Next →'}</button>
      </div>
    </div>
  );
}

function PivotStepper({ step }) {
  const { ink, sub, rule, ruleStrong, accent, muted } = PIVOT;
  const steps = [
    { l: 'Goal', meta: '' },
    { l: 'Criteria', meta: '4' },
    { l: 'Alternatives', meta: '3' },
    { l: 'Compare', meta: step <= 4 ? `${step === 4 ? '6/6' : '0/6'}` : 'done' },
    { l: 'Results', meta: '' },
  ];
  return (
    <div style={{ background: PIVOT.surface, borderBottom: `1px solid ${rule}`,
      padding: '14px 28px', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {steps.map((s, i, arr) => {
          const state = i + 1 < step ? 'done' : i + 1 === step ? 'active' : 'next';
          return (
            <React.Fragment key={s.l}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: 11,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: state === 'done' ? accent : (state === 'active' ? ink : 'transparent'),
                  border: state === 'next' ? `1px solid ${ruleStrong}` : 'none',
                  color: state === 'next' ? muted : '#fff', fontSize: 11, fontWeight: 600 }}>
                  {state === 'done' ? '✓' : i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: state === 'active' ? 600 : 400,
                    color: state === 'next' ? muted : ink }}>{s.l}</div>
                  {s.meta && <div style={{ fontSize: 11, color: sub }}>{s.meta}</div>}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ flex: 1, height: 1, background: rule, margin: '0 18px',
                  position: 'relative', alignSelf: 'center' }}>
                  {state === 'done' && <div style={{ position: 'absolute', inset: 0,
                    background: accent }} />}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function pBtn(primary) {
  const { ink, rule } = PIVOT;
  return {
    appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
    padding: '8px 16px', borderRadius: 8, fontWeight: 500,
    background: primary ? ink : '#fff',
    color: primary ? '#fff' : ink,
    border: primary ? `1px solid ${ink}` : `1px solid ${rule}`,
  };
}

function pBtnAccent() {
  const { accent } = PIVOT;
  return {
    appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
    padding: '10px 18px', borderRadius: 8, fontWeight: 600,
    background: accent, color: '#fff', border: 'none',
  };
}

Object.assign(window, { PIVOT, PROJECT, PivotNav, PivotStepper, pBtn, pBtnAccent });
