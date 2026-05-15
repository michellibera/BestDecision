import { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  accentColor?: string;
  selected?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

export function Card({ children, accentColor, selected, onClick, style: sx }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--color-surface)',
        borderRadius: 12,
        border: `1px solid ${selected ? 'var(--color-accent)' : 'var(--color-rule)'}`,
        borderLeft: accentColor ? `4px solid ${accentColor}` : undefined,
        padding: '16px 20px',
        cursor: onClick ? 'pointer' : undefined,
        transition: 'border-color .2s',
        ...sx,
      }}
    >
      {children}
    </div>
  );
}
