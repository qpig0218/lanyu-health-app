import { describe, it, expect } from 'vitest';
import { interpolate, translate, type Dict } from '../src/i18n/translate.ts';

const zhDict: Dict = {
  'nav.home': '首頁',
  'roster.filtered': '已篩選 {village}部落名冊',
};

describe('interpolate', () => {
  it('無 vars 時原樣返回', () => {
    expect(interpolate('純文字')).toBe('純文字');
  });

  it('替換 {var} 佔位符', () => {
    expect(interpolate('已篩選 {village}部落名冊', { village: '朗島' })).toBe('已篩選 朗島部落名冊');
  });

  it('未提供的變數保留原樣', () => {
    expect(interpolate('哈囉 {name}', {})).toBe('哈囉 {name}');
  });

  it('數字會轉為字串', () => {
    expect(interpolate('共 {n} 筆', { n: 3 })).toBe('共 3 筆');
  });
});

describe('translate', () => {
  it('中文直接取字典', () => {
    const r = translate('nav.home', 'zh', zhDict, {});
    expect(r.text).toBe('首頁');
    expect(r.pending).toBe(false);
  });

  it('達悟語未審定時 fallback 中文並標 pending', () => {
    const r = translate('nav.home', 'tao', zhDict, {});
    expect(r.text).toBe('首頁');
    expect(r.pending).toBe(true);
  });

  it('達悟語已審定時採用審定稿且不 pending', () => {
    const taoDict: Dict = { 'nav.home': 'Apoyo' };
    const r = translate('nav.home', 'tao', zhDict, taoDict);
    expect(r.text).toBe('Apoyo');
    expect(r.pending).toBe(false);
  });

  it('翻譯時套用 {var} 內插', () => {
    const r = translate('roster.filtered', 'zh', zhDict, {}, { village: '東清' });
    expect(r.text).toBe('已篩選 東清部落名冊');
    expect(r.pending).toBe(false);
  });

  it('fallback 時仍套用內插', () => {
    const r = translate('roster.filtered', 'tao', zhDict, {}, { village: '野銀' });
    expect(r.text).toBe('已篩選 野銀部落名冊');
    expect(r.pending).toBe(true);
  });

  it('查無 key 時回傳 key 本身（不編造）', () => {
    const r = translate('missing.key', 'zh', zhDict, {});
    expect(r.text).toBe('missing.key');
    expect(r.pending).toBe(false);
  });
});
