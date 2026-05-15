// Step 4 — Compare. The Saaty 1-9 slider, this is the heart of the flow.
function PivotStep4Compare({ mode = 'team', expert = false }) {
  const { bg, surface, rule, ruleStrong, ink, sub, muted, accent, accentSoft, font } = PIVOT;

  const [val, setVal] = React.useState(3);
  const sliderRef = React.useRef(null);
  const drag = (e) => {
    e.preventDefault();
    const r = sliderRef.current.getBoundingClientRect();
    const move = (ev) => {
      const x = ((ev.clientX ?? ev.touches?.[0]?.clientX) - r.left) / r.width;
      const v = Math.max(-9, Math.min(9, (x - 0.5) * 18));
      setVal(Math.round(v));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    move(e);
  };
  const sliderPos = ((val + 9) / 18) * 100;
  const verbal = (() => {
    const a = Math.abs(val);
    if (a === 0) return 'Equally important';
    if (a <= 2) return 'Slightly more important';
    if (a <= 4) return 'Moderately more important';
    if (a <= 6) return 'Strongly more important';
    if (a <= 8) return 'Very strongly more important';
    return 'Extremely more important';
  })();

  return (
    <div style={{ width: '100%', height: '100%', background: bg, color: ink,
      fontFamily: font, fontSize: 14, display: 'flex', flexDirection: 'column' }}>
      <PivotNav step={4} mode={mode} />
      <PivotStepper step={4} />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 320px',
        minHeight: 0 }}>
        <div style={{ overflow: 'auto', padding: '36px 28px', minHeight: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 12, color: sub, fontWeight: 500, letterSpacing: 0.3,
                marginBottom: 6, textTransform: 'uppercase' }}>
                Pairwise comparison · 3 of 6
              </div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: -0.5 }}>
                Which criterion matters more for this decision?
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} style={{ width: 24, height: 4, borderRadius: 2,
                  background: n < 3 ? accent : (n === 3 ? ink : rule) }} />
              ))}
            </div>
          </div>

          <div style={{ background: surface, border: `1px solid ${rule}`, borderRadius: 14,
            padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr',
              gap: 20, alignItems: 'center' }}>
              <div style={{ padding: '20px 22px', background: '#fff',
                border: `1.5px solid ${val > 0 ? ink : rule}`, borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'oklch(0.92 0.06 60)' }} />
                  <span style={{ fontSize: 11, color: sub, fontWeight: 500, letterSpacing: 0.3,
                    textTransform: 'uppercase' }}>Criterion 1</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.4, marginBottom: 6 }}>Revenue impact</div>
                <div style={{ fontSize: 13, color: sub, lineHeight: 1.5 }}>
                  Forecast contribution to ARR over 12 months.
                </div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: bg,
                border: `1px solid ${rule}`, display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: muted, fontSize: 12 }}>vs</div>
              <div style={{ padding: '20px 22px', background: '#fff',
                border: `1.5px solid ${val < 0 ? ink : rule}`, borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'oklch(0.92 0.06 220)' }} />
                  <span style={{ fontSize: 11, color: sub, fontWeight: 500, letterSpacing: 0.3,
                    textTransform: 'uppercase' }}>Criterion 2</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.4, marginBottom: 6 }}>Cost</div>
                <div style={{ fontSize: 13, color: sub, lineHeight: 1.5 }}>
                  Total fully-loaded delivery cost incl. ongoing support.
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <div ref={sliderRef} onPointerDown={drag}
                style={{ position: 'relative', height: 44, cursor: 'pointer', userSelect: 'none' }}>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 21, height: 2,
                  background: rule, borderRadius: 1 }} />
                <div style={{ position: 'absolute', top: 21, height: 2, borderRadius: 1,
                  background: val > 0 ? 'oklch(0.92 0.06 60)' : (val < 0 ? 'oklch(0.92 0.06 220)' : 'transparent'),
                  left: val > 0 ? '50%' : `${sliderPos}%`,
                  right: val < 0 ? '50%' : `${100 - sliderPos}%` }} />
                <div style={{ position: 'absolute', left: '50%', top: 17, width: 2, height: 10,
                  background: ruleStrong, transform: 'translateX(-1px)' }} />
                {[-9, -7, -5, -3, 3, 5, 7, 9].map((n) => (
                  <div key={n} style={{ position: 'absolute', left: `${((n + 9) / 18) * 100}%`,
                    top: 19, width: 1, height: 6, background: muted, transform: 'translateX(-0.5px)' }} />
                ))}
                <div style={{ position: 'absolute', left: `${sliderPos}%`, top: 22,
                  transform: 'translate(-50%, -50%)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, background: surface,
                    border: `2px solid ${ink}`, boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: ink }}>
                    {Math.abs(val) || 1}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                fontSize: 11, color: sub, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
                <span>9 ← Cost dominates</span><span>1 · equal</span><span>Revenue dominates → 9</span>
              </div>

              <div style={{ marginTop: 22, padding: '14px 18px', background: accentSoft,
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'oklch(0.40 0.08 155)', fontWeight: 600,
                    letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 2 }}>
                    Your judgment
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>
                    {val === 0 ? <>Both criteria are <em>equally important</em>.</> : (
                      <><strong>{val > 0 ? 'Revenue impact' : 'Cost'}</strong>{' is '}
                      <em>{verbal.toLowerCase()}</em>{' than '}
                      <strong>{val > 0 ? 'cost' : 'revenue impact'}</strong>.</>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 600, color: ink, fontVariantNumeric: 'tabular-nums' }}>
                  {val > 0 ? `${val}` : val < 0 ? `1/${Math.abs(val)}` : '1'}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
            <button style={pBtn(false)}>← Previous</button>
            <button style={pBtnAccent()}>Save and continue →</button>
            <button style={{ ...pBtn(false), borderColor: 'transparent', color: sub }}>Skip</button>
          </div>

          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 12, color: sub, fontWeight: 500, marginBottom: 10,
              textTransform: 'uppercase', letterSpacing: 0.3 }}>Already judged</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['Revenue', 'Time-to-market', '5'], ['Revenue', 'Strategic fit', '4']].map(([a, b, v]) => (
                <div key={a + b} style={{ background: surface, border: `1px solid ${rule}`,
                  borderRadius: 999, padding: '6px 12px', fontSize: 12, color: sub,
                  display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{a}</span>
                  <span style={{ fontWeight: 600, color: ink, fontVariantNumeric: 'tabular-nums' }}>{v}</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside style={{ borderLeft: `1px solid ${rule}`, background: surface,
          padding: '28px 24px', overflow: 'auto', minHeight: 0 }}>
          <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.5,
            textTransform: 'uppercase', marginBottom: 16 }}>Live ranking</div>

          {[
            { name: 'Atlas', desc: 'Billing rewrite', val: 0.42, rank: 1 },
            { name: 'Beacon', desc: 'Customer portal', val: 0.34, rank: 2 },
            { name: 'Coral', desc: 'Analytics suite', val: 0.24, rank: 3 },
          ].map((r) => (
            <div key={r.name} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'baseline',
                justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 11, color: muted, fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums' }}>0{r.rank}</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                  {(r.val * 100).toFixed(0)}<span style={{ color: sub, fontSize: 11 }}>%</span>
                </span>
              </div>
              <div style={{ height: 6, background: bg, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${r.val * 100}%`,
                  background: r.rank === 1 ? accent : (r.rank === 2 ? ink : muted), borderRadius: 3 }} />
              </div>
            </div>
          ))}

          <div style={{ marginTop: 24, padding: 14, background: bg, borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: sub, fontWeight: 600, letterSpacing: 0.4,
              textTransform: 'uppercase', marginBottom: 6 }}>Consistency</div>
            <div style={{ fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              CR <span style={{ color: accent }}>0.043</span>
            </div>
            <div style={{ fontSize: 12, color: sub, marginTop: 4 }}>
              Within 0.10 threshold — judgments hang together.
            </div>
            {expert && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${rule}`,
                fontSize: 11, color: sub, display: 'grid',
                gridTemplateColumns: '1fr 1fr', gap: 4, fontVariantNumeric: 'tabular-nums' }}>
                <span>λ_max</span><span style={{ color: ink, textAlign: 'right' }}>4.117</span>
                <span>CI</span><span style={{ color: ink, textAlign: 'right' }}>0.039</span>
                <span>RI (n=4)</span><span style={{ color: ink, textAlign: 'right' }}>0.900</span>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

window.PivotStep4Compare = PivotStep4Compare;
