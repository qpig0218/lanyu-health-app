import type { MessageKey } from './zh.ts';

// 達悟語（tao）— 僅收錄「已由 ≥2 位部落顧問審定」之條目。
//
// 依《P11 規格》與委外 A/B/C 包分工，達悟語內容須經部落顧問審定後方可採用；
// 本原型不得自行編造未審定族語。故此字典目前刻意留空：所有 key 將誠實 fallback
// 至中文並於 UI 標示「達悟語待審定」。待顧問交付審定稿後，逐 key 補入即可生效，
// 無需改動任何畫面程式。
//
// 範例（顧問交付後）：
//   'nav.home': 'Apoyo',  // 審定號 TAO-NAV-001
export const taoCertified: Readonly<Partial<Record<MessageKey, string>>> = {};
