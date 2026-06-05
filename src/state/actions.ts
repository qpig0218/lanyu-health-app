import type { AccessKey, RoleKind } from '../data/types.ts';
import type { State } from './state.ts';
import { patients } from '../data/patients.ts';
import { agePackages } from '../data/age-packages.ts';
import { accessLevels } from '../data/access-levels.ts';
import { packageForAge, moduleByCode } from '../domain/risk.ts';
import { currentLevel } from '../domain/rbac.ts';
import { buildAiDraft } from '../domain/ai-draft.ts';
import { appendAudit } from '../domain/audit.ts';
import { withdrawConsent } from '../domain/consent.ts';
import { syncRoleToUrl } from '../lib/router.ts';
import { store } from './store.ts';

const set = (patch: Partial<State> | ((state: Readonly<State>) => Partial<State>)): void =>
  store.set(patch);
const get = (): Readonly<State> => store.get();

let toastTimer: ReturnType<typeof setTimeout> | null = null;

/** 顯示 toast 提示，1.8 秒後自動清除。 */
export function showToast(message: string): void {
  set({ toast: message });
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => set({ toast: '' }), 1800);
}

export function selectedPatient() {
  return patients.find((p) => p.id === get().selectedId) ?? patients[0]!;
}

// ---- 登入 / 角色 ----
export function selectLoginRole(role: RoleKind): void {
  set({ loginRole: role });
}

export function loginAs(role: RoleKind = get().loginRole): void {
  set({ authenticated: true, sessionRole: role, role, loginRole: role, aiDraft: null });
  syncRoleToUrl(role);
}

export function logout(): void {
  const currentRole = get().sessionRole ?? get().role;
  set({
    authenticated: false,
    sessionRole: null,
    loginRole: currentRole,
    aiDraft: null,
    modulePicker: null,
  });
  syncRoleToUrl('');
}

export function setRole(role: RoleKind): void {
  const s = get();
  if (!s.authenticated) {
    set({ loginRole: role });
    return;
  }
  if (s.sessionRole === 'resident' && role !== 'resident') {
    showToast('民眾帳號無權限進入醫療/護理系統');
    return;
  }
  set({ role });
  syncRoleToUrl(role);
}

/** 在登入面板選擇 RBAC 層級（尚未登入）。 */
export function selectAccess(key: AccessKey): void {
  const lv = accessLevels.find((l) => l.key === key);
  if (!lv) return;
  set({ accessKey: key, loginRole: lv.role });
}

/** 依目前選定的 access level 登入並設定預設導覽/儀表板視圖。 */
export function loginWithAccess(): void {
  const lv = currentLevel(get().accessKey);
  const dashboardView = ({ L1: 'policy', L2: 'war', L3: 'station', L4: 'station' } as const)[
    lv.key as 'L1' | 'L2' | 'L3' | 'L4'
  ] ?? 'war';
  set((s) => ({
    authenticated: true,
    sessionRole: lv.role,
    role: lv.role,
    loginRole: lv.role,
    clinicalNav: lv.role === 'clinical' ? lv.nav : s.clinicalNav,
    dashboardView,
    aiDraft: null,
  }));
  syncRoleToUrl(lv.role);
}

// ---- 醫護端導覽 ----
export function setClinicalNav(nav: string): void {
  set({ clinicalNav: nav, aiDraft: null });
}

export function setTab(tab: string): void {
  set({ clinicalView: 'workspace', clinicalNav: 'workspace', tab });
}

export function setClinicalView(view: 'dashboard' | 'workspace'): void {
  set({ clinicalView: view, clinicalNav: view });
}

export function setDashboardView(view: 'policy' | 'war' | 'station' | 'resident'): void {
  set({ dashboardView: view, clinicalNav: 'dashboard' });
}

export function setMpiTab(tab: string): void {
  set({ mpiTab: tab });
}
export function setTrackTab(tab: string): void {
  set({ trackTab: tab });
}
export function setPmoTab(tab: string): void {
  set({ pmoTab: tab });
}
export function setKbLayer(layer: string): void {
  set({ kbLayer: layer });
}
export function setKbQuery(query: string): void {
  set({ kbQuery: query });
}
export function setGovTab(tab: string): void {
  set({ govTab: tab });
}
export function setAgentDetail(code: string | null): void {
  set({ agentDetail: code });
}
export function setAccessKey(key: AccessKey): void {
  set({ accessKey: key });
}

