// 純函式 i18n 核心（無副作用、可單元測試）。
// 達悟語採「審定才採用」策略：未審定 key 自動 fallback 至中文並標記 pending，
// 對齊規格「族語內容須部落顧問審定」，不得編造未審定族語。

export type Lang = 'zh' | 'tao';
export type Dict = Readonly<Record<string, string>>;
export type Vars = Readonly<Record<string, string | number>>;

export interface Translation {
  /** 實際顯示文字（已內插）。 */
  text: string;
  /** 是否因達悟語未審定而退回中文（供 UI 標示「待審定」徽章）。 */
  pending: boolean;
}

/** 將模板中的 {name} 佔位符以 vars 取代；未提供者保留原樣。 */
export function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}

/**
 * 解析一個訊息 key。
 * - 達悟語且該 key 已審定 → 用達悟語，pending=false。
 * - 達悟語但未審定 → 退回中文，pending=true。
 * - 中文 → 直接取中文，pending=false。
 * - key 不存在於中文字典 → 回傳 key 本身（方便開發期察覺缺漏）。
 */
export function translate(
  key: string,
  lang: Lang,
  zhDict: Dict,
  taoDict: Dict,
  vars?: Vars,
): Translation {
  if (lang === 'tao') {
    const certified = taoDict[key];
    if (certified != null) return { text: interpolate(certified, vars), pending: false };
  }
  const base = zhDict[key];
  if (base == null) return { text: key, pending: false };
  return { text: interpolate(base, vars), pending: lang === 'tao' };
}
