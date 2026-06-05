// 共用資料型別。資料皆為原型內聯常數（無 PII，皆為示範值）。

export type AccessKey = 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
export type RoleKind = 'clinical' | 'resident';
export type RiskLevelLabel = '綠' | '黃' | '橘' | '紅';
export type LabStatus = 'ok' | 'low' | 'high' | 'watch' | 'pending';

/** 年齡別健檢套餐。trigger 依年齡判定是否套用。 */
export interface AgePackage {
  band: string;
  trigger: (age: number) => boolean;
  core: string[];
  labs: string[];
  modules: string[];
}

/** 檢驗值列：[代碼, 中文名, 數值, 單位, 參考區間, 狀態]。 */
export type LabRow = readonly [string, string, string | number, string, string, LabStatus];

export interface Questionnaire {
  transport: string;
  householdGoal: string;
  alert: string;
  home: string;
}

export interface Patient {
  id: string;
  household: string;
  name: string;
  displayName: string;
  age: number;
  sex: string;
  village: string;
  phone: string;
  consent: string;
  identity: string;
  contact: string;
  risk: number;
  level: RiskLevelLabel;
  tags: string[];
  householdTags: string[];
  conditions: string[];
  questionnaire: Questionnaire;
  labs: LabRow[];
}

export interface VillageService {
  name: string;
  x: number;
  y: number;
  households: number;
  level: string;
  focus: string;
}

export interface AccessLevel {
  key: AccessKey;
  role: RoleKind;
  name: string;
  scope: string;
  who: string;
  icon: string;
  nav: string;
}

export type KnowledgeLayerKey = 'K1' | 'K2' | 'K3';

export interface KnowledgeEntry {
  layer: KnowledgeLayerKey;
  q: string;
  zh: string;
  tao?: string;
  src: string;
  conf: '高' | '中' | '低';
  taoCert: string;
}

/** HITL 等級：H0 全自動播報 → H4 人工主導。 */
export type HitlLevel = 'H0' | 'H1' | 'H2' | 'H3' | 'H4';

/** 八大 AI Agent 規格（對應 P11 §14.1–14.8）。 */
export interface AgentSpec {
  code: string;
  name: string;
  sub: string;
  icon: string;
  hitl: string;
  /** 解析後的主要 HITL 等級，驅動「人機協作」徽章與簽核流程。 */
  hitlPrimary: HitlLevel;
  model: string;
  /** 模型版本（模型卡用）。 */
  modelVersion: string;
  mod: string;
  conf: '高' | '中' | '低';
  task: string;
  out: string;
  cant: string[];
  kpi: string;
  /** XAI：為什麼會給這個建議（可解釋性說明）。 */
  why: string;
  /** 失效備援：模型不可用或低信心時的 fallback 行為。 */
  fallback: string;
  /** 稽核留存說明（示範「稽核軌 ≥2 年」概念）。 */
  audit: string;
}
