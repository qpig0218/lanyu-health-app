import { describe, it, expect } from 'vitest';
import { isConsentPending, consentSignal, withdrawConsent } from '../src/domain/consent.ts';
import type { Patient } from '../src/data/types.ts';

const base: Patient = {
  id: 'P-X',
  household: 'H',
  name: 'x',
  displayName: 'x',
  age: 34,
  sex: '女',
  village: '朗島',
  phone: '',
  consent: '待補簽',
  identity: '',
  contact: '本人',
  risk: 55,
  level: '黃',
  tags: [],
  householdTags: [],
  conditions: [],
  questionnaire: { transport: '', householdGoal: '', alert: '', home: '' },
  labs: [],
};

describe('consent', () => {
  it('待補簽視為待處理', () => {
    expect(isConsentPending('待補簽')).toBe(true);
    expect(isConsentPending('已同意')).toBe(false);
  });

  it('待補簽個案產生提示訊號', () => {
    const signal = consentSignal(base);
    expect(signal).not.toBeNull();
    expect(signal![0]).toBe('同意書未完成');
  });

  it('已同意個案不產生訊號', () => {
    expect(consentSignal({ ...base, consent: '已同意' })).toBeNull();
  });

  it('撤回後狀態：24 小時內封存', () => {
    const result = withdrawConsent();
    expect(result.withdrawn).toBe(true);
    expect(result.archiveWithinHours).toBe(24);
  });
});
