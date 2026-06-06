import { html, type SafeHtml } from '../lib/html.ts';
import { icon, type IconName } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import type { Patient } from '../data/types.ts';
import { clinicalNavItems } from '../data/governance.ts';
import {
  closeClinicalNavDrawer,
  selectedPatient,
  setClinicalNav,
  toggleClinicalNavDrawer,
} from '../state/actions.ts';
import { renderMpiModule } from './mpi.ts';
import { renderTrackModule } from './track.ts';
import { renderClinicalWorkspace } from './workspace.ts';
import { renderQuestionnaireModule } from './questionnaire.ts';
import { renderPmoModule } from './pmo.ts';
import { renderKnowledgeModule } from './knowledge.ts';
import { renderAgentsModule } from './agents.ts';
import { renderGovernanceModule } from './governance.ts';
import { renderDecisionDashboard } from './dashboard.ts';
import { renderSiteModeModule } from './site-mode.ts';

function renderClinicalRail(): SafeHtml {
  const state = getState();
  return html`
    <button
      class="clinical-nav-trigger ${state.clinicalNavOpen ? 'open' : ''}"
      ${{ on: { click: () => toggleClinicalNavDrawer() } }}
      aria-expanded="${state.clinicalNavOpen ? 'true' : 'false'}"
      aria-controls="clinical-side-nav"
    >
      ${icon('home')}<span>選單</span>
    </button>
    ${state.clinicalNavOpen
      ? html`<button class="clinical-nav-backdrop" ${{ on: { click: () => closeClinicalNavDrawer() } }} aria-label="關閉選單"></button>`
      : ''}
    <nav
      id="clinical-side-nav"
      class="rail clinical-primary-rail clinical-rail-wide clinical-side-nav ${state.clinicalNavOpen ? 'open' : ''}"
      aria-label="醫護端主選單"
    >
      <div class="clinical-side-nav-head">
        <strong>醫護端導航</strong>
        <button class="ghost-btn" ${{ on: { click: () => closeClinicalNavDrawer() } }} aria-label="關閉選單">
          ${icon('check')}
        </button>
      </div>
      <div class="clinical-side-nav-items">
        ${clinicalNavItems.map(
          ([nav, ic, label, tagText]) => html`
            <button
              class="${state.clinicalNav === nav ? 'active' : ''}"
              title="${label}"
              ${{ on: { click: () => setClinicalNav(nav) } }}
            >
              ${icon(ic as IconName)}<span>${label}</span><em>${tagText}</em>
            </button>
          `,
        )}
      </div>
    </nav>
  `;
}

function renderClinicalStage(patient: Patient): SafeHtml {
  switch (getState().clinicalNav) {
    case 'mpi':
      return renderMpiModule(patient);
    case 'track':
      return renderTrackModule(patient);
    case 'workspace':
      return renderClinicalWorkspace(patient);
    case 'visit':
      return renderQuestionnaireModule();
    case 'site':
      return renderSiteModeModule();
    case 'pmo':
      return renderPmoModule();
    case 'knowledge':
      return renderKnowledgeModule();
    case 'agents':
      return renderAgentsModule();
    case 'governance':
      return renderGovernanceModule();
    default:
      return renderDecisionDashboard(patient);
  }
}

export function renderClinical(): SafeHtml {
  const patient = selectedPatient();
  return html`
    <main class="layout clinical-layout">
      ${renderClinicalRail()}
      <section class="clinical-stage">${renderClinicalStage(patient)}</section>
    </main>
  `;
}