// ---- 居民端 ----
export function setResidentTab(tab: string): void {
  set({ residentTab: tab });
}
export function setResidentStep(step: number): void {
  set({ residentStep: step });
}
export function prevResidentStep(): void {
  set((s) => ({ residentStep: Math.max(0, s.residentStep - 1) }));
}
export function nextResidentStep(): void {
  set((s) => ({ residentStep: Math.min(3, s.residentStep + 1) }));
  showToast('問卷已暫存');
}

export function withdrawConsentAction(): void {
  const result = withdrawConsent();
  showToast(result.label);
}

// ---- 名冊 / 篩選 ----
export function setQuery(value: string): void {
  set({ query: value });
}
export function setSelectedId(id: string): void {
  set({ selectedId: id });
}

export function setVillage(village: string): void {
  const s = get();
  const match = patients.find((p) => p.village === village);
  const nextQuery = s.query === village ? '' : village;
  set({ query: nextQuery, ...(match && nextQuery ? { selectedId: match.id } : {}) });
  showToast(nextQuery ? `已篩選 ${village}部落名冊` : '已清除部落篩選');
}

export function selectVisualPatient(id: string, tab: string = get().tab): void {
  set({
    selectedId: id,
    query: '',
    clinicalView: 'workspace',
    clinicalNav: 'workspace',
    ...(tab ? { tab } : {}),
  });
}

export function selectAgePackage(index: number): void {
  const target = agePackages[index];
  if (!target) return;
  const match = patients.find((p) => packageForAge(p.age).band === target.band);
  if (match) {
    set({
      clinicalView: 'workspace',
      clinicalNav: 'workspace',
      tab: 'checkup',
      selectedId: match.id,
      query: '',
    });
    return;
  }
  set({ clinicalView: 'workspace', clinicalNav: 'workspace', tab: 'checkup' });
  showToast(`${target.band} 目前無示範個案`);
}

// ---- AI 草稿 ----
export function aiToast(action: string, patientId?: string): void {
  const patient = patients.find((p) => p.id === patientId) ?? selectedPatient();
  const draft = buildAiDraft(action, patient);
  set({ aiDraft: draft });
  appendAudit({
    interactionId: draft.interactionId,
    actor: `${get().accessKey} ${get().sessionRole === 'resident' ? '居民' : 'FNP/照護'}`,
    action: `${action}（草擬）`,
    modelId: draft.model,
    hitlDecision: draft.hitl,
    sources: [draft.title.replace(' Mock', '')],
    module: '工作區',
  });
  showToast(`${action}：${patient.displayName} 已產生草稿`);
}

export function closeAiDraft(): void {
  set({ aiDraft: null });
}

export function applyAiDraft(): void {
  const draft = get().aiDraft;
  if (!draft) return;
  appendAudit({
    interactionId: draft.interactionId,
    actor: `${get().accessKey} 簽核`,
    action: `${draft.title.replace(' Mock', '')}（套用）`,
    modelId: draft.model,
    hitlDecision: 'H2 已簽核套用',
    sources: draft.sections.map(([title]) => title),
    module: '工作區',
  });
  showToast(`${draft.title.replace(' Mock', '')} 已套用到工作區草稿`);
}

// ---- 家庭模組選擇器 ----
export function openModulePicker(context = 'family'): void {
  set({ modulePicker: context });
}
export function closeModulePicker(): void {
  set({ modulePicker: null });
}
export function selectHouseholdModule(code: string): void {
  const module = moduleByCode(code);
  set({ modulePicker: null });
  showToast(module ? `${module[1]} 已加入家庭健康設計草稿` : '已更新家庭健康設計草稿');
}

// ---- 語言 ----
export function toggleLang(): void {
  const next = get().lang === 'tao' ? 'zh' : 'tao';
  set({ lang: next });
  showToast(next === 'tao' ? '已切換達悟語（族語答覆須部落顧問審定）' : '已切換中文');
}
