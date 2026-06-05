import { html, type SafeHtml } from '../lib/html.ts';
import { icon } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import { currentLevel } from '../domain/rbac.ts';
import { t } from '../i18n/index.ts';
import { logout, setRole, showToast, toggleLang } from '../state/actions.ts';

interface AccountProfile {
  initials: string;
  name: string;
  role: string;
  scope: string;
  badge: string;
}

const LOGO = '/assets/the-one-ai-logo.png';

/** 依目前登入身分產生帳號顯示資訊。 */
function accountProfile(): AccountProfile {
  const state = getState();
  if (state.sessionRole === 'resident') {
    return {
      initials: '夏',
      name: '夏曼家',
      role: '民眾帳號 · L5',
      scope: '家庭共享權限',
      badge: '家戶成員',
    };
  }
  const lv = currentLevel(state.accessKey);
  const names: Record<string, string> = {
    L1: '照護司 蔡司長',
    L2: 'PMO 阿德主任',
    L3: '駐點 王主任',
    L4: 'FNP 阿德護理師',
  };
  return {
    initials: lv.key,
    name: names[lv.key] ?? '照護團隊',
    role: `${lv.key} · ${lv.name}`,
    scope: `${lv.scope}`,
    badge: lv.name,
  };
}

export function topbar(): SafeHtml {
  const state = getState();
  const profile = accountProfile();
  return html`
    <header class="topbar app-topbar-auth">
      <div class="account-area">
        <button
          class="account-chip"
          ${{ on: { click: () => showToast(`${profile.name}｜${profile.scope}`) } }}
        >
          <span class="account-avatar">${profile.initials}</span>
          <span class="account-copy">
            <strong>${profile.name}</strong>
            <small>${profile.role}</small>
          </span>
        </button>
        <button class="account-logout" ${{ on: { click: () => logout() } }} title="登出" aria-label="登出">
          ${icon('arrow')}<span>登出</span>
        </button>
      </div>
      <div class="brand brand-centered">
        <img class="company-logo" src="${LOGO}" alt="The One AITech 本一科技 Logo" />
        <div>
          <h1 class="brand-title">Ayoi 蘭嶼健康行動APP</h1>
          <p class="brand-subtitle">The One AITech 本一科技｜家戶圖譜、全齡健檢、檢驗值與家庭健康設計模組</p>
        </div>
      </div>
      <div class="utility-actions auth-actions">
        <span class="role-scope-pill">${icon('shield')}${profile.badge}</span>
        ${state.sessionRole === 'clinical' && state.role === 'resident'
          ? html`<button class="ghost-btn" ${{ on: { click: () => setRole('clinical') } }}>${icon('lab')}回醫護</button>`
          : ''}
        <button class="ghost-btn" ${{ on: { click: () => showToast('已建立離線草稿，回到有網路時同步') } }}>
          ${icon('shield')}離線模式
        </button>
        <button class="btn" ${{ on: { click: () => showToast('本原型已模擬儲存') } }}>${icon('check')}儲存</button>
      </div>
    </header>
  `;
}

export function appFooter(): SafeHtml {
  return html`
    <footer class="app-footer" aria-label="版權資訊">
      <div class="footer-brand">
        <img class="footer-logo" src="${LOGO}" alt="The One AITech 本一科技 Logo" />
        <span>Copyright © 2026 The One AITech 本一科技 版權所有</span>
      </div>
    </footer>
  `;
}

export function governanceBar(): SafeHtml {
  const state = getState();
  const lv = currentLevel(state.accessKey);
  return html`
    <div class="gov-bar" aria-label="治理狀態列">
      <div class="gov-left">
        <span class="gov-rbac"><span class="lv-badge lv-${lv.key.toLowerCase()}">${lv.key}</span>${lv.name}</span>
        <span class="gov-sep"></span>
        <span class="gov-scope">${icon('lock')}可視範圍：${lv.scope}</span>
      </div>
      <div class="gov-right">
        <button
          class="gov-pill ${state.lang === 'tao' ? 'active' : ''}"
          ${{ on: { click: () => toggleLang() } }}
          title="${t('lang.toggleTitle')}"
        >
          ${icon('globe')}${state.lang === 'tao' ? t('lang.tao') : t('lang.zh')}
        </button>
        <span class="gov-pill online" title="離島離線優先：可離線 7 天">${icon('shield')}離線就緒 7 天</span>
        <span class="gov-pill" title="共用 Metadata 字典版本">字典 v2.1@2026-05-15</span>
      </div>
    </div>
  `;
}
