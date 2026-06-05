import type { Patient } from '../data/types.ts';

/** 同意是否尚待補簽（"待補簽" 等含「待」字樣）。 */
export function isConsentPending(consent: string): boolean {
  return consent.includes('待');
}

/** 待補簽個案產生的提示訊號（無則回 null）。 */
export function consentSignal(patient: Patient): readonly [string, string] | null {
  if (!isConsentPending(patient.consent)) return null;
  return ['同意書未完成', '建議家訪時先補簽同意與資料使用範圍。'];
}

export interface WithdrawResult {
  withdrawn: boolean;
  label: string;
  /** 撤回後封存的時限（小時）。 */
  archiveWithinHours: number;
}

/**
 * 撤回同意後的狀態（對應 P11 §17.3）：
 * 24 小時內封存資料、停止跨機構共享與研究使用，撤回紀錄留存。
 */
export function withdrawConsent(): WithdrawResult {
  return {
    withdrawn: true,
    label: '已撤回同意，系統將於 24 小時內封存資料並停止跨機構共享與研究使用',
    archiveWithinHours: 24,
  };
}
