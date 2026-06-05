import { html, type SafeHtml } from '../lib/html.ts';
import { icon } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import { accessLevels } from '../data/access-levels.ts';
import type { AccessLevel } from '../data/types.ts';
import { currentLevel } from '../domain/rbac.ts';
import { selectAccess, loginWithAccess } from '../state/actions.ts';
import { appFooter } from '../components/chrome.ts';

const LOGO = '/assets/the-one-ai-logo.png';

function loginAccessCard(l: AccessLevel): SafeHtml {
  const active = getState().accessKey === l.key;
  return html`
    <button
      class="login-role-card rbac-login-card ${active ? 'active' : ''}"
      ${{ on: { click: () => selectAccess(l.key) } }}
      aria-checked="${active}"
      role="radio"
    >
      <span class="login-role-icon"><span class="lv-badge lv-${l.key.toLowerCase()}">${l.key}</span></span>
      <strong>${l.name}</strong>
      <small>${l.scope}</small>
      <em>${l.who}</em>
    </button>
  `;
}

export function renderLanding(): SafeHtml {
  const lv = currentLevel(getState().accessKey);
  const loginLabel = lv.role === 'resident' ? '登入民眾頁面（L5）' : `登入治理系統（${lv.key}）`;
  const account = lv.role === 'resident' ? 'family.h014' : `${lv.key.toLowerCase()}.ayoi@theone`;
  return html`
    <main class="landing-shell" aria-label="系統登入">
      <section class="landing-hero">
        <div class="landing-brand">
          <img class="landing-logo" src="${LOGO}" alt="The One AITech 本一科技 Logo" />
          <div>
            <h1>Ayoi 蘭嶼健康行動APP</h1>
            <p>Health Equity Command Center（HECC）｜全人健康照護與治理中樞</p>
          </div>
        </div>
        <div class="landing-grid">
          <section class="login-panel">
            <div class="login-panel-head">
              <div>
                <h2>選擇權限層級（五級 RBAC）</h2>
                <p>依附件 B 角色矩陣・MFA 安全模式</p>
              </div>
              <span class="status-pill green">${icon('shield')}MFA 啟用</span>
            </div>
            <div class="login-role-grid rbac-login-grid" role="radiogroup" aria-label="登入權限層級">
              ${accessLevels.map((l) => loginAccessCard(l))}
            </div>
            <div class="login-form-mock">
              <label>
                <span>帳號</span>
                <input value="${account}" aria-label="帳號" data-focus="login-account" />
              </label>
              <label>
                <span>密碼 + TOTP</span>
                <input type="password" value="mockpass" aria-label="密碼" />
              </label>
              <button class="btn login-submit" ${{ on: { click: () => loginWithAccess() } }}>
                ${icon('shield')}${loginLabel}
              </button>
            </div>
          </section>
        </div>
      </section>
      ${appFooter()}
    </main>
  `;
}
