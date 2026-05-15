// Step 5 — Results. Final ranking, breakdown, sensitivity, and export.
function PivotStep5Results({ mode = 'team', expert = false }) {
  const { bg, surface, rule, ruleStrong, ink, sub, muted, accent, accentSoft, font } = PIVOT;

  const altScores = {
    atlas:  { rev: 0.55, cost: 0.20, t2m: 0.30, fit: 0.50 },
    beacon: { rev: 0.30, cost: 0.30, t2m: 0.45, fit: 0.35 },
    coral:  { rev: 0.15, cost: 0.50, t2m: 0.25, fit: 0.15 },
  };
  const final = [
    { id: 'atlas', label: 'Atlas', sub: 'Billing rewrite', score: 0.464 },
    { id: 'beacon', label: 'Beacon', sub: 'Customer portal', score: 0.319 },
    { id: 'coral', label: 'Coral', sub: 'Analytics suite', score: 0.217 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: bg, color: ink,
      fontFamily: font, fontSize: 14, display: 'flex', flexDirection: 'column' }}>
      <PivotNav step={5} mode={mode} />
      <PivotStepper step={5} />

      <div style={{ flex: 1, overflow: 'auto', padding: '36px 56px', minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 28, gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, color: sub, fontWeight: 500, letterSpacing: 0.4,
              textTransform: 'uppercase', marginBottom: 8 }}>Step 5 · Results</div>
            <h1 style={{ margin: '0 0 6px', fontSize: 32, fontWeight: 600, letterSpacing: -0.6 }}>
              The math says: <span style={{ color: accent }}>Atlas</span>.
            </h1>
            <p style={{ margin: 0, fontSize: 15, color: sub, lineHeight: 1.5, maxWidth: 640 }}>
              Atlas wins on <strong style={{ color: ink }}>Revenue impact</strong> and
              <strong style={{ color: ink }}> Strategic fit</strong> — together 80% of total weight.
              Confidence is solid (CR 0.043) and the lead survives ±15% sensitivity tests.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button style={pBtn(false)}>↓ Export PDF</button>
            <button style={pBtn(false)}>Share link</button>
            <button style={pBtnAccent()}>Approve & archive</button>
          </div>
        </div>

        {/* Big winner card + others */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14,
          marginBottom: 28 }}>
          {final.map((r, i) => {
            const isWinner = i === 0;
            return (
              <div key={r.id} style={{ background: isWinner ? ink : surface,
                color: isWinner ? '#fff' : ink,
                border: `1px solid ${isWinner ? ink : rule}`, borderRadius: 14,
                padding: isWinner ? 28 : 20, position: 'relative', overflow: 'hidden' }}>
                {isWinner && (
                  <div style={{ position: 'absolute', top: 0, right: 0, padding: '6px 12px',
                    background: accent, color: '#fff', fontSize: 11, fontWeight: 600,
                    letterSpacing: 0.4, textTransform: 'uppercase',
                    borderBottomLeftRadius: 8 }}>★ Recommended</div>
                )}
                <div style={{ fontSize: 11, color: isWinner ? 'rgba(255,255,255,0.6)' : muted,
                  fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8,
                  fontVariantNumeric: 'tabular-nums' }}>Rank 0{i + 1}</div>
                <div style={{ fontSize: isWinner ? 30 : 20, fontWeight: 600,
                  letterSpacing: -0.5, marginBottom: 4 }}>{r.label}</div>
                <div style={{ fontSize: 13, color: isWinner ? 'rgba(255,255,255,0.65)' : sub,
                  marginBottom: 16 }}>{r.sub}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: isWinner ? 48 : 32, fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums', lineHeight: 1, color: isWinner ? accent : ink }}>
                    {(r.score * 100).toFixed(1)}
                  </span>
                  <span style={{ fontSize: 14, color: isWinner ? 'rgba(255,255,255,0.55)' : muted }}>%</span>
                  {!isWinner && i > 0 && (
                    <span style={{ marginLeft: 8, fontSize: 12, color: muted,
                      fontVariantNumeric: 'tabular-nums' }}>
                      −{((final[0].score - r.score) * 100).toFixed(1)} pts vs Atlas
                    </span>
                  )}
                </div>
                <div style={{ height: 6, borderRadius: 3,
                  background: isWinner ? 'rgba(255,255,255,0.15)' : bg, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${r.score * 100}%`,
                    background: isWinner ? accent : (i === 1 ? ink : muted), borderRadius: 3 }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-column: breakdown + sensitivity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
          {/* Score breakdown by criterion */}
          <div style={{ background: surface, border: `1px solid ${rule}`, borderRadius: 12,
            padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.4,
                  textTransform: 'uppercase', marginBottom: 4 }}>Score breakdown</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>How each criterion contributed</div>
              </div>
              <div style={{ display: 'flex', gap: 4, padding: 3, background: bg, borderRadius: 6 }}>
                {['Stacked', 'Heatmap'].map((m, i) => (
                  <button key={m} style={{ appearance: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 4,
                    border: 'none', background: i === 0 ? surface : 'transparent', color: ink,
                    boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.06)' : 'none' }}>{m}</button>
                ))}
              </div>
            </div>

            {/* legend */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
              {PROJECT.criteria.map((c) => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 12, color: sub }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: c.color,
                    border: `1px solid ${ruleStrong}` }} />
                  <span>{c.label}</span>
                  <span style={{ color: muted, fontVariantNumeric: 'tabular-nums' }}>
                    {(c.w * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>

            {/* stacked bars */}
            {final.map((r, i) => (
              <div key={r.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>
                    <span style={{ color: muted, marginRight: 6 }}>0{i + 1}</span>
                    {r.label}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums' }}>
                    {(r.score * 100).toFixed(1)}%
                  </span>
                </div>
                <div style={{ display: 'flex', height: 22, borderRadius: 4, overflow: 'hidden',
                  border: `1px solid ${rule}` }}>
                  {PROJECT.criteria.map((c) => {
                    const contrib = altScores[r.id][c.id] * c.w;
                    return (
                      <div key={c.id} style={{ width: `${(contrib / r.score) * 100}%`,
                        background: c.color, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: 10, color: ink, fontWeight: 500,
                        borderRight: `1px solid rgba(255,255,255,0.4)` }}>
                        {contrib > 0.06 ? `${(contrib * 100).toFixed(0)}` : ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {expert && (
              <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${rule}` }}>
                <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.4,
                  textTransform: 'uppercase', marginBottom: 10 }}>Local priority matrix</div>
                <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse',
                  fontVariantNumeric: 'tabular-nums' }}>
                  <thead>
                    <tr style={{ color: sub, fontWeight: 500 }}>
                      <th style={{ textAlign: 'left', padding: '6px 4px' }}></th>
                      {PROJECT.criteria.map((c) => (
                        <th key={c.id} style={{ textAlign: 'right', padding: '6px 8px' }}>{c.label}</th>
                      ))}
                      <th style={{ textAlign: 'right', padding: '6px 8px' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {final.map((r) => (
                      <tr key={r.id} style={{ borderTop: `1px solid ${rule}` }}>
                        <td style={{ padding: '8px 4px', fontWeight: 600 }}>{r.label}</td>
                        {PROJECT.criteria.map((c) => (
                          <td key={c.id} style={{ textAlign: 'right', padding: '8px',
                            color: ink }}>{altScores[r.id][c.id].toFixed(3)}</td>
                        ))}
                        <td style={{ textAlign: 'right', padding: '8px', fontWeight: 600 }}>
                          {r.score.toFixed(3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: surface, border: `1px solid ${rule}`, borderRadius: 12,
              padding: 18 }}>
              <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.4,
                textTransform: 'uppercase', marginBottom: 8 }}>Consistency</div>
              <div style={{ fontSize: 28, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
                marginBottom: 4 }}>
                CR <span style={{ color: accent }}>0.043</span>
              </div>
              <div style={{ fontSize: 12, color: sub, lineHeight: 1.5 }}>
                Within 0.10 threshold. Judgments are coherent — no contradictions.
              </div>
              <div style={{ height: 6, background: bg, borderRadius: 3, marginTop: 12,
                position: 'relative', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${0.043 / 0.10 * 100}%`,
                  background: accent, borderRadius: 3 }} />
                <div style={{ position: 'absolute', left: '100%', top: -2, bottom: -2, width: 1,
                  background: muted }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                fontSize: 10, color: muted, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
                <span>0</span><span>0.10 limit</span>
              </div>
            </div>

            <div style={{ background: surface, border: `1px solid ${rule}`, borderRadius: 12,
              padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.4,
                  textTransform: 'uppercase' }}>Sensitivity</div>
                <span style={{ fontSize: 11, color: muted }}>What if weights shift ±15%?</span>
              </div>

              {PROJECT.criteria.map((c) => (
                <div key={c.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between',
                    fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: sub }}>{c.label}</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums', color: ink, fontWeight: 500 }}>
                      {(c.w * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ position: 'relative', height: 6, background: bg, borderRadius: 3 }}>
                    <div style={{ position: 'absolute', left: `${(c.w - 0.15) * 100}%`,
                      width: `${0.30 * 100}%`, top: 0, height: '100%',
                      background: 'oklch(0.92 0.04 155)', borderRadius: 3 }} />
                    <div style={{ position: 'absolute', left: `${c.w * 100}%`,
                      top: -2, bottom: -2, width: 2, background: ink, transform: 'translateX(-1px)' }} />
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 14, padding: 10, background: accentSoft, borderRadius: 8,
                fontSize: 12, color: 'oklch(0.30 0.08 155)' }}>
                <strong>Atlas stays #1</strong> across all tested perturbations.
                The decision is robust.
              </div>
            </div>

            {mode === 'team' && (
              <div style={{ background: surface, border: `1px solid ${rule}`, borderRadius: 12,
                padding: 18 }}>
                <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.4,
                  textTransform: 'uppercase', marginBottom: 12 }}>Team agreement</div>
                {PROJECT.team.map((m) => (
                  <div key={m.n} style={{ display: 'flex', alignItems: 'center', gap: 10,
                    padding: '6px 0', fontSize: 13 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 12, background: m.c,
                      color: '#fff', fontSize: 10, fontWeight: 600, display: 'flex',
                      alignItems: 'center', justifyContent: 'center' }}>{m.n}</div>
                    <span style={{ flex: 1 }}>{m.name}</span>
                    <span style={{ fontSize: 11, color: 'oklch(0.40 0.08 155)', fontWeight: 600 }}>
                      ✓ Atlas
                    </span>
                  </div>
                ))}
                <div style={{ marginTop: 10, padding: '8px 10px', background: bg, borderRadius: 6,
                  fontSize: 12, color: sub }}>
                  <strong style={{ color: ink }}>4 of 4</strong> would pick Atlas individually.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

window.PivotStep5Results = PivotStep5Results;
