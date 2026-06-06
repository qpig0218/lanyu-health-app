import { describe, it, expect } from 'vitest';
import { packageForAge, smartPlanFor, aiSignalsFor, labStatusText } from '../src/domain/risk.ts';
import type { Patient } from '../src/data/types.ts';

function makePatient(overrides: Partial<Patient>): Patient {
  return {
    id: 'P-TEST',
    household: 'H-測試-001',
    name: '測試',
    displayName: '測試',
    age: 40,
    sex: '男',
    village: '東清',
    phone: '09xx',
    consent: '已同意',
    identity: '達悟/雅美',
    contact: '本人',
    risk: 50,
    level: '黃',
    tags: [],
    householdTags: [],
    conditions: [],
    questionnaire: { transport: '', householdGoal: '', alert: '', home: '' },
    labs: [],
    ...overrides,
  };
}

describe('packageForAge 年齡邊界', () => {
  it('未滿 7 歲 → 不列主檢包', () => {
    expect(packageForAge(0).band).toBe('未滿 7 歲：不列主檢包');
    expect(packageForAge(6).band).toBe('未滿 7 歲：不列主檢包');
  });
  it('7-18 歲 → 兒少 S 版', () => {
    expect(packageForAge(7).band).toBe('7-18 歲：兒少 S 版');
    expect(packageForAge(18).band).toBe('7-18 歲：兒少 S 版');
  });
  it('19-49 歲 → 成人 A 版', () => {
    expect(packageForAge(19).band).toBe('19-49 歲：成人 A 版');
    expect(packageForAge(49).band).toBe('19-49 歲：成人 A 版');
  });
  it('50-64 歲 → 成人 B 版', () => {
    expect(packageForAge(50).band).toBe('50-64 歲：成人 B 版');
    expect(packageForAge(64).band).toBe('50-64 歲：成人 B 版');
  });
  it('65 歲以上 → 高齡 G 版', () => {
    expect(packageForAge(65).band).toBe('65+：高齡 G 版');
    expect(packageForAge(90).band).toBe('65+：高齡 G 版');
  });
  it('負數年齡 → 需人工確認', () => {
    expect(packageForAge(-5).band).toBe('需人工確認');
    expect(packageForAge(NaN).band).toBe('需人工確認');
  });
});

describe('smartPlanFor', () => {
  it('慢病觸發慢病穩定，且最多 3 條', () => {
    const p = makePatient({ conditions: ['高血壓', '糖尿病'], tags: ['吸菸'], age: 70 });
    const plans = smartPlanFor(p);
    expect(plans.length).toBeLessThanOrEqual(3);
    expect(plans.some((x) => x.domain === '慢病穩定')).toBe(true);
  });
  it('無訊號時回退預防保健', () => {
    const p = makePatient({ age: 25 });
    const plans = smartPlanFor(p);
    expect(plans).toHaveLength(1);
    expect(plans[0]!.domain).toBe('預防保健');
  });
});

describe('aiSignalsFor', () => {
  it('高風險 + 異常檢驗觸發訊號，上限 3', () => {
    const p = makePatient({
      risk: 86,
      consent: '待補簽',
      labs: [['Glucose', '血糖', 142, 'mg/dL', '70-99', 'high']],
      conditions: ['跌倒'],
      questionnaire: { transport: '需船班', householdGoal: '', alert: '', home: '' },
    });
    const signals = aiSignalsFor(p);
    expect(signals.length).toBeLessThanOrEqual(3);
    expect(signals[0]![0]).toBe('高風險優先');
  });
});

describe('labStatusText', () => {
  it('對應狀態文字', () => {
    expect(labStatusText('high')).toBe('偏高');
    expect(labStatusText('pending')).toBe('待補');
  });
});
