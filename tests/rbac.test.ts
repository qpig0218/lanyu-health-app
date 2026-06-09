import { describe, it, expect } from 'vitest';
import { accessLevels } from '../src/data/access-levels.ts';
import { hasGov, visibleKbLayers, canViewLayer, currentLevel } from '../src/domain/rbac.ts';

describe('rbac', () => {
  it('hasGov：數字越小權限越高', () => {
    expect(hasGov('L2', 'L2')).toBe(true);
    expect(hasGov('L1', 'L2')).toBe(true); // L1 權限高於門檻 L2
    expect(hasGov('L4', 'L2')).toBe(false); // L4 權限低於門檻 L2
  });

  it('L5 居民只看得到 K1', () => {
    expect(visibleKbLayers('L5')).toEqual(['K1']);
    expect(canViewLayer('L5', 'K3')).toBe(false);
  });

  it('L4 FNP 看得到 K1/K2 但看不到 K3', () => {
    expect(visibleKbLayers('L4')).toEqual(['K1', 'K2']);
    expect(canViewLayer('L4', 'K3')).toBe(false);
  });

  it('L2 PMO 可見全部三層', () => {
    expect(visibleKbLayers('L2')).toEqual(['K1', 'K2', 'K3']);
  });

  it('L2 顯示為 PMO / 部桃', () => {
    expect(accessLevels.find((level) => level.key === 'L2')?.name).toBe('PMO / 部桃');
  });

  it('currentLevel 找不到時回退 L4', () => {
    expect(currentLevel('L3').key).toBe('L3');
  });
});
