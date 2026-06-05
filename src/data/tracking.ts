// 模組二：異常分級規則與追蹤五態狀態機。

/** [標籤, 色票, 規則, SLA, 動作] */
export const abnormalRules: readonly (readonly [string, string, string, string, string])[] = [
  ['紅', 'red', '收縮壓 ≥180、空腹血糖 ≥300、Cr ≥4', '24 小時內聯繫', '醫師簽核（H2）觸發轉介'],
  ['橙', 'orange', '收縮壓 160–179、空腹血糖 180–299、HbA1c ≥10', '7 天內家訪', '排入家訪派工'],
  ['黃', 'yellow', '收縮壓 140–159、空腹血糖 126–179', '14 天內衛教', '衛教＋複檢提醒'],
  ['綠', 'green', '邊緣值或正常', '例行年度追蹤', '年度追蹤'],
];

/** [狀態, 說明, 件數, key] */
export const trackStates: readonly (readonly [string, string, number, string])[] = [
  ['已派工', '派工給 FNP，待家訪', 22, 'assigned'],
  ['已訪視', '家訪完成，待複檢或轉介', 31, 'visited'],
  ['已複檢', '複檢採檢完成，待結果', 14, 'rechecked'],
  ['已穩定', '可關閉或轉長期管理', 18, 'stable'],
  ['失聯', '連續 2 次無法聯繫，升級 PMO', 5, 'lost'],
];
