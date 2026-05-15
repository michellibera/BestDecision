// Step 1 — Goal. Free-typed framing of the decision.
function PivotStep1Goal({ mode = 'team' }) {
  const { bg, surface, rule, ink, sub, muted, accent, accentSoft, font } = PIVOT;
  return (
    <div style={{ width: '100%', height: '100%', background: bg, color: ink,
      fontFamily: font, fontSize: 14, display: 'flex', flexDirection: 'column' }}>
      <PivotNav step={1} mode={mode} />
      <PivotStepper step={1} />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 360px',
        minHeight: 0 }}>
        <div style={{ overflow: 'auto', padding: '48px 56px', minHeight: 0 }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ fontSize: 12, color: sub, fontWeight: 500, letterSpacing: 0.4,
              textTransform: 'uppercase', marginBottom: 8 }}>Step 1 · Define the goal</div>
            <h1 style={{ margin: '0 0 12px', fontSize: 30, fontWeight: 600, letterSpacing: -0.6,
              lineHeight: 1.15 }}>What decision are you making?</h1>
            <p style={{ margin: '0 0 32px', fontSize: 15, color: sub, lineHeight: 1.55 }}>
              Frame the question in one sentence. Everything else — criteria, alternatives,
              comparisons — hangs off this. Be concrete; "pick a vendor" is better than "improve sourcing."
            </p>

            <label style={{ fontSize: 12, color: sub, fontWeight: 500, display: 'block',
              marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>The question</label>
            <div style={{ background: surface, border: `1.5px solid ${ink}`,
              borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 19, fontWeight: 500, lineHeight: 1.35 }}>
                {PROJECT.goal}<span style={{ color: muted }}>|</span>
              </div>
            </div>

            <label style={{ fontSize: 12, color: sub, fontWeight: 500, display: 'block',
              marginBottom: 6, marginTop: 24, textTransform: 'uppercase', letterSpacing: 0.3 }}>
              Context · optional
            </label>
            <div style={{ background: surface, border: `1px solid ${rule}`,
              borderRadius: 10, padding: '14px 16px', minHeight: 88 }}>
              <div style={{ fontSize: 14, color: ink, lineHeight: 1.55 }}>
                {PROJECT.goalDesc}
              </div>
            </div>

            <div style={{ marginTop: 36 }}>
              <div style={{ fontSize: 12, color: sub, fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 12 }}>
                Or start from a template
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { t: 'Vendor selection', d: 'Pick a supplier across cost, quality, risk.', icon: '◐' },
                  { t: 'Hiring decision', d: 'Rank candidates against role criteria.', icon: '◑' },
                  { t: 'Project prioritization', d: 'Sequence initiatives by value & cost.', icon: '◓', active: true },
                ].map((tmpl) => (
                  <div key={tmpl.t} style={{ background: surface,
                    border: `${tmpl.active ? 1.5 : 1}px solid ${tmpl.active ? ink : rule}`,
                    borderRadius: 10, padding: 14, cursor: 'pointer' }}>
                    <div style={{ fontSize: 18, marginBottom: 6, color: tmpl.active ? accent : muted }}>
                      {tmpl.icon}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{tmpl.t}</div>
                    <div style={{ fontSize: 12, color: sub, lineHeight: 1.4 }}>{tmpl.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
              <button style={{ ...pBtn(false), color: muted, borderColor: 'transparent' }}>Cancel</button>
              <button style={{ ...pBtnAccent() }}>Continue → Define criteria</button>
            </div>
          </div>
        </div>

        <aside style={{ borderLeft: `1px solid ${rule}`, background: surface,
          padding: '36px 28px', overflow: 'auto', minHeight: 0 }}>
          <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.5,
            textTransform: 'uppercase', marginBottom: 14 }}>What is AHP?</div>
          <p style={{ fontSize: 13, color: ink, lineHeight: 1.6, margin: '0 0 18px' }}>
            Analytic Hierarchy Process breaks a complex decision into a tree —
            <strong> goal → criteria → alternatives</strong> — and asks you to compare items
            in pairs instead of scoring them all at once.
          </p>
          <p style={{ fontSize: 13, color: sub, lineHeight: 1.6, margin: '0 0 18px' }}>
            Pivot guides you through five steps and computes a single ranking, plus a
            consistency score so you can spot contradictions before committing.
          </p>

          <div style={{ background: accentSoft, borderRadius: 10, padding: 14,
            marginTop: 24 }}>
            <div style={{ fontSize: 11, color: 'oklch(0.40 0.08 155)', fontWeight: 600,
              letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 }}>
              Estimated time
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4,
              fontVariantNumeric: 'tabular-nums' }}>~12 min</div>
            <div style={{ fontSize: 12, color: sub }}>3 alternatives × 4 criteria · 18 pairwise judgments.</div>
          </div>

          {mode === 'team' && (
            <>
              <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.5,
                textTransform: 'uppercase', marginTop: 28, marginBottom: 10 }}>Team</div>
              {PROJECT.team.map((m) => (
                <div key={m.n} style={{ display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 0', borderBottom: `1px solid ${rule}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, background: m.c,
                    color: '#fff', fontSize: 11, fontWeight: 600, display: 'flex',
                    alignItems: 'center', justifyContent: 'center' }}>{m.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: sub }}>{m.role}</div>
                  </div>
                  <div style={{ fontSize: 10, color: muted, letterSpacing: 0.4,
                    textTransform: 'uppercase' }}>Owner</div>
                </div>
              ))}
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

window.PivotStep1Goal = PivotStep1Goal;
