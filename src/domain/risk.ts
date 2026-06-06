import type { AgePackage, LabStatus, Patient } from '../data/types.ts';
import { agePackages } from '../data/age-packages.ts';
import { householdModules } from '../data/household.ts';

export interface SmartPlan {
  domain: string;
  goal: string;
  metric: string;
}

/** 年齡別健檢方案；年齡異常時回退「需人工確認」佔位方案。 */
export function packageForAge(age: number): AgePackage {
  if (!Number.isFinite(age) || age < 0) {
    return {
      band: '需人工確認',
      trigger: () => false,
      core: ['年齡資料異常，請先確認生日或戶籍資料'],
      labs: ['暫不自動排檢'],
      modules: ['資料品質檢核'],
    };
  }
  return (
    agePackages.find((item) => item.trigger(age)) ?? {
      band: '需人工確認',
      trigger: () => false,
      core: ['年齡資料異常，請先確認生日或戶籍資料'],
      labs: ['暫不自動排檢'],
      modules: ['資料品質檢核'],
    }
  );
}

export function moduleByCode(code: string): readonly [string, string, string] | undefined {
  return householdModules.find(([moduleCode]) => moduleCode === code);
}

export function friendlyHouseholdTag(tag: string): string {
  const code = /^H\d+/.exec(tag)?.[0];
  const module = code ? moduleByCode(code) : null;
  return module ? module[1] : tag.replace(/^H\d+\s*/, '');
}

export function patientSignalText(patient: Patient): string {
  return `${patient.tags.join(' ')} ${patient.householdTags.join(' ')} ${patient.conditions.join(' ')} ${patient.questionnaire.transport} ${patient.questionnaire.alert}`;
}

/** 依個案訊號產生最多 3 條生活型態醫學 SMART 建議（規則式，非臨床決策）。 */
export function smartPlanFor(patient: Patient): SmartPlan[] {
  const text = patientSignalText(patient);
  const plans: SmartPlan[] = [];

  if (text.includes('糖尿病') || text.includes('高血壓') || text.includes('慢病')) {
    plans.push({
      domain: '慢病穩定',
      goal: '晚餐後步行 10 分鐘，每週 5 天；6/18 前完成 5 次並由家人協助打卡。',
      metric: '5 次',
    });
    plans.push({
      domain: '飲食調整',
      goal: '一週至少 5 餐把含糖飲料改成白開水，晚餐飯量先減少 1/4。',
      metric: '5 餐',
    });
  }

  if (text.includes('吸菸') || text.includes('LDCT') || text.includes('肺')) {
    plans.push({
      domain: '肺健康',
      goal: '本週記錄每天吸菸支數，選 3 天延後第一支菸 30 分鐘，健檢時完成 LDCT 條件確認。',
      metric: '3 天',
    });
  }

  if (patient.age >= 65 || text.includes('跌倒') || text.includes('高齡')) {
    plans.push({
      domain: '高齡安全',
      goal: '3 天內完成浴室止滑、夜燈與走道雜物檢查，護理師下次家訪確認。',
      metric: '3 項',
    });
  }

  if (text.includes('孕') || text.includes('產檢')) {
    plans.push({
      domain: '孕產支持',
      goal: '本週確認下一次產檢日期、船班備案與緊急聯絡人，完成後傳給護理師。',
      metric: '1 份',
    });
  }

  if (patient.age < 18 || text.includes('兒少') || text.includes('視力') || text.includes('齲齒')) {
    plans.push({
      domain: '兒少健康',
      goal: '兩週內完成視力或牙科預約，家長每天睡前協助刷牙 2 分鐘。',
      metric: '14 天',
    });
  }

  if (!plans.length) {
    plans.push({
      domain: '預防保健',
      goal: '健檢前完成問卷、同意書與交通確認，健檢後 7 天內查看結果。',
      metric: '7 天',
    });
  }

  return plans.slice(0, 3);
}

/** 依個案訊號產生最多 3 條 AI 提示訊號（標題, 說明）。 */
export function aiSignalsFor(patient: Patient): (readonly [string, string])[] {
  const text = patientSignalText(patient);
  const signals: (readonly [string, string])[] = [];
  const flagged: LabStatus[] = ['high', 'low', 'watch'];

  if (patient.risk >= 80) {
    signals.push(['高風險優先', `家庭風險 ${patient.risk}/100，建議列入今日主動追蹤。`]);
  }
  if (patient.labs.some((lab) => flagged.includes(lab[5]))) {
    signals.push(['檢驗異常', '已偵測偏高/偏低或觀察項目，可先產生追蹤清單。']);
  }
  if (patient.labs.some((lab) => lab[5] === 'pending')) {
    signals.push(['缺漏檢驗', '仍有待補項目，AI 可帶入下次抽血或既有紀錄查核。']);
  }
  if (patient.consent.includes('待')) {
    signals.push(['同意書未完成', '建議家訪時先補簽同意與資料使用範圍。']);
  }
  if (text.includes('交通') || text.includes('船') || text.includes('天候')) {
    signals.push(['可近性阻礙', '需把交通、船班或陪同者放進到檢動員。']);
  }
  if (text.includes('跌倒') || text.includes('高齡')) {
    signals.push(['高齡安全', '建議同步評估居家安全、復能與長照資源。']);
  }

  return signals.slice(0, 3);
}

const LAB_STATUS_TEXT: Record<LabStatus, string> = {
  high: '偏高',
  low: '偏低',
  watch: '觀察',
  pending: '待補',
  ok: '正常',
};

export function labStatusText(status: LabStatus): string {
  return LAB_STATUS_TEXT[status] ?? '待判';
}
