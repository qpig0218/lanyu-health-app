import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('landing RBAC layout', () => {
  it('L1-L5 權限卡採單欄垂直排列', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles/extension.css'), 'utf8');
    const match = css.match(/\.rbac-login-grid\s*\{([^}]+)\}/);
    expect(match?.[1]).toContain('grid-template-columns: minmax(0, 1fr)');
    expect(match?.[1]).not.toContain('auto-fit');
  });
});
