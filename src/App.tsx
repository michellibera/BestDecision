import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from './i18n/I18nContext';
import { AppShell } from './layouts/AppShell';
import { Step1Goal } from './views/Step1Goal';
import { Step2Criteria } from './views/Step2Criteria';
import { Step3Alternatives } from './views/Step3Alternatives';
import { Step4Compare } from './views/Step4Compare';
import { Step5Results } from './views/Step5Results';

export function App() {
  return (
    <I18nProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/step/1" replace />} />
        <Route path="/step/1" element={<AppShell><Step1Goal /></AppShell>} />
        <Route path="/step/2" element={<AppShell><Step2Criteria /></AppShell>} />
        <Route path="/step/3" element={<AppShell><Step3Alternatives /></AppShell>} />
        <Route path="/step/4" element={<AppShell><Step4Compare /></AppShell>} />
        <Route path="/step/5" element={<AppShell><Step5Results /></AppShell>} />
        <Route path="*" element={<Navigate to="/step/1" replace />} />
      </Routes>
    </BrowserRouter>
    </I18nProvider>
  );
}
