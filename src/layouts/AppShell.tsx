import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Nav } from '../design-system/components/Nav';
import { Stepper } from '../design-system/components/Stepper';

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const stepNum = parseInt(location.pathname.split('/').pop() ?? '1');
  const currentStep = isNaN(stepNum) ? 1 : stepNum;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      <Nav currentStep={currentStep} />
      <Stepper currentStep={currentStep} />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </main>
    </div>
  );
}
