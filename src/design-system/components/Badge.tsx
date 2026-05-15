import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: string;
}

export function Badge({ children, color = 'var(--color-sub)' }: BadgeProps) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 20,
      fontSize: 11, fontWeight: 600, background: color + '33', color,
      letterSpacing: '.02em', whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}
