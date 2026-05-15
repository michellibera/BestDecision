import React, { useRef } from 'react';

function verbal(a: number): string {
  if (a === 0) return 'Equally important';
  if (a <= 2) return 'Slightly more important';
  if (a <= 4) return 'Moderately more important';
  if (a <= 6) return 'Strongly more important';
  if (a <= 8) return 'Very strongly more important';
  return 'Extremely more important';
}

interface SaatySliderProps {
  leftLabel: string;
  rightLabel: string;
  leftColor?: string;
  rightColor?: string;
  value?: number; // -8 to 8
  onChange: (value: number) => void;
}

export function SaatySlider({ leftLabel, rightLabel, leftColor, rightColor, value = 0, onChange }: SaatySliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const pos = ((value + 8) / 16) * 100; // 0–100%
  const saatyVal = Math.abs(value) + 1;  // 1–9
  const dominant = value > 0 ? rightLabel : value < 0 ? leftLabel : null;

  // value > 0 = handle right = right card wins → fill right side with rightColor
  const fillColor = value > 0
    ? (rightColor ?? 'oklch(0.92 0.06 220)')
    : (leftColor ?? 'oklch(0.92 0.06 60)');

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    const rect = sliderRef.current!.getBoundingClientRect();

    function update(ev: PointerEvent) {
      const x = (ev.clientX - rect.left) / rect.width;
      const raw = (x - 0.5) * 16;
      onChange(Math.round(Math.max(-8, Math.min(8, raw))));
    }
    function up() {
      window.removeEventListener('pointermove', update);
      window.removeEventListener('pointerup', up);
    }
    window.addEventListener('pointermove', update);
    window.addEventListener('pointerup', up);
    update(e.nativeEvent);
  }

  return (
    <div>
      {/* Slider track */}
      <div
        ref={sliderRef}
        onPointerDown={handlePointerDown}
        style={{ position: 'relative', height: 44, cursor: 'pointer', userSelect: 'none' }}
      >
        {/* Track base */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 21, height: 2,
          background: 'var(--color-rule)', borderRadius: 1,
        }} />

        {/* Colored fill */}
        {value !== 0 && (
          <div style={{
            position: 'absolute', top: 21, height: 2, borderRadius: 1,
            background: fillColor,
            left: value > 0 ? '50%' : `${pos}%`,
            right: value < 0 ? '50%' : `${100 - pos}%`,
          }} />
        )}

        {/* Center tick */}
        <div style={{
          position: 'absolute', left: '50%', top: 17, width: 2, height: 10,
          background: 'var(--color-rule-strong)', transform: 'translateX(-1px)',
        }} />

        {/* Tick marks */}
        {[-6, -4, -2, 2, 4, 6].map(n => (
          <div key={n} style={{
            position: 'absolute',
            left: `${((n + 8) / 16) * 100}%`,
            top: 19, width: 1, height: 6,
            background: 'var(--color-muted)',
            transform: 'translateX(-0.5px)',
          }} />
        ))}

        {/* Handle */}
        <div style={{
          position: 'absolute', left: `${pos}%`, top: 22,
          transform: 'translate(-50%, -50%)',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 14,
            background: 'var(--color-surface)',
            border: '2px solid var(--color-ink)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: 'var(--color-ink)',
          }}>
            {saatyVal}
          </div>
        </div>
      </div>

      {/* Axis labels */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, color: 'var(--color-sub)', marginTop: 4,
        fontVariantNumeric: 'tabular-nums',
      }}>
        <span>← {leftLabel}</span>
        <span>equal</span>
        <span>{rightLabel} →</span>
      </div>

      {/* Verbal summary box */}
      <div style={{
        marginTop: 22, padding: '14px 18px',
        background: 'var(--color-accent-soft)', borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontSize: 11, color: 'var(--color-accent-ink)', fontWeight: 600,
            letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 2,
          }}>
            Your judgment
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-ink)' }}>
            {value === 0
              ? <>Both are <em>equally important</em>.</>
              : <><strong>{dominant}</strong>{' is '}<em>{verbal(Math.abs(value)).toLowerCase()}</em>.</>
            }
          </div>
        </div>
        <div style={{
          fontSize: 28, fontWeight: 600, color: 'var(--color-ink)',
          fontVariantNumeric: 'tabular-nums', flexShrink: 0, marginLeft: 16,
        }}>
          {value !== 0 ? `${saatyVal}` : '1'}
        </div>
      </div>
    </div>
  );
}
