export const TOKENS = {
  color: {
    bg: '#fafaf8',
    surface: '#ffffff',
    rule: '#ecebe7',
    ruleStrong: '#dbd9d2',
    ink: '#1a1a17',
    sub: '#7a766c',
    muted: '#a8a49a',
    accent: 'oklch(0.58 0.09 155)',
    accentInk: 'oklch(0.40 0.08 155)',
    accentSoft: 'oklch(0.94 0.04 155)',
    warm: 'oklch(0.92 0.06 60)',
    cool: 'oklch(0.92 0.06 220)',
    green: 'oklch(0.92 0.06 140)',
    pink: 'oklch(0.92 0.06 350)',
  },
  font: '"Inter Tight", "Söhne", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  radius: { sm: 6, md: 10, lg: 16, xl: 24 } as const,
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 } as const,
} as const;

export function injectCSSVars(): void {
  const style = document.createElement('style');
  const { color, font } = TOKENS;
  style.textContent = `
    :root {
      --color-bg: ${color.bg};
      --color-surface: ${color.surface};
      --color-rule: ${color.rule};
      --color-rule-strong: ${color.ruleStrong};
      --color-ink: ${color.ink};
      --color-sub: ${color.sub};
      --color-muted: ${color.muted};
      --color-accent: ${color.accent};
      --color-accent-ink: ${color.accentInk};
      --color-accent-soft: ${color.accentSoft};
      --color-warm: ${color.warm};
      --color-cool: ${color.cool};
      --color-green: ${color.green};
      --color-pink: ${color.pink};
      --font-base: ${font};
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--color-bg);
      color: var(--color-ink);
      font-family: var(--font-base);
      font-size: 14px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    input, textarea, select, button { font-family: inherit; }
    input:focus, textarea:focus { outline: 1px solid var(--color-accent); outline-offset: 0; }
  `;
  document.head.appendChild(style);
}
