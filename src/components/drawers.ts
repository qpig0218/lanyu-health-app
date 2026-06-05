import { html, type SafeHtml } from '../lib/html.ts';
import { icon } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import { householdModules } from '../data/household.ts';
import {
  applyAiDraft,
  closeAiDraft,
  closeModulePicker,
  selectedPatient,
  selectHouseholdModule,
  showToast,
} from '../state/actions.ts';

export function renderAiDraftDrawer(): SafeHtml | string {
  const draft = getState().aiDraft;
  if (!draft) return '';
  return html`
    <aside class="ai-draft-drawer" aria-label="AI草稿預覽">
      <div class="ai-draft-toolbar">
        <div>
          <span class="ai-kicker">Mock 產出預覽</span>
          <h2>${draft.title}</h2>
          <p>${draft.subtitle}</p>
        </div>
        <button class="ghost-btn ai-draft-close" ${{ on: { click: () => closeAiDraft() } }} aria-label="關閉AI草稿">
          ${icon('check')}關閉
        </button>
      </div>
      <div class="ai-draft-meta">
        <strong>${draft.patientName}</strong>
        <span>${draft.patientId}</span>
        <span>${draft.createdAt}</span>
      </div>
      <div class="ai-draft-chip-row">
        ${draft.chips.map((chip) => html`<span class="tag">${chip}</span>`)}
      </div>
      ${draft.hitl
        ? html`
            <div class="ai-gov-strip">
              <span class="hitl-badge">${draft.hitl}</span>
              <span class="model-badge">${draft.model}</span>
              <span class="status-pill ${draft.confidence.startsWith('高') ? 'green' : 'yellow'}">
                信心：${draft.confidence}
              </span>
              <span class="tag">${draft.interactionId}</span>
            </div>
            <section class="ai-draft-section xai-section">
              <h3>${icon('search')}為什麼這個建議？（XAI）</h3>
              <p>${draft.why}</p>
            </section>
          `
        : ''}
      <div class="ai-draft-content">
        ${draft.sections.map(
          ([title, body]) => html`
            <section class="ai-draft-section">
              <h3>${title}</h3>
              <p>${body}</p>
            </section>
          `,
        )}
      </div>
      <div class="ai-draft-actions">
        <button class="btn" ${{ on: { click: () => applyAiDraft() } }}>${icon('clipboard')}套用到工作區草稿</button>
        <button class="ghost-btn" ${{ on: { click: () => showToast('已複製AI Mock草稿內容') } }}>
          ${icon('check')}複製內容
        </button>
      </div>
    </aside>
  `;
}

export function renderModulePicker(): SafeHtml | string {
  if (!getState().modulePicker) return '';
  const activeCodes = selectedPatient()
    .householdTags.map((tag) => tag.match(/^H\d+/)?.[0])
    .filter((code): code is string => Boolean(code));
  return html`
    <div class="module-modal-backdrop" ${{ on: { click: () => closeModulePicker() } }} role="presentation">
      <section
        class="module-modal"
        ${{ on: { click: (e: Event) => e.stopPropagation() } }}
        role="dialog"
        aria-modal="true"
        aria-label="選擇家庭健康設計"
      >
        <div class="module-modal-head">
          <div>
            <span class="ai-kicker">家庭健康設計選擇器</span>
            <h2>選擇要啟用的照護情境</h2>
            <p>以名稱與任務情境挑選，系統會在後台保留模組代碼，現場不用讀代碼表。</p>
          </div>
          <button class="ghost-btn" ${{ on: { click: () => closeModulePicker() } }}>${icon('check')}關閉</button>
        </div>
        <div class="module-option-grid">
          ${householdModules.map(([code, title, detail]) => {
            const active = activeCodes.includes(code);
            return html`
              <button
                class="module-option ${active ? 'active' : ''}"
                ${{ on: { click: () => selectHouseholdModule(code) } }}
              >
                <span class="module-option-code">${code}</span>
                <span>
                  <strong>${title}</strong>
                  <small>${detail}</small>
                </span>
                <em>${active ? '已啟用' : '選擇'}</em>
              </button>
            `;
          })}
        </div>
      </section>
    </div>
  `;
}
