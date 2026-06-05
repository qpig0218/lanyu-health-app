import type { AccessKey, RoleKind } from '../data/types.ts';
import { patients } from '../data/patients.ts';

export type Lang = 'zh' | 'tao';

/** AI 草稿（Mock）資料結構，供草稿抽屜呈現。 */
export interface AiDraft {
  action: string;
  patientId: string;
  patientName: string;
  createdAt: string;
  chips: string[];
  hitl: string;
  model: string;
  confidence: string;
  why: string;
  interactionId: string;
  fallback: string;
  title: string;
  subtitle: string;
  sections: (readonly [string, string])[];
}

export interface State {
  role: RoleKind;
  loginRole: RoleKind;
  sessionRole: RoleKind | null;
  authenticated: boolean;
  selectedId: string;
  clinicalView: 'dashboard' | 'workspace';
  clinicalNav: string;
  dashboardView: 'policy' | 'war' | 'station' | 'resident';
  mpiTab: string;
  trackTab: string;
  pmoTab: string;
  kbLayer: string;
  kbQuery: string;
  govTab: string;
  agentDetail: string | null;
  accessKey: AccessKey;
  lang: Lang;
  tab: string;
  query: string;
  residentTab: string;
  residentStep: number;
  aiDraft: AiDraft | null;
  modulePicker: string | null;
  toast: string;
  /** 家訪問卷：目前表單頁籤（A/B/C/D/E/appendix）。 */
  qTable: string;
  /** 家訪問卷 E 表互動草稿（分流標籤、家戶風險、家庭模組、結案狀態）。 */
  qDraft: QuestionnaireDraft;
}

/** E 表可暫存的關鍵決策欄位。 */
export interface QuestionnaireDraft {
  triage: readonly string[];
  risk: string;
  modules: readonly string[];
  status: string;
}

/** 由 ?role= 或 hash 解析初始角色。 */
function initialRole(): RoleKind {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('role') ?? window.location.hash.replace('#', '');
  return requested === 'resident' ? 'resident' : 'clinical';
}

export function createInitialState(): State {
  const role = initialRole();
  return {
    role,
    loginRole: role,
    sessionRole: null,
    authenticated: false,
    selectedId: patients[0]!.id,
    clinicalView: 'dashboard',
    clinicalNav: 'dashboard',
    dashboardView: 'war',
    mpiTab: 'index',
    trackTab: 'board',
    pmoTab: 'nodes',
    kbLayer: 'K1',
    kbQuery: '',
    govTab: 'rbac',
    agentDetail: null,
    accessKey: 'L4',
    lang: 'zh',
    tab: 'overview',
    query: '',
    residentTab: 'home',
    residentStep: 0,
    aiDraft: null,
    modulePicker: null,
    toast: '',
    qTable: 'A',
    qDraft: { triage: [], risk: '', modules: [], status: '' },
  };
}
