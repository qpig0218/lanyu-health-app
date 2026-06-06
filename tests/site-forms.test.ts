import { describe, expect, it } from 'vitest';
import {
  createEmptySiteDrafts,
  loadSiteDraftsFromStorage,
  saveSiteDraftsToStorage,
  siteFormCompletion,
  siteForms,
} from '../src/data/site-forms.ts';
import { clinicalNavItems } from '../src/data/governance.ts';

class MemoryStorage {
  private values = new Map<string, string>();
  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
  removeItem(key: string): void {
    this.values.delete(key);
  }
}

describe('siteForms 現場模式', () => {
  it('包含四單位一頁式表與最後總結表', () => {
    expect(siteForms.map((form) => form.id)).toEqual(['F-01', 'F-02', 'F-03', 'F-04', 'F-05']);
    expect(siteForms[0]!.title).toContain('蘭嶼衛生所');
    expect(siteForms[1]!.title).toContain('部桃/醫福會');
    expect(siteForms[2]!.title).toContain('照護司');
    expect(siteForms[3]!.title).toContain('東馬/台東馬偕');
    expect(siteForms[4]!.title).toContain('會議總結');
  });

  it('現場模式列入醫護端隱藏側欄導覽', () => {
    expect(clinicalNavItems.some(([nav, , label]) => nav === 'site' && label === '現場模式')).toBe(true);
  });

  it('離線草稿會補齊所有欄位並保留既有填答', () => {
    const drafts = createEmptySiteDrafts();
    const firstField = siteForms[0]!.sections[0]!.fields[0]!.id;
    drafts['F-01']![firstField] = '現場名冊採衛生所 2026/06/09 版';

    const storage = new MemoryStorage();
    saveSiteDraftsToStorage(storage, drafts);
    const loaded = loadSiteDraftsFromStorage(storage);

    expect(loaded['F-01']![firstField]).toBe('現場名冊採衛生所 2026/06/09 版');
    expect(Object.keys(loaded['F-05']!).length).toBeGreaterThan(10);
  });

  it('completion 計算已填欄位', () => {
    const drafts = createEmptySiteDrafts();
    const form = siteForms[0]!;
    expect(siteFormCompletion(form, drafts[form.id]!).filled).toBe(0);
    drafts[form.id]![form.sections[0]!.fields[0]!.id] = '已確認';
    expect(siteFormCompletion(form, drafts[form.id]!).filled).toBe(1);
  });
});
