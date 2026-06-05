import { describe, it, expect } from 'vitest';
import { searchKnowledge, hasKnowledgeHit } from '../src/domain/knowledge.ts';

describe('knowledge search', () => {
  it('依 layer 過濾', () => {
    const k1 = searchKnowledge('L2', 'K1', '');
    expect(k1.length).toBeGreaterThan(0);
    expect(k1.every((e) => e.layer === 'K1')).toBe(true);
  });

  it('跨層拒答：L5 居民查 K3 → 空', () => {
    expect(searchKnowledge('L5', 'K3', '')).toEqual([]);
    expect(hasKnowledgeHit('L5', 'K3', '預算')).toBe(false);
  });

  it('L4 查 K2 可命中，但 K3 拒答', () => {
    expect(searchKnowledge('L4', 'K2', '').length).toBeGreaterThan(0);
    expect(searchKnowledge('L4', 'K3', '')).toEqual([]);
  });

  it('查詢命中關鍵字', () => {
    const hit = searchKnowledge('L5', 'K1', '撤回');
    expect(hit.length).toBeGreaterThan(0);
    expect(hit[0]!.q).toContain('撤回');
  });

  it('無命中回空（不編造）', () => {
    expect(searchKnowledge('L2', 'K1', '這是一個不存在的問題XYZ')).toEqual([]);
  });
});
