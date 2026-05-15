// Step 2 — Criteria. Add/edit the dimensions for evaluation.
function PivotStep2Criteria({ mode = 'team' }) {
  const { bg, surface, rule, ruleStrong, ink, sub, muted, accent, accentSoft, font } = PIVOT;
  return (
    <div style={{ width: '100%', height: '100%', background: bg, color: ink,
      fontFamily: font, fontSize: 14, display: 'flex', flexDirection: 'column' }}>
      <PivotNav step={2} mode={mode} />
      <PivotStepper step={2} />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 360px',
        minHeight: 0 }}>
        <div style={{ overflow: 'auto', padding: '40px 56px', minHeight: 0 }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ fontSize: 12, color: sub, fontWeight: 500, letterSpacing: 0.4,
              textTransform: 'uppercase', marginBottom: 8 }}>Step 2 · Criteria</div>
            <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
              How will you judge each option?
            </h1>
            <p style={{ margin: '0 0 28px', fontSize: 14, color: sub, lineHeight: 1.55 }}>
              List the dimensions that matter. 3-7 criteria works best — too few oversimplifies, too many
              dilutes attention. You'll weigh them against each other in step 4.
            </p>

            <div style={{ background: surface, border: `1px solid ${rule}`, borderRadius: 12,
              overflow: 'hidden' }}>
              <div style={{ display: 'grid',
                gridTemplateColumns: '40px 1fr 2fr 80px 40px',
                fontSize: 11, color: sub, fontWeight: 500, letterSpacing: 0.3,
                textTransform: 'uppercase', padding: '12px 18px',
                borderBottom: `1px solid ${rule}`, background: bg }}>
                <span></span><span>Name</span><span>Description</span>
                <span style={{ textAlign: 'right' }}>Direction</span><span></span>
              </div>
              {PROJECT.criteria.map((c, i) => (
                <div key={c.id} style={{ display: 'grid',
                  gridTemplateColumns: '40px 1fr 2fr 80px 40px', alignItems: 'center',
                  padding: '14px 18px', borderBottom: i < PROJECT.criteria.length - 1 ? `1px solid ${rule}` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: muted, cursor: 'grab' }}>⋮⋮</span>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: c.color,
                      border: `1px solid ${ruleStrong}` }} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: sub }}>{c.desc}</div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4,
                      background: i === 1 ? 'oklch(0.95 0.04 30)' : accentSoft,
                      color: i === 1 ? 'oklch(0.50 0.10 30)' : 'oklch(0.40 0.08 155)',
                      fontWeight: 600 }}>
                      {i === 1 ? '↓ lower' : '↑ higher'}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right', color: muted }}>⋯</div>
                </div>
              ))}
              <div style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8,
                color: sub, cursor: 'pointer', borderTop: `1px solid ${rule}` }}>
                <span style={{ width: 22, height: 22, borderRadius: 11, border: `1px dashed ${ruleStrong}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</span>
                <span style={{ fontSize: 13 }}>Add criterion</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: muted }}>or paste a list</span>
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px', background: accentSoft, borderRadius: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: 9, background: accent,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700 }}>i</div>
              <div style={{ fontSize: 13, color: 'oklch(0.30 0.08 155)' }}>
                <strong>4 criteria</strong> means <strong>6 pairwise judgments</strong> in step 4.
                Adding a 5th would mean 10. Keep what's essential.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
              <button style={pBtn(false)}>← Back</button>
              <button style={pBtnAccent()}>Continue → Add alternatives</button>
            </div>
          </div>
        </div>

        <aside style={{ borderLeft: `1px solid ${rule}`, background: surface,
          padding: '36px 28px', overflow: 'auto', minHeight: 0 }}>
          <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.5,
            textTransform: 'uppercase', marginBottom: 14 }}>Tips</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 13,
            color: sub, lineHeight: 1.55 }}>
            <li style={{ paddingLeft: 16, position: 'relative', marginBottom: 10 }}>
              <span style={{ position: 'absolute', left: 0, color: accent }}>•</span>
              <strong style={{ color: ink }}>Independent.</strong> Each criterion should
              measure something the others don't.
            </li>
            <li style={{ paddingLeft: 16, position: 'relative', marginBottom: 10 }}>
              <span style={{ position: 'absolute', left: 0, color: accent }}>•</span>
              <strong style={{ color: ink }}>Comparable.</strong> All alternatives can be
              meaningfully scored on it.
            </li>
            <li style={{ paddingLeft: 16, position: 'relative', marginBottom: 10 }}>
              <span style={{ position: 'absolute', left: 0, color: accent }}>•</span>
              <strong style={{ color: ink }}>Same level.</strong> Avoid mixing strategic
              and tactical concerns.
            </li>
          </ul>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${rule}` }}>
            <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.5,
              textTransform: 'uppercase', marginBottom: 10 }}>Effort</div>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: sub }}>Pairwise comparisons</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>6</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: sub }}>Estimated time</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>~3 min</span>
            </div>
            <div style={{ height: 4, background: bg, borderRadius: 2, marginTop: 10 }}>
              <div style={{ width: '40%', height: '100%', background: accent, borderRadius: 2 }} />
            </div>
            <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>Sweet spot</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

window.PivotStep2Criteria = PivotStep2Criteria;
