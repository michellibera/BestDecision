// Step 3 — Alternatives.
function PivotStep3Alternatives({ mode = 'team' }) {
  const { bg, surface, rule, ruleStrong, ink, sub, muted, accent, accentSoft, font } = PIVOT;
  return (
    <div style={{ width: '100%', height: '100%', background: bg, color: ink,
      fontFamily: font, fontSize: 14, display: 'flex', flexDirection: 'column' }}>
      <PivotNav step={3} mode={mode} />
      <PivotStepper step={3} />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 360px',
        minHeight: 0 }}>
        <div style={{ overflow: 'auto', padding: '40px 56px', minHeight: 0 }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ fontSize: 12, color: sub, fontWeight: 500, letterSpacing: 0.4,
              textTransform: 'uppercase', marginBottom: 8 }}>Step 3 · Alternatives</div>
            <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
              What are you choosing between?
            </h1>
            <p style={{ margin: '0 0 28px', fontSize: 14, color: sub, lineHeight: 1.55 }}>
              The candidate options. They should all be feasible and worth comparing — drop
              anything you'd never pick before you start judging.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {PROJECT.alts.map((a, i) => (
                <div key={a.id} style={{ background: surface, border: `1px solid ${rule}`,
                  borderRadius: 12, padding: 18, position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8,
                      background: ['oklch(0.92 0.06 60)', 'oklch(0.92 0.06 220)', 'oklch(0.92 0.06 350)'][i],
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: ink }}>
                      {a.label[0]}
                    </div>
                    <div style={{ fontSize: 11, color: sub, fontWeight: 500, letterSpacing: 0.3,
                      textTransform: 'uppercase' }}>Option {i + 1}</div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{a.label}</div>
                  <div style={{ fontSize: 13, color: sub, marginBottom: 14 }}>{a.sub}</div>
                  <div style={{ fontSize: 13, color: ink, lineHeight: 1.5 }}>{a.desc}</div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                    {[['Owner', a.label === 'Atlas' ? 'AK' : a.label === 'Beacon' ? 'JT' : 'MR'],
                      ['Status', 'Proposed']].map(([k, v]) => (
                      <div key={k} style={{ fontSize: 11, color: sub,
                        padding: '3px 8px', background: bg, borderRadius: 4 }}>
                        {k} <strong style={{ color: ink, marginLeft: 4 }}>{v}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ background: 'transparent', border: `1.5px dashed ${ruleStrong}`,
                borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', color: sub, cursor: 'pointer',
                minHeight: 220 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, border: `1.5px dashed ${muted}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8,
                  fontSize: 18, color: muted }}>+</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Add alternative</div>
                <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>up to 7</div>
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px', background: accentSoft, borderRadius: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: 9, background: accent,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700 }}>i</div>
              <div style={{ fontSize: 13, color: 'oklch(0.30 0.08 155)' }}>
                <strong>3 alternatives × 4 criteria</strong> means
                <strong> 12 alternative comparisons</strong> in step 4 (plus the 6 criteria comparisons).
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
              <button style={pBtn(false)}>← Back</button>
              <button style={pBtnAccent()}>Continue → Compare criteria</button>
            </div>
          </div>
        </div>

        <aside style={{ borderLeft: `1px solid ${rule}`, background: surface,
          padding: '36px 28px', overflow: 'auto', minHeight: 0 }}>
          <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.5,
            textTransform: 'uppercase', marginBottom: 14 }}>Hierarchy preview</div>

          <div style={{ background: bg, borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 12, color: sub, fontWeight: 500, marginBottom: 6 }}>Goal</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
              Q3 strategic priorities
            </div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
              {PROJECT.criteria.map((c) => (
                <div key={c.id} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4,
                  background: c.color, color: ink, fontWeight: 500 }}>{c.label}</div>
              ))}
            </div>
            <div style={{ height: 1, background: rule, margin: '0 0 14px' }} />
            <div style={{ fontSize: 12, color: sub, fontWeight: 500, marginBottom: 6 }}>
              Alternatives
            </div>
            {PROJECT.alts.map((a) => (
              <div key={a.id} style={{ fontSize: 13, padding: '4px 0' }}>
                <strong>{a.label}</strong>
                <span style={{ color: sub }}> · {a.sub}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

window.PivotStep3Alternatives = PivotStep3Alternatives;
