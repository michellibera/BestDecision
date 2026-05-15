import { ReactNode } from 'react';

export function Sidebar({ children }: { children: ReactNode }) {
  return (
    <aside style={{
      background: 'var(--color-surface)',
      borderLeft: '1px solid var(--color-rule)',
      padding: '36px 28px',
      display: 'flex', flexDirection: 'column', gap: 24,
      overflowY: 'auto',
      minHeight: 0,
    }}>
      {children}
    </aside>
  );
}

export function SidebarSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {title && (
        <p style={{
          fontSize: 11, fontWeight: 600, color: 'var(--color-sub)',
          letterSpacing: 0.5, textTransform: 'uppercase',
        }}>
          {title}
        </p>
      )}
      {children}
    </div>
  );
}
