import type { Patient } from '../data/types.ts';
import type { AiDraft } from '../state/state.ts';
import { aiSignalsFor, labStatusText, packageForAge, smartPlanFor } from './risk.ts';

const FLAGGED = ['high', 'low', 'watch'] as const;

/**
 * 依動作與個案產生 AI 草稿（Mock）。純函式：不接觸 DOM 或 store。
 * 規則引擎為主、LLM 僅排序輔助，不做臨床決策；附 HITL／模型／XAI／fallback／interaction_id。
 */
export function buildAiDraft(action: string, patient: Patient): AiDraft {
  const signals = aiSignalsFor(patient);
  const smartPlans = smartPlanFor(patient);
  const abnormalLabs = patient.labs.filter((lab) => FLAGGED.includes(lab[5] as (typeof FLAGGED)[number]));
  const pendingLabs = patient.labs.filter((lab) => lab[5] === 'pending');
  const createdAt = new Date().toLocaleString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const base = {
    action,
    patientId: patient.id,
    patientName: patient.displayName,
    createdAt,
    chips: [patient.household, `${patient.village}部落`, `${patient.age}歲・${patient.sex}`, patient.consent],
    hitl: action.includes('今日工作') || action.includes('動態') ? 'H4 自動但留證' : 'H2 草擬・待簽核',
    model: 'Claude Haiku 4.5（M 中型）· 規則引擎輔助',
    confidence: patient.risk >= 80 ? '中（高風險建議人工複核）' : '高',
    why: `依目前個案訊號（風險 ${patient.risk}/100、${signals.map(([title]) => title).join('、') || '例行追蹤'}）與規則引擎產生；ML 僅排序輔助，不做臨床決策。`,
    fallback: '模型不可用或低信心時退回規則式清單，僅列事實不下臨床判斷，並提示人工複核。',
    interactionId: `AI-${patient.id}-${Date.now().toString().slice(-6)}`,
  };

  if (action.includes('檢驗')) {
    return {
      ...base,
      title: 'AI檢驗追蹤摘要 Mock',
      subtitle: '把檢驗值轉成護理追蹤重點與居民可讀說明。',
      sections: [
        ['異常/觀察', abnormalLabs.map((lab) => `${lab[1]} ${lab[2]}${lab[3]}（${labStatusText(lab[5])}，參考 ${lab[4]}）`).join('；') || '目前沒有異常檢驗值。'],
        ['待補資料', pendingLabs.map((lab) => `${lab[1]}：下次抽血或調閱既有紀錄時補齊。`).join('；') || '無待補檢驗。'],
        ['居民說明', `${patient.displayName} 目前需追蹤的檢驗項目會由護理師協助確認，不需要自行判讀數字；若出現不適或警訊，請直接聯絡照護團隊。`],
        ['下一步', '建立 2 週內電話追蹤，必要時安排門診或衛生所複測，並把結果同步到家庭健康設計模組。'],
      ],
    };
  }

  if (action.includes('SMART') || action.includes('同步照護任務')) {
    return {
      ...base,
      title: 'AI生活型態醫學 SMART 建議 Mock',
      subtitle: '把分流結果轉成可被家人執行、可量測的任務。',
      sections: [
        ['本週目標', smartPlans.map((plan, index) => `${index + 1}. ${plan.domain}：${plan.goal}（指標：${plan.metric}）`).join('\n')],
        ['家庭協作', `${patient.contact} 協助提醒與打卡；護理師下次家訪確認阻礙、調整目標難度。`],
        ['追蹤條件', '若目標未達成，先記錄原因：交通、天候、照顧負荷、藥物副作用或家庭支持不足。'],
      ],
    };
  }

  if (action.includes('排程') || action.includes('健檢')) {
    const pkg = packageForAge(patient.age);
    return {
      ...base,
      title: 'AI健檢排程草稿 Mock',
      subtitle: '依年齡層、風險與到檢阻礙整理健檢日任務。',
      sections: [
        ['分齡方案', `${pkg.band}：${pkg.core.slice(0, 4).join('、')}。`],
        ['到檢提醒', `${patient.questionnaire.transport}；健檢前一天提醒空腹、證件、同意書與陪同者。`],
        ['缺漏併檢', pendingLabs.length ? pendingLabs.map((lab) => lab[1]).join('、') : '目前無待補檢驗。'],
        ['現場分工', '報到核身、抽血/檢查、異常值回收、回家後 7 天內檢驗說明。'],
      ],
    };
  }

  if (action.includes('動態')) {
    return {
      ...base,
      title: 'AI個案動態摘要 Mock',
      subtitle: '把風險、問卷、檢驗與未完成事項整理成追蹤雷達。',
      sections: [
        ['優先訊號', signals.map(([title, detail]) => `${title}：${detail}`).join('\n') || '目前以例行追蹤為主。'],
        ['家戶風險', `家庭風險分數 ${patient.risk}/100；目前啟用 ${patient.householdTags.join('、')}。`],
        ['未完成事項', `${pendingLabs.length} 個檢驗待補、同意狀態 ${patient.consent}、到檢協助：${patient.questionnaire.transport}。`],
        ['建議通知', `通知 ${patient.contact}，同步健檢時間、交通安排與家屬協助事項。`],
      ],
    };
  }

  if (action.includes('今日工作')) {
    return {
      ...base,
      title: 'AI今日交班摘要 Mock',
      subtitle: '把儀表板任務整理成可交班的工作清單。',
      sections: [
        ['今日家訪', '18 戶：完成 12、未遇 4、需再訪 2；優先處理 P1、P3、P8 個案。'],
        ['健檢動員', '健檢名冊 642 人，已同意 71%；交通與陪同需求需在健檢前 3 天確認。'],
        ['高風險', `${patient.displayName}：${patient.tags.join('、')}；家庭風險 ${patient.risk}/100。`],
        ['交班提醒', '檢驗異常待簽核 27 件，高風險 8 件需先產生居民可讀說明。'],
      ],
    };
  }

  return {
    ...base,
    title: 'AI家訪摘要草稿 Mock',
    subtitle: '問卷、健檢、檢驗與家庭模組自動整理成護理紀錄草稿。',
    sections: [
      ['S 主觀資料', `${patient.displayName} 家庭主要目標為「${patient.questionnaire.householdGoal}」。家戶狀態：${patient.questionnaire.home}；到檢阻礙：${patient.questionnaire.transport}。`],
      ['O 客觀資料', `分流標籤：${patient.tags.join('、')}；家庭模組：${patient.householdTags.join('、')}；風險分數 ${patient.risk}/100。`],
      ['A 評估', signals.map(([title, detail]) => `${title}：${detail}`).join('\n') || '目前以預防保健與資料補齊為主。'],
      ['P 計畫', smartPlans.map((plan) => `${plan.domain}：${plan.goal}`).join('\n')],
      ['待辦', '補齊同意/聯絡資訊、確認健檢排程、異常檢驗回收後產生居民可讀說明。'],
    ],
  };
}
