import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('readable glass clarity layer', () => {
  const css = readFileSync(resolve(process.cwd(), 'src/styles/refinements.css'), 'utf8');

  it('separates atmosphere glass from readable work surfaces', () => {
    expect(css).toContain('--glass-atmosphere-bg: rgba(247, 253, 253, 0.74)');
    expect(css).toContain('--glass-readable-bg: rgba(248, 253, 253, 0.92)');
    expect(css).toContain('--glass-readable-bg-strong: rgba(253, 255, 255, 0.97)');
  });

  it('washes the background image without removing it', () => {
    const bodyRule = css.match(/body\s*\{(?<rule>[\s\S]*?)\n\}/)?.groups?.rule ?? '';
    expect(bodyRule).toContain('var(--page-background-wash)');
    expect(bodyRule).toContain('lanyu_app_background_desktop_16x9_less_white.png');
  });

  it('uses readable glass on authenticated clinical surfaces and form controls', () => {
    expect(css).toMatch(/\.clinical-app :is\([\s\S]*?\.panel[\s\S]*?\.site-card[\s\S]*?\)\s*\{[\s\S]*?background: var\(--glass-readable-bg\);/);
    expect(css).toMatch(/\.clinical-app :is\(input, select, textarea, \.lab-input\)\s*\{[\s\S]*?background: var\(--glass-readable-bg-strong\);/);
  });
});
