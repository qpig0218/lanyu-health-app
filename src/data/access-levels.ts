import type { AccessKey, AccessLevel } from './types.ts';

/** 五級 RBAC（L1 照護司 → L5 居民）。 */
export const accessLevels: AccessLevel[] = [
  { key: 'L1', role: 'clinical', name: '照護司核心圈', scope: '全蘭嶼去識別化統計', who: '政策視圖・簽核・倫理委員會', icon: 'shield', nav: 'dashboard' },
  { key: 'L2', role: 'clinical', name: 'PMO / 衛生局', scope: '計畫 KPI、預算、人力', who: '戰情視圖・PMO 治理看板', icon: 'chart', nav: 'pmo' },
  { key: 'L3', role: 'clinical', name: '駐點主管', scope: '所轄居民全貌（含 PII）', who: '駐點視圖・異常簽核・合併拆分', icon: 'users', nav: 'track' },
  { key: 'L4', role: 'clinical', name: 'FNP 一線', scope: '已分派個案', who: '家訪 App・新增訪視・標記完成', icon: 'lab', nav: 'workspace' },
  { key: 'L5', role: 'resident', name: '居民', scope: '自身資料', who: '健檢結果・撤回同意・可攜', icon: 'home', nav: 'home' },
];

export const LEVEL_ORDER: Record<AccessKey, number> = { L1: 1, L2: 2, L3: 3, L4: 4, L5: 5 };

/** 同意四層：[層級, 範圍, 同意方式, 版本, 狀態] */
export const consentTiers: readonly (readonly [string, string, string, string, string])[] = [
  ['L1 基本資料', '戶籍、聯絡', 'Opt-in', 'v2.1', 'ok'],
  ['L2 健檢資料', '檢驗、影像', 'Opt-in＋書面', 'v2.1', 'ok'],
  ['L3 跨機構共享', '19 部立、台東馬偕等', '個別簽核', 'v2.0', 'watch'],
  ['L4 研究使用', 'IRB 通過', '個別簽核可細分', '—', 'pending'],
];
