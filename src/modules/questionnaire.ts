import { html, type SafeHtml } from '../lib/html.ts';
import { icon } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import {
  formOverview,
  nextActions,
  questionnaireMeta,
  questionnaireRefs,
  questionnaireTables,
  riskLevels,
  roleBoundaries,
  signoffItems,
  supportModules,
  triageTags,
  type QItem,
  type QTable,
} from '../data/questionnaire.ts';
import {
  saveQuestionnaire,
  setQRisk,
  setQStatus,
  setQTable,
  showToast,
  toggleQModule,
  toggleQTriage,
} from '../state/actions.ts';

/** 表單頁籤：A-D 來自 schema，E 與附錄為特製頁。 */
const TAB_LABELS: readonly (readonly [string, string])[] = [
  ['A', 'A 家戶'],
  ['B', 'B 個人分流'],
  ['C', 'C 13 項評估'],
  ['D', 'D 加強模組'],
  ['E', 'E 分流計畫'],
  ['appendix', '附錄 分工'],
];

// ---- 題項渲染（忠實外觀，靜態為主）----

function renderChoices(opts: readonly string[], type: 'single' | 'multi'): SafeHtml {
  const box = type === 'single' ? 'radio' : 'checkbox';
  return html`
    <div class="q-choices ${type}">
      ${opts.map(
        (o) => html`<label class="q-choice"><span class="q-box ${box}"></span>${o}</label>`,
      )}
    </div>
  `;
}

function renderItem(item: QItem): SafeHtml {
  switch (item.k) {
    case 'fill':
      return html`<div class="q-item q-fill"><label>${item.q}</label><span class="q-line"></span></div>`;
    case 'note':
      return html`<div class="q-item q-note"><label>${item.q}</label><div class="q-textarea"></div></div>`;
    case 'single':
      return html`<div class="q-item"><label>${item.q}</label>${renderChoices(item.opts, 'single')}</div>`;
    case 'multi':
      return html`<div class="q-item"><label>${item.q}</label>${renderChoices(item.opts, 'multi')}</div>`;
    case 'result':
      return html`<div class="q-item q-result"><label>${icon('check')}${item.q}</label>${renderChoices(item.opts, 'single')}</div>`;
    case 'scale':
      return html`
        <div class="q-item q-scale">
          <label>${item.q}</label>
          <div class="q-scale-track">
            ${Array.from({ length: item.max - item.min + 1 }, (_, i) => i + item.min).map(
              (n) => html`<span class="q-scale-dot">${n}</span>`,
            )}
          </div>
        </div>
      `;
    case 'grid':
      return html`
        <div class="q-item q-grid-wrap">
          ${item.q ? html`<label>${item.q}</label>` : ''}
          <table class="q-grid">
            <thead>
              <tr>
                <th>項目</th>
                ${item.cols.map((c) => html`<th>${c}</th>`)}
              </tr>
            </thead>
            <tbody>
              ${item.rows.map(
                (r) => html`
                  <tr>
                    <td class="q-grid-row">${r}</td>
                    ${item.cols.map(() => html`<td class="q-grid-cell"><span class="q-box radio"></span></td>`)}
                  </tr>
                `,
              )}
            </tbody>
          </table>
          ${item.foot ? html`<p class="q-foot">${item.foot}</p>` : ''}
        </div>
      `;
    case 'table':
      return html`
        <div class="q-item q-grid-wrap">
          <table class="q-grid q-fill-table">
            <thead>
              <tr>
                ${item.cols.map((c) => html`<th>${c}</th>`)}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: item.rows }).map(
                () => html`<tr>${item.cols.map(() => html`<td class="q-blank"></td>`)}</tr>`,
              )}
            </tbody>
          </table>
          ${item.note ? html`<p class="q-foot">${item.note}</p>` : ''}
        </div>
      `;
  }
}

