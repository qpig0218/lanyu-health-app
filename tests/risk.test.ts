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
  it('0 歲 → 0-未滿 1 歲', () => {
    expect(packageForAge(0).band).toBe('0-未滿 1 歲');
  });
  it('1 歲 → 1-2 歲', () => {
    expect(packageForAge(1).band).toBe('1-2 歲');
  });
  it('18 歲 → 13-18 歲', () => {
    expect(packageForAge(18).band).toBe('13-18 歲');
  });
  it('65 歲 → 65-74 歲', () => {
    expect(packageForAge(65).band).toBe('65-74 歲');
  });
  it('85 歲以上', () => {
    expect(packageForAge(90).band).toBe('85 歲以上');
  });
  it('負數年齡 → 需人工確認', () => {
    expect(packageForAge(-5).band).toBe('0-未滿 1 歲'); // age < 1 命中第一段
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
