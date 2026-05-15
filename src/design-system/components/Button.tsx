import { CSSProperties, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'accent' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: CSSProperties;
  type?: 'button' | 'submit';
}

const VARIANTS: Record<ButtonVariant, CSSProperties> = {
  primary: { background: '#fff', color: 'var(--color-ink)', border: '1px solid var(--color-rule)' },
  accent:  { background: 'var(--color-accent)', color: '#fff', border: 'none' },
  ghost:   { background: 'transparent', color: 'var(--color-muted)', border: 'none' },
  danger:  { background: 'transparent', color: 'oklch(0.50 0.10 30)', border: '1px solid var(--color-rule)' },
};

export function Button({ children, variant = 'primary', size = 'md', onClick, disabled, fullWidth, style: sx, type = 'button' }: ButtonProps) {
  const base: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: size === 'sm' ? '6px 14px' : '10px 18px',
    borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font-base)', fontWeight: size === 'sm' ? 500 : 600,
    fontSize: size === 'sm' ? 12 : 13, transition: 'opacity .15s',
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? '100%' : undefined,
    whiteSpace: 'nowrap',
    appearance: 'none',
  };
  return (
    <button type={type} style={{ ...base, ...VARIANTS[variant], ...sx }} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
