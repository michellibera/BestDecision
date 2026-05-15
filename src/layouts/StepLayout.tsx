import { ReactNode } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { Sidebar } from '../design-system/components/Sidebar';

interface StepLayoutProps {
  main: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  mainPadding?: string;
}

export function StepLayout({ main, sidebar, footer, mainPadding }: StepLayoutProps) {
  const { isMobile } = useBreakpoint();

  return (
    <div style={{
      display: isMobile ? 'flex' : 'grid',
      flexDirection: isMobile ? 'column' : undefined,
      gridTemplateColumns: !isMobile && sidebar ? '1fr 360px' : '1fr',
      flex: 1,
      minHeight: 0,
    }}>
      <div style={{
        overflow: 'auto',
        padding: isMobile ? '20px 16px' : (mainPadding ?? '40px 56px'),
        paddingBottom: isMobile && footer ? 88 : undefined,
      }}>
        {main}
      </div>

      {!isMobile && sidebar && <Sidebar>{sidebar}</Sidebar>}

      {isMobile && footer && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
          background: 'var(--color-bg)', borderTop: '1px solid var(--color-rule)',
          padding: '12px 16px',
        }}>
          {footer}
        </div>
      )}
    </div>
  );
}
