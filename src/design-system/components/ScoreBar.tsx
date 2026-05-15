export interface ScoreBarSegment {
  color: string;
  value: number;
  label: string;
}

export function ScoreBar({ segments }: { segments: ScoreBarSegment[] }) {
  return (
    <div style={{ height: 10, borderRadius: 5, overflow: 'hidden', display: 'flex', background: 'var(--color-rule)' }}>
      {segments.map((seg, i) => (
        <div
          key={i}
          style={{ flex: seg.value, background: seg.color, minWidth: seg.value > 0.005 ? 2 : 0, transition: 'flex .3s' }}
          title={`${seg.label}: ${(seg.value * 100).toFixed(1)}%`}
        />
      ))}
    </div>
  );
}
