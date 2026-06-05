// 稽核軌（示範）：把 AI Mock 動作寫入 localStorage，示範「稽核留存 ≥2 年」概念。
// 僅原型示範，非正式稽核系統；欄位對齊規格：interaction_id / model_id / sources / hitl_decision。

const STORAGE_KEY = 'ayoi.audit.v1';
const MAX_ENTRIES = 200;

export interface AuditEntry {
  ts: string;
  interactionId: string;
  actor: string;
  action: string;
  modelId: string;
  hitlDecision: string;
  sources: string[];
  module: string;
}

function read(): AuditEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AuditEntry[]) : [];
  } catch {
    return [];
  }
}

/** 追加一筆稽核紀錄並回傳更新後清單（最新在前，上限 MAX_ENTRIES）。 */
export function appendAudit(entry: Omit<AuditEntry, 'ts'>): AuditEntry[] {
  const full: AuditEntry = { ...entry, ts: new Date().toISOString() };
  const next = [full, ...read()].slice(0, MAX_ENTRIES);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* localStorage 不可用（無痕/配額）時忽略，原型不阻斷流程 */
  }
  return next;
}

/** 讀取稽核紀錄（最新在前）。 */
export function listAudit(): AuditEntry[] {
  return read();
}

/** 清空示範稽核紀錄。 */
export function clearAudit(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* 忽略 */
  }
}
