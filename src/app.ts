import { html, type SafeHtml } from './lib/html.ts';
import { icon } from './lib/icon.ts';
import { getState } from './state/store.ts';
import { appFooter, governanceBar, topbar } from './components/chrome.ts';
import { renderAiDraftDrawer, renderModulePicker } from './components/drawers.ts';
import { renderLanding } from './modules/landing.ts';
import { renderClinical } from './modules/clinical.ts';
import { renderAgentDrawer } from './modules/agents.ts';
import { renderResident } from './resident/resident.ts';

function toast(): SafeHtml | string {
  const message = getState().toast;
  return message ? html`<div class="toast" role="status" aria-live="polite">${icon('check')}${message}</div>` : '';
}

/** 頂層視圖：依登入狀態與角色分派 landing / clinical / resident。 */
export function renderApp(): SafeHtml {
  const state = getState();
  if (!state.authenticated) {
    return html`${renderLanding()}${toast()}`;
  }
  return html`
    ${topbar()}
    ${state.role === 'clinical' ? governanceBar() : ''}
    ${state.role === 'clinical' ? renderClinical() : renderResident()}
    ${state.role === 'clinical' ? appFooter() : ''}
    ${renderAiDraftDrawer()}
    ${renderAgentDrawer()}
    ${renderModulePicker()}
    ${toast()}
  `;
}

/** 依登入狀態與角色決定根節點 className。 */
export function appClassName(): string {
  const state = getState();
  const mode = !state.authenticated
    ? 'landing-app'
    : state.role === 'resident'
      ? 'resident-app'
      : 'clinical-app';
  return `app ${mode}`;
}
