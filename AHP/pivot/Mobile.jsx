// Mobile screens for the Pivot flow — sized for 390×844 inside an iOS frame.
// All five steps in one file so they share styles and read together.

const PM = {
  bg: '#fafaf8', surface: '#fff', rule: '#ecebe7', ruleStrong: '#dbd9d2',
  ink: '#1a1a17', sub: '#7a766c', muted: '#a8a49a',
  accent: 'oklch(0.58 0.09 155)', accentSoft: 'oklch(0.94 0.04 155)',
  accentInk: 'oklch(0.40 0.08 155)',
  font: '"Inter Tight", -apple-system, system-ui, sans-serif',
};

function MobileShell({ step, title, children, primaryLabel = 'Continue', back = true, mode = 'team' }) {
  const W = 390;
  return (
    <div style={{ width: W, height: '100%', background: PM.bg, color: PM.ink,
      fontFamily: PM.font, fontSize: 14, display: 'flex', flexDirection: 'column' }}>
      {/* App header */}
      <div style={{ padding: '8px 16px 10px', background: PM.surface,
        borderBottom: `1px solid ${PM.rule}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          {back ? (
            <button style={{ appearance: 'none', border: 'none', background: 'transparent',
              fontSize: 22, color: PM.ink, cursor: 'pointer', padding: 0, lineHeight: 1 }}>‹</button>
          ) : <div style={{ width: 16 }} />}
          <div style={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>
            Q3 Priorities
          </div>
          {mode === 'team' ? (
            <div style={{ display: 'flex' }}>
              {PROJECT.team.slice(0, 3).map((p, i) => (
                <div key={p.n} style={{ width: 22, height: 22, borderRadius: 11, background: p.c,
                  color: '#fff', fontSize: 9, fontWeight: 600, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', border: '2px solid #fff',
                  marginLeft: i ? -6 : 0 }}>{p.n}</div>
              ))}
            </div>
          ) : <div style={{ width: 28 }} />}
        </div>
        {/* mini-stepper */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} style={{ flex: 1, height: 3, borderRadius: 2,
              background: n < step ? PM.accent : (n === step ? PM.ink : PM.rule) }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between',
          fontSize: 10, color: PM.sub, marginTop: 6, fontWeight: 500,
          letterSpacing: 0.3, textTransform: 'uppercase' }}>
          <span>Step {step} / 5 · {title}</span>
          <span>{step <= 4 ? `${(step - 1) * 25}%` : '100%'}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>{children}</div>

      {/* sticky footer */}
      <div style={{ padding: '12px 16px 28px', background: PM.surface,
        borderTop: `1px solid ${PM.rule}` }}>
        <button style={{ appearance: 'none', cursor: 'pointer', fontFamily: 'inherit',
          width: '100%', height: 48, borderRadius: 12, background: PM.ink, color: '#fff',
          border: 'none', fontSize: 15, fontWeight: 600 }}>
          {primaryLabel}
        </button>
      </div>
    </div>
  );
}

// ── Step 1 — Goal (mobile)
function PivotMobileStep1({ mode = 'team' }) {
  return (
    <MobileShell step={1} title="Goal" primaryLabel="Continue → Criteria" back={false} mode={mode}>
      <div style={{ padding: '20px 16px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 600, letterSpacing: -0.4,
          lineHeight: 1.2 }}>What decision are you making?</h1>
        <p style={{ margin: 0, fontSize: 13, color: PM.sub, lineHeight: 1.5 }}>
          Frame it in one sentence. Be concrete.
        </p>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 10, color: PM.sub, fontWeight: 600, letterSpacing: 0.4,
            textTransform: 'uppercase', marginBottom: 6 }}>The question</div>
          <div style={{ background: PM.surface, border: `1.5px solid ${PM.ink}`, borderRadius: 12,
            padding: 14, fontSize: 16, fontWeight: 500, lineHeight: 1.35 }}>
            {PROJECT.goal}<span style={{ color: PM.muted }}>|</span>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 10, color: PM.sub, fontWeight: 600, letterSpacing: 0.4,
            textTransform: 'uppercase', marginBottom: 6 }}>Context · optional</div>
          <div style={{ background: PM.surface, border: `1px solid ${PM.rule}`, borderRadius: 12,
            padding: 14, fontSize: 13, lineHeight: 1.5, minHeight: 70 }}>
            {PROJECT.goalDesc}
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 10, color: PM.sub, fontWeight: 600, letterSpacing: 0.4,
            textTransform: 'uppercase', marginBottom: 8 }}>Or start from a template</div>
          {[
            { t: 'Vendor selection', d: 'Cost · quality · risk' },
            { t: 'Hiring decision', d: 'Rank candidates' },
            { t: 'Project prioritization', d: 'Sequence initiatives', active: true },
          ].map((tmpl) => (
            <div key={tmpl.t} style={{ background: PM.surface,
              border: `${tmpl.active ? 1.5 : 1}px solid ${tmpl.active ? PM.ink : PM.rule}`,
              borderRadius: 10, padding: '12px 14px', marginBottom: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{tmpl.t}</div>
                <div style={{ fontSize: 11, color: PM.sub }}>{tmpl.d}</div>
              </div>
              <div style={{ color: tmpl.active ? PM.accent : PM.muted }}>›</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: 12, background: PM.accentSoft, borderRadius: 10 }}>
          <div style={{ fontSize: 10, color: PM.accentInk, fontWeight: 600, letterSpacing: 0.4,
            textTransform: 'uppercase', marginBottom: 2 }}>Estimated time</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>~12 min</div>
          <div style={{ fontSize: 11, color: PM.sub }}>3 alts × 4 criteria · 18 judgments</div>
        </div>
      </div>
    </MobileShell>
  );
}

// ── Step 2 — Criteria (mobile)
function PivotMobileStep2({ mode = 'team' }) {
  return (
    <MobileShell step={2} title="Criteria" primaryLabel="Continue → Alternatives" mode={mode}>
      <div style={{ padding: '18px 16px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 600, letterSpacing: -0.4 }}>
          How will you judge?
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: PM.sub, lineHeight: 1.5 }}>
          List the dimensions that matter. 3-7 works best.
        </p>

        <div style={{ marginTop: 16, background: PM.surface, border: `1px solid ${PM.rule}`,
          borderRadius: 12, overflow: 'hidden' }}>
          {PROJECT.criteria.map((c, i) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 14px',
              borderBottom: i < PROJECT.criteria.length - 1 ? `1px solid ${PM.rule}` : 'none' }}>
              <span style={{ color: PM.muted, fontSize: 14 }}>⋮⋮</span>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: c.color,
                border: `1px solid ${PM.ruleStrong}`, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.label}</div>
                <div style={{ fontSize: 11, color: PM.sub, overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.desc}</div>
              </div>
              <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4,
                background: i === 1 ? 'oklch(0.95 0.04 30)' : PM.accentSoft,
                color: i === 1 ? 'oklch(0.50 0.10 30)' : PM.accentInk, fontWeight: 600 }}>
                {i === 1 ? '↓' : '↑'}
              </span>
            </div>
          ))}
          <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 8,
            color: PM.sub, borderTop: `1px solid ${PM.rule}` }}>
            <span style={{ width: 20, height: 20, borderRadius: 10, border: `1px dashed ${PM.ruleStrong}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>+</span>
            <span style={{ fontSize: 13 }}>Add criterion</span>
          </div>
        </div>

        <div style={{ marginTop: 14, padding: '10px 12px', background: PM.accentSoft,
          borderRadius: 8, fontSize: 12, color: PM.accentInk }}>
          <strong>4 criteria</strong> means <strong>6 pairwise judgments</strong>.
        </div>
      </div>
    </MobileShell>
  );
}

// ── Step 3 — Alternatives (mobile)
function PivotMobileStep3({ mode = 'team' }) {
  return (
    <MobileShell step={3} title="Alternatives" primaryLabel="Start comparing →" mode={mode}>
      <div style={{ padding: '18px 16px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 600, letterSpacing: -0.4 }}>
          What are you choosing between?
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: PM.sub, lineHeight: 1.5 }}>
          The candidate options. Drop anything you'd never pick.
        </p>

        <div style={{ marginTop: 16 }}>
          {PROJECT.alts.map((a, i) => (
            <div key={a.id} style={{ background: PM.surface, border: `1px solid ${PM.rule}`,
              borderRadius: 12, padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8,
                  background: ['oklch(0.92 0.06 60)', 'oklch(0.92 0.06 220)', 'oklch(0.92 0.06 350)'][i],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700 }}>{a.label[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{a.label}</div>
                  <div style={{ fontSize: 11, color: PM.sub }}>{a.sub}</div>
                </div>
                <span style={{ fontSize: 10, color: PM.muted, fontWeight: 600,
                  letterSpacing: 0.3, textTransform: 'uppercase' }}>0{i + 1}</span>
              </div>
              <div style={{ fontSize: 12, color: PM.sub, lineHeight: 1.5 }}>{a.desc}</div>
            </div>
          ))}
          <div style={{ background: 'transparent', border: `1.5px dashed ${PM.ruleStrong}`,
            borderRadius: 12, padding: 18, display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8, color: PM.sub }}>
            <span style={{ width: 24, height: 24, borderRadius: 12, border: `1.5px dashed ${PM.muted}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, color: PM.muted }}>+</span>
            <span style={{ fontSize: 13 }}>Add alternative</span>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

// ── Step 4 — Compare (mobile) — Saaty slider, big and thumb-friendly
function PivotMobileStep4({ mode = 'team' }) {
  const [val, setVal] = React.useState(3);
  const sliderRef = React.useRef(null);
  const drag = (e) => {
    e.preventDefault();
    const r = sliderRef.current.getBoundingClientRect();
    const move = (ev) => {
      const x = ((ev.clientX ?? ev.touches?.[0]?.clientX) - r.left) / r.width;
      setVal(Math.round(Math.max(-9, Math.min(9, (x - 0.5) * 18))));
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
    if (a === 0) return 'equally important';
    if (a <= 2) return 'slightly more important';
    if (a <= 4) return 'moderately more important';
    if (a <= 6) return 'strongly more important';
    if (a <= 8) return 'very strongly more important';
    return 'extremely more important';
  })();

  return (
    <MobileShell step={4} title="Compare 3/6" primaryLabel="Save and continue →" mode={mode}>
      <div style={{ padding: '16px 16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: PM.sub, fontWeight: 600, letterSpacing: 0.4,
            textTransform: 'uppercase' }}>Comparison 3 of 6</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} style={{ width: 14, height: 3, borderRadius: 2,
                background: n < 3 ? PM.accent : (n === 3 ? PM.ink : PM.rule) }} />
            ))}
          </div>
        </div>

        <h1 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, letterSpacing: -0.3,
          lineHeight: 1.3 }}>
          Which matters more?
        </h1>

        {/* The pair stacked vertically */}
        <div style={{ background: PM.surface, border: `1.5px solid ${val > 0 ? PM.ink : PM.rule}`,
          borderRadius: 12, padding: '14px 16px', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'oklch(0.92 0.06 60)' }} />
            <span style={{ fontSize: 10, color: PM.sub, fontWeight: 600, letterSpacing: 0.3,
              textTransform: 'uppercase' }}>Criterion 1</span>
          </div>
          <div style={{ fontSize: 17, fontWeight: 600 }}>Revenue impact</div>
          <div style={{ fontSize: 11, color: PM.sub, marginTop: 2 }}>ARR contribution over 12 months</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0',
          fontSize: 11, color: PM.muted, letterSpacing: 0.3, textTransform: 'uppercase',
          fontWeight: 500 }}>
          <div style={{ flex: 1, height: 1, background: PM.rule }} />
          <span>vs</span>
          <div style={{ flex: 1, height: 1, background: PM.rule }} />
        </div>

        <div style={{ background: PM.surface, border: `1.5px solid ${val < 0 ? PM.ink : PM.rule}`,
          borderRadius: 12, padding: '14px 16px', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'oklch(0.92 0.06 220)' }} />
            <span style={{ fontSize: 10, color: PM.sub, fontWeight: 600, letterSpacing: 0.3,
              textTransform: 'uppercase' }}>Criterion 2</span>
          </div>
          <div style={{ fontSize: 17, fontWeight: 600 }}>Cost</div>
          <div style={{ fontSize: 11, color: PM.sub, marginTop: 2 }}>Fully-loaded delivery cost</div>
        </div>

        {/* Big readout */}
        <div style={{ textAlign: 'center', margin: '8px 0 14px' }}>
          <div style={{ fontSize: 11, color: PM.accentInk, fontWeight: 600, letterSpacing: 0.4,
            textTransform: 'uppercase' }}>Your judgment</div>
          <div style={{ fontSize: 56, fontWeight: 600, lineHeight: 1, color: PM.ink,
            fontVariantNumeric: 'tabular-nums', margin: '4px 0' }}>
            {val > 0 ? `${val}` : val < 0 ? `1/${Math.abs(val)}` : '1'}
          </div>
          <div style={{ fontSize: 13, color: PM.sub, lineHeight: 1.4, padding: '0 8px' }}>
            {val === 0 ? <>They are <em>equally important</em>.</> : (
              <><strong style={{ color: PM.ink }}>{val > 0 ? 'Revenue' : 'Cost'}</strong>{' is '}
              <em>{verbal}</em>{' than '}
              <strong style={{ color: PM.ink }}>{val > 0 ? 'cost' : 'revenue'}</strong>.</>
            )}
          </div>
        </div>

        {/* Slider */}
        <div ref={sliderRef} onPointerDown={drag}
          style={{ position: 'relative', height: 56, cursor: 'pointer', userSelect: 'none',
            touchAction: 'none', margin: '4px 4px' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 27, height: 3,
            background: PM.rule, borderRadius: 2 }} />
          <div style={{ position: 'absolute', top: 27, height: 3, borderRadius: 2,
            background: val > 0 ? 'oklch(0.92 0.06 60)' : (val < 0 ? 'oklch(0.92 0.06 220)' : 'transparent'),
            left: val > 0 ? '50%' : `${sliderPos}%`,
            right: val < 0 ? '50%' : `${100 - sliderPos}%` }} />
          <div style={{ position: 'absolute', left: '50%', top: 22, width: 2, height: 14,
            background: PM.ruleStrong, transform: 'translateX(-1px)' }} />
          <div style={{ position: 'absolute', left: `${sliderPos}%`, top: 28,
            transform: 'translate(-50%, -50%)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: PM.surface,
              border: `2.5px solid ${PM.ink}`, boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700 }}>
              {Math.abs(val) || 1}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: PM.sub,
          marginTop: 4, fontWeight: 500 }}>
          <span>Cost ←</span><span>equal</span><span>→ Revenue</span>
        </div>

        {/* Quick taps */}
        <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
          {[
            { v: 1, l: 'Equal' }, { v: 3, l: 'Moderate' },
            { v: 5, l: 'Strong' }, { v: 7, l: 'Very strong' }, { v: 9, l: 'Extreme' },
          ].map((q) => (
            <button key={q.v} onClick={() => setVal(q.v)} style={{ appearance: 'none',
              cursor: 'pointer', fontFamily: 'inherit', fontSize: 11, fontWeight: 500,
              padding: '6px 10px', borderRadius: 999,
              border: `1px solid ${val === q.v ? PM.ink : PM.rule}`,
              background: val === q.v ? PM.ink : PM.surface,
              color: val === q.v ? '#fff' : PM.ink }}>{q.l} ({q.v})</button>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

// ── Step 5 — Results (mobile)
function PivotMobileStep5({ mode = 'team' }) {
  const final = [
    { id: 'atlas', label: 'Atlas', sub: 'Billing rewrite', score: 0.464 },
    { id: 'beacon', label: 'Beacon', sub: 'Customer portal', score: 0.319 },
    { id: 'coral', label: 'Coral', sub: 'Analytics suite', score: 0.217 },
  ];

  const altScores = {
    atlas: { rev: 0.55, cost: 0.20, t2m: 0.30, fit: 0.50 },
    beacon: { rev: 0.30, cost: 0.30, t2m: 0.45, fit: 0.35 },
    coral: { rev: 0.15, cost: 0.50, t2m: 0.25, fit: 0.15 },
  };

  return (
    <MobileShell step={5} title="Results" primaryLabel="Approve & archive" mode={mode}>
      <div style={{ padding: '18px 16px 24px' }}>
        <div style={{ fontSize: 11, color: PM.accentInk, fontWeight: 600, letterSpacing: 0.4,
          textTransform: 'uppercase', marginBottom: 6 }}>Recommendation</div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: -0.4, lineHeight: 1.2 }}>
          The math says <span style={{ color: PM.accent }}>Atlas</span>.
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 12, color: PM.sub, lineHeight: 1.5 }}>
          Wins on Revenue impact and Strategic fit (80% of weight). Lead survives ±15% sensitivity.
        </p>

        {/* Winner card */}
        <div style={{ background: PM.ink, color: '#fff', borderRadius: 14, padding: 16,
          marginTop: 14, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '4px 10px',
            background: PM.accent, fontSize: 10, fontWeight: 600, letterSpacing: 0.4,
            textTransform: 'uppercase', borderBottomLeftRadius: 8 }}>★ Recommended</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600,
            letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 6 }}>Rank 01</div>
          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.4 }}>Atlas</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 12 }}>
            Billing rewrite
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 40, fontWeight: 600, color: PM.accent,
              fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>46.4</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>%</span>
          </div>
          <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.15)',
            overflow: 'hidden', marginTop: 10 }}>
            <div style={{ height: '100%', width: '46.4%', background: PM.accent }} />
          </div>
        </div>

        {/* Runners-up */}
        <div style={{ marginTop: 12 }}>
          {final.slice(1).map((r, i) => (
            <div key={r.id} style={{ background: PM.surface, border: `1px solid ${PM.rule}`,
              borderRadius: 12, padding: '12px 14px', marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontSize: 10, color: PM.muted, fontWeight: 600, letterSpacing: 0.3 }}>
                    RANK 0{i + 2}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{r.label}
                    <span style={{ fontWeight: 400, color: PM.sub, marginLeft: 6, fontSize: 12 }}>
                      · {r.sub}</span>
                  </div>
                </div>
                <span style={{ fontSize: 18, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                  {(r.score * 100).toFixed(1)}%
                </span>
              </div>
              <div style={{ height: 4, background: PM.bg, borderRadius: 2, marginTop: 8,
                overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${r.score * 100}%`,
                  background: i === 0 ? PM.ink : PM.muted, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div style={{ marginTop: 18, background: PM.surface, border: `1px solid ${PM.rule}`,
          borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 10, color: PM.sub, fontWeight: 600, letterSpacing: 0.4,
            textTransform: 'uppercase', marginBottom: 10 }}>Breakdown by criterion</div>
          {final.map((r, i) => (
            <div key={r.id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                fontSize: 12, marginBottom: 4 }}>
                <span style={{ fontWeight: 500 }}>{r.label}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                  {(r.score * 100).toFixed(1)}%
                </span>
              </div>
              <div style={{ display: 'flex', height: 14, borderRadius: 3, overflow: 'hidden',
                border: `1px solid ${PM.rule}` }}>
                {PROJECT.criteria.map((c) => {
                  const contrib = altScores[r.id][c.id] * c.w;
                  return (
                    <div key={c.id} style={{ width: `${(contrib / r.score) * 100}%`,
                      background: c.color }} />
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {PROJECT.criteria.map((c) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 10, color: PM.sub }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c.color }} />
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Consistency */}
        <div style={{ marginTop: 12, background: PM.accentSoft, borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 10, color: PM.accentInk, fontWeight: 600, letterSpacing: 0.4,
            textTransform: 'uppercase', marginBottom: 4 }}>Consistency</div>
          <div style={{ fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
            CR <span style={{ color: PM.accent }}>0.043</span>
          </div>
          <div style={{ fontSize: 12, color: PM.accentInk, marginTop: 2 }}>
            Within 0.10 — judgments hang together.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button style={{ flex: 1, appearance: 'none', cursor: 'pointer', fontFamily: 'inherit',
            height: 40, borderRadius: 10, background: PM.surface, color: PM.ink,
            border: `1px solid ${PM.rule}`, fontSize: 13, fontWeight: 500 }}>
            ↓ Export PDF
          </button>
          <button style={{ flex: 1, appearance: 'none', cursor: 'pointer', fontFamily: 'inherit',
            height: 40, borderRadius: 10, background: PM.surface, color: PM.ink,
            border: `1px solid ${PM.rule}`, fontSize: 13, fontWeight: 500 }}>
            Share
          </button>
        </div>
      </div>
    </MobileShell>
  );
}

Object.assign(window, {
  PivotMobileStep1, PivotMobileStep2, PivotMobileStep3, PivotMobileStep4, PivotMobileStep5,
});