function renderTable(table: QTable): SafeHtml {
  return html`
    <div class="q-table">
      <header class="q-table-head">
        <div>
          <span class="q-table-code">${table.code} 表</span>
          <h2>${table.title}</h2>
        </div>
        <span class="q-filler">${icon('users')}填寫者：${table.filler}</span>
      </header>
      ${table.intro ? html`<p class="q-table-intro">${table.intro}</p>` : ''}
      ${table.sections.map(
        (sec) => html`
          <section class="q-section">
            <h3>${sec.title}</h3>
            ${sec.intro ? html`<p class="q-section-intro">${sec.intro}</p>` : ''}
            <div class="q-items">${sec.items.map((item) => renderItem(item))}</div>
          </section>
        `,
      )}
    </div>
  `;
}

// ---- E 表：互動分流決策 ----

function renderETable(): SafeHtml {
  const { triage, risk, modules, status } = getState().qDraft;
  return html`
    <div class="q-table q-e-table">
      <header class="q-table-head">
        <div>
          <span class="q-table-code">E 表</span>
          <h2>分流、風險分級與家庭全人照護計畫</h2>
        </div>
        <span class="q-filler">${icon('users')}填寫者：FNP/居護師主責</span>
      </header>

      <section class="q-section">
        <h3>E1. 個人服務分流標籤（可複選）</h3>
        <div class="q-triage-grid">
          ${triageTags.map(([code, name, cond, action]) => {
            const on = triage.includes(code);
            return html`
              <button
                class="q-triage ${on ? 'on' : ''} ${code === 'P0' ? 'urgent' : ''}"
                ${{ on: { click: () => toggleQTriage(code) } }}
              >
                <span class="q-triage-top"><strong>${code}</strong>${name}</span>
                <small class="q-triage-cond">${cond}</small>
                <small class="q-triage-action">${icon('arrow')}${action}</small>
              </button>
            `;
          })}
        </div>
      </section>

      <section class="q-section">
        <h3>E2. 家戶風險分級（單選）</h3>
        <div class="q-risk-grid">
          ${riskLevels.map(([level, color, judge, follow]) => {
            const on = risk === level;
            return html`
              <button
                class="q-risk lv-${color} ${on ? 'on' : ''}"
                ${{ on: { click: () => setQRisk(level) } }}
              >
                <span class="q-risk-dot"></span>
                <span class="q-risk-copy">
                  <strong>${level} 級</strong>
                  <small>${judge}</small>
                  <em>${follow}</em>
                </span>
              </button>
            `;
          })}
        </div>
        <div class="q-item q-fill"><label>判斷理由</label><span class="q-line"></span></div>
      </section>

      <section class="q-section">
        <h3>E3. 家庭全人照護支持模組（至少 1，最多 3）</h3>
        <div class="q-module-grid">
          ${supportModules.map(([code, name, design]) => {
            const on = modules.includes(code);
            return html`
              <button class="q-module ${on ? 'on' : ''}" ${{ on: { click: () => toggleQModule(code) } }}>
                <span class="q-module-top"><strong>${code}</strong>${name}</span>
                <small>${design}</small>
                <span class="q-module-flag">${on ? html`${icon('check')}已啟動` : '啟動'}</span>
              </button>
            `;
          })}
        </div>
      </section>

      <section class="q-section">
        <h3>E4. 下一步行動</h3>
        <table class="q-grid q-action-table">
          <thead>
            <tr><th>行動</th><th>對象</th><th>負責窗口</th><th>期限</th><th>完成狀態</th></tr>
          </thead>
          <tbody>
            ${nextActions.map(
              (action) => html`
                <tr>
                  <td class="q-grid-row">${action}</td>
                  <td class="q-blank"></td>
                  <td class="q-blank"></td>
                  <td class="q-blank"></td>
                  <td class="q-status-cell">
                    <span class="q-mini">未啟動</span><span class="q-mini">進行中</span><span class="q-mini">完成</span>
                  </td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </section>

      <section class="q-section">
        <h3>E5. 訪視結案與簽核</h3>
        <div class="q-items">
          ${signoffItems.map((item, i) =>
            i === 0
              ? html`
                  <div class="q-item q-result">
                    <label>${icon('check')}${item.k === 'single' ? item.q : ''}</label>
                    <div class="q-choices single">
                      ${(item.k === 'single' ? item.opts : []).map(
                        (o) => html`
                          <button
                            class="q-choice-btn ${status === o ? 'on' : ''}"
                            ${{ on: { click: () => setQStatus(o) } }}
                          >${o}</button>
                        `,
                      )}
                    </div>
                  </div>
                `
              : renderItem(item),
          )}
        </div>
        <div class="q-signrow">
          <span>訪員簽名 ___ 日期 115/__/__</span>
          <span>FNP/居護師覆核 ___ 日期 115/__/__</span>
          <span>醫療窗口覆核（如需）___ 日期 115/__/__</span>
        </div>
      </section>

      <div class="q-save-bar">
        <button class="ghost-btn" ${{ on: { click: () => showToast('家訪問卷可離線填寫，回到有網路時同步') } }}>
          ${icon('shield')}離線暫存
        </button>
        <button class="btn" ${{ on: { click: () => saveQuestionnaire() } }}>${icon('check')}暫存 E 表分流計畫</button>
      </div>
    </div>
  `;
}

// ---- 附錄：分工邊界 ----

function renderAppendix(): SafeHtml {
  return html`
    <div class="q-table">
      <header class="q-table-head">
        <div><span class="q-table-code">附錄</span><h2>訪視人員分工邊界</h2></div>
      </header>
      <div class="q-role-grid">
        ${roleBoundaries.map(
          ([role, can, cant, qc]) => html`
            <article class="q-role-card">
              <h3>${icon('shield')}${role}</h3>
              <div class="q-role-row q-can"><strong>可執行</strong><span>${can}</span></div>
              <div class="q-role-row q-cant"><strong>不執行</strong><span>${cant}</span></div>
              <div class="q-role-row q-qc"><strong>品質控管</strong><span>${qc}</span></div>
            </article>
          `,
        )}
      </div>
      <section class="q-section">
        <h3>參考依據</h3>
        <ul class="q-refs">
          ${questionnaireRefs.map((r) => html`<li>${icon('book')}${r}</li>`)}
        </ul>
      </section>
    </div>
  `;
}

// ---- 模組殼層 ----

function renderOverview(): SafeHtml {
  return html`
    <div class="q-overview">
      <table class="q-grid">
        <thead>
          <tr><th>表單</th><th>對象</th><th>主要內容</th><th>填寫者</th></tr>
        </thead>
        <tbody>
          ${formOverview.map(
            ([form, target, content, filler]) => html`
              <tr><td class="q-grid-row">${form}</td><td>${target}</td><td>${content}</td><td>${filler}</td></tr>
            `,
          )}
        </tbody>
      </table>
    </div>
  `;
}

export function renderQuestionnaireModule(): SafeHtml {
  const active = getState().qTable;
  const stage =
    active === 'appendix'
      ? renderAppendix()
      : active === 'E'
        ? renderETable()
        : renderTable(questionnaireTables.find((t) => t.code === active) ?? questionnaireTables[0]!);
  return html`
    <section class="module-stage questionnaire-stage">
      <div class="module-stage-head">
        <div>
          <span class="ai-kicker">家訪問卷・${questionnaireMeta.version}</span>
          <h2>${questionnaireMeta.title}（A-E 表 + 分工附錄）</h2>
          <p>以家戶為照護單位：每戶填 A 表、需追蹤成員填 B 表，符合條件者再填 C/D/E。${questionnaireMeta.date}</p>
        </div>
        <span class="role-scope-pill">${icon('clipboard')}${questionnaireMeta.executor}</span>
      </div>

      <div class="q-redflag" role="note">
        ${icon('alert')}
        <div>
          <strong>紅旗症狀即時通報</strong>
          <span>${questionnaireMeta.redFlags.join('、')} → 立即通知指定醫療窗口</span>
        </div>
      </div>

      <details class="q-principles">
        <summary>填寫原則（5 點）</summary>
        <ol>${questionnaireMeta.principles.map((p) => html`<li>${p}</li>`)}</ol>
      </details>

      ${renderOverview()}

      <div class="q-tabs" role="tablist">
        ${TAB_LABELS.map(
          ([code, label]) => html`
            <button
              class="q-tab ${active === code ? 'active' : ''}"
              role="tab"
              aria-selected="${active === code ? 'true' : 'false'}"
              ${{ on: { click: () => setQTable(code) } }}
            >${label}</button>
          `,
        )}
      </div>

      <div class="module-body q-body">${stage}</div>
    </section>
  `;
}
