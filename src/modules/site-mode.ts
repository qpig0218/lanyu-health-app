import { html, type SafeHtml } from '../lib/html.ts';
import { icon } from '../lib/icon.ts';
import {
  fieldsForSiteForm,
  siteFormCompletion,
  siteForms,
  type SiteField,
  type SiteForm,
} from '../data/site-forms.ts';
import { getState } from '../state/store.ts';
import {
  saveSiteModeDraft,
  setSiteForm,
  toggleSiteFieldOption,
  updateSiteField,
} from '../state/actions.ts';

function selectedOptions(value: string): string[] {
  return value
    .split('、')
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderField(formId: string, field: SiteField): SafeHtml {
  const value = getState().siteDrafts[formId]?.[field.id] ?? '';
  if (field.kind === 'multi') {
    const selected = selectedOptions(value);
    return html`
      <div class="site-field site-field-multi">
        <label>${field.label}</label>
        <div class="site-choice-row">
          ${(field.options ?? []).map((option) => {
            const on = selected.includes(option);
            return html`
              <button
                class="site-choice ${on ? 'on' : ''}"
                ${{ on: { click: () => toggleSiteFieldOption(formId, field.id, option) } }}
              >
                ${on ? icon('check') : ''}${option}
              </button>
            `;
          })}
        </div>
        ${field.prompt ? html`<small>${field.prompt}</small>` : ''}
      </div>
    `;
  }

  if (field.kind === 'time' || field.kind === 'date' || field.kind === 'text') {
    return html`
      <div class="site-field">
        <label for="${field.id}">${field.label}</label>
        <input
          id="${field.id}"
          type="${field.kind === 'time' ? 'time' : field.kind === 'date' ? 'date' : 'text'}"
          value="${value}"
          placeholder="${field.prompt ?? ''}"
          data-focus="site-${field.id}"
          ${{ on: { input: (event: Event) => updateSiteField(formId, field.id, (event.target as HTMLInputElement).value) } }}
        />
      </div>
    `;
  }

  return html`
    <div class="site-field site-field-area">
      <label for="${field.id}">${field.label}</label>
      <textarea
        id="${field.id}"
        placeholder="${field.prompt ?? ''}"
        data-focus="site-${field.id}"
        ${{ on: { input: (event: Event) => updateSiteField(formId, field.id, (event.target as HTMLTextAreaElement).value) } }}
      >${value}</textarea>
    </div>
  `;
}

function renderFormNav(): SafeHtml {
  const state = getState();
  return html`
    <div class="site-form-nav" aria-label="場勘表單頁籤">
      ${siteForms.map((form) => {
        const completion = siteFormCompletion(form, state.siteDrafts[form.id] ?? {});
        return html`
          <button
            class="${state.siteFormId === form.id ? 'active' : ''}"
            ${{ on: { click: () => setSiteForm(form.id) } }}
          >
            <span>${form.id}</span>
            <strong>${form.badge}</strong>
            <small>${completion.filled}/${completion.total}</small>
          </button>
        `;
      })}
    </div>
  `;
}

function renderHeaderFields(form: SiteForm): SafeHtml {
  return html`
    <section class="site-card site-header-card">
      <div class="site-header-fields">${form.headerFields.map((field) => renderField(form.id, field))}</div>
    </section>
  `;
}

function renderReviewBlock(): SafeHtml {
  const state = getState();
  return html`
    <section class="site-card site-review">
      <div class="site-card-head">
        <span class="ai-kicker">四單位填答回看</span>
        <h3>已填內容</h3>
      </div>
      <div class="site-review-grid">
        ${siteForms
          .filter((form) => form.id !== 'F-05')
          .map((form) => {
            const draft = state.siteDrafts[form.id] ?? {};
            const filled = fieldsForSiteForm(form).filter((field) => (draft[field.id] ?? '').trim());
            return html`
              <details class="site-review-unit" ${filled.length ? 'open' : ''}>
                <summary><strong>${form.badge}</strong><span>${filled.length} 筆</span></summary>
                <div class="site-review-list">
                  ${filled.length
                    ? filled.map(
                        (field) => html`
                          <div>
                            <dt>${field.label}</dt>
                            <dd>${draft[field.id]}</dd>
                          </div>
                        `,
                      )
                    : html`<p class="minor">尚未填寫</p>`}
                </div>
              </details>
            `;
          })}
      </div>
    </section>
  `;
}

function renderSiteForm(form: SiteForm): SafeHtml {
  const completion = siteFormCompletion(form, getState().siteDrafts[form.id] ?? {});
  const pct = completion.total ? Math.round((completion.filled / completion.total) * 100) : 0;
  return html`
    <section class="site-form">
      <div class="site-form-head">
        <div>
          <span class="ai-kicker">2026/06/09 蘭嶼現場勘查</span>
          <h2>${form.title}</h2>
          <p>${form.unit}</p>
        </div>
        <div class="site-progress" aria-label="填寫進度">
          <strong>${pct}%</strong>
          <span><b style="width:${pct}%"></b></span>
          <small>${completion.filled}/${completion.total}</small>
        </div>
      </div>
      ${renderHeaderFields(form)}
      ${form.id === 'F-05' ? renderReviewBlock() : ''}
      <div class="site-section-list">
        ${form.sections.map(
          (section) => html`
            <section class="site-card">
              <div class="site-card-head">
                <h3>${section.title}</h3>
              </div>
              <div class="site-field-list">${section.fields.map((field) => renderField(form.id, field))}</div>
            </section>
          `,
        )}
      </div>
      <div class="site-save-bar">
        <span>${icon('shield')}離線草稿</span>
        <button class="btn" ${{ on: { click: () => saveSiteModeDraft() } }}>${icon('check')}暫存</button>
      </div>
    </section>
  `;
}

export function renderSiteModeModule(): SafeHtml {
  const state = getState();
  const form = siteForms.find((item) => item.id === state.siteFormId) ?? siteForms[0]!;
  return html`
    <section class="module-stage site-mode-stage">
      <div class="module-stage-head">
        <div>
          <span class="ai-kicker">現場模式</span>
          <h2>四單位一頁式填答表</h2>
          <p>衛生所、部桃/醫福會 PMO、照護司 PMO、東馬與總結頁。</p>
        </div>
        <button class="ghost-btn" ${{ on: { click: () => saveSiteModeDraft() } }}>${icon('shield')}離線暫存</button>
      </div>
      ${renderFormNav()}
      ${renderSiteForm(form)}
    </section>
  `;
}
