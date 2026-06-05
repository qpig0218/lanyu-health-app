import { html, type SafeHtml } from '../lib/html.ts';
import { icon, type IconName } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import type { Patient } from '../data/types.ts';
import { clinicalNavItems } from '../data/governance.ts';
import { selectedPatient, setClinicalNav } from '../state/actions.ts';
import { renderMpiModule } from './mpi.ts';
import { renderTrackModule } from './track.ts';
import { renderClinicalWorkspace } from './workspace.ts';
import { renderPmoModule } from './pmo.ts';
import { renderKnowledgeModule } from './knowledge.ts';
import { renderAgentsModule } from './agents.ts';
import { renderGovernanceModule } from './governance.ts';
import { renderDecisionDashboard } from './dashboard.ts';

function renderClinicalRail(): SafeHtml {
  const state = getState();
  return html`
    <nav class="rail clinical-primary-rail clinical-rail-wide" aria-label="醫護端主選單">
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
