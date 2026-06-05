import { html, type SafeHtml } from '../lib/html.ts';
import { getState } from '../state/store.ts';
import { setGovTab } from '../state/actions.ts';
import { accessLevels } from '../data/access-levels.ts';
import {
  interfaceCatalog,
  securityLines,
  incidentLevels,
  auditTrail,
} from '../data/governance.ts';
import { llmNegativeList } from '../data/agents.ts';

function renderGovBody(): SafeHtml {
  const state = getState();
  if (state.govTab === 'audit') return renderAuditTrail();
  if (state.govTab === 'security') return renderSecurityLines();
  if (state.govTab === 'incident') return renderIncident();
  if (state.govTab === 'interface') return renderInterfaceCatalog();
  if (state.govTab === 'llm') return renderLlmBoundary();
  return renderRbacMatrix();
}

function renderRbacMatrix(): SafeHtml {
  const state = getState();
  const ops: readonly (readonly [string, string, string, string, string, string])[] = [
    ['居民個資（自身）', '—', '—', '✓', '✓', '✓'],
    ['居民個資（他人）', '—', '—', '✓', '—', '—'],
    ['去識別統計', '✓', '✓', '✓', '✓', '—'],
    ['異常分級調整', '—', '—', '✓', '提送', '—'],
    ['主索引合併／拆分', '—', '提送', '✓簽核', '—', '—'],
    ['撤回同意', '—', '—', '知會', '知會', '✓'],
    ['跨機構查詢', '—', '—', '✓須同意', '—', '—'],
    ['預算審核', '✓', '✓', '—', '—', '—'],
    ['模型卡／倫理審查', '✓', '提送', '—', '—', '—'],
  ];
  return html`
    <div class="section-grid">
      <div class="field-block wide">
        <h3>五級 RBAC 角色</h3>
        <div class="rbac-roles">
          ${accessLevels.map(
            (l) =>
              html`<div class="rbac-role ${state.accessKey === l.key ? 'active' : ''}"><span class="lv-badge lv-${l.key.toLowerCase()}">${l.key}</span><strong>${l.name}</strong><small>${l.scope}</small></div>`,
          )}
        </div>
      </div>
      <div class="field-block wide">
        <h3>權限矩陣（附件 B 節錄）</h3>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>資源 / 操作</th><th>L1</th><th>L2</th><th>L3</th><th>L4</th><th>L5</th></tr></thead>
            <tbody>${ops.map(
              (r) =>
                html`<tr><td>${r[0]}</td>${r.slice(1).map(
                  (c) =>
                    html`<td class="rbac-cell ${c === '✓' || c.includes('✓') ? 'yes' : c === '—' ? 'no' : 'part'}">${c}</td>`,
                )}</tr>`,
            )}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderAuditTrail(): SafeHtml {
  return html`
    <div class="section-grid">
      <div class="field-block wide">
        <h3>稽核軌（誰・何時・何操作・出處）</h3>
        <p class="minor">操作、查詢、個案下鑽全留存；稽核日誌最少保留 2 年（ISO 27001 + TWGCB）。</p>
        <div class="audit-list">
          ${auditTrail.map(
            ([time, who, act, basis, mod]) => html`
            <div class="audit-row"><span class="audit-time">${time}</span><div><strong>${who}</strong><small>${act}</small></div><span class="tag">${basis}</span><em>${mod}</em></div>
          `,
          )}
        </div>
      </div>
    </div>
  `;
}

function renderSecurityLines(): SafeHtml {
  return html`
    <div class="section-grid">
      <div class="field-block wide"><h3>資安六道防線</h3>
        <div class="defense-grid">
          ${securityLines.map(
            ([no, name, desc]) =>
              html`<div class="defense-card"><span class="defense-no">${no}</span><strong>${name}</strong><small>${desc}</small></div>`,
          )}
        </div>
      </div>
      <div class="info-block"><h3>加密與身分</h3><p class="minor">at-rest：AES-256；in-transit：TLS 1.3 + HSTS；金鑰 Vault 年輪換；密碼 Argon2id。MFA：首登＋每 90 天＋敏感操作（刪除／匯出／跨機構查詢）。</p></div>
      <div class="info-block"><h3>離島斷線備援</h3><p class="minor">本機快取 token 最長 7 天；家訪 App 完整離線可用，恢復後自動同步；海纜斷裂以衛星（Starlink／中華電信）次選；停電優雅降級紙本。</p></div>
    </div>
  `;
}

function renderIncident(): SafeHtml {
  return html`
    <div class="section-grid">
      <div class="field-block wide"><h3>資安／個資事件分級應變</h3>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>級</th><th>範例</th><th>通報時限</th><th>公告時限</th></tr></thead>
            <tbody>${incidentLevels.map(
              ([lvl, color, ex, report, notice]) =>
                html`<tr><td><span class="status-pill ${color === 'red' ? 'red' : color === 'green' ? 'green' : 'yellow'}">${lvl}</span></td><td>${ex}</td><td>${report}</td><td>${notice}</td></tr>`,
            )}</tbody>
          </table>
        </div>
      </div>
      <div class="info-block wide"><h3>應變流程</h3><p class="minor">偵測 → 抑制 → 根除 → 復原 → 事後檢討（含對外溝通）。個資外洩：24h 內個別通知受影響居民（LIFF／郵寄）、72h 內報主管機關，透過 PMO／教會／部落會議雙語溝通。</p></div>
    </div>
  `;
}

function renderInterfaceCatalog(): SafeHtml {
  return html`
    <div class="section-grid">
      <div class="field-block wide"><h3>接口目錄 Interface Catalog（EXT 節錄）</h3>
        <p class="minor">所有外部接口登錄於 PMO 維護的接口目錄，含擁有者、SLA、停機、資料同步延遲、最後成功時間。</p>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>編號</th><th>對接系統</th><th>協定</th><th>SLA / 頻率</th><th>同步</th><th>最後成功</th></tr></thead>
            <tbody>${interfaceCatalog.map(
              (r) =>
                html`<tr><td class="num">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td><span class="status-pill green">${r[5]}</span></td></tr>`,
            )}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderLlmBoundary(): SafeHtml {
  return html`
    <div class="section-grid">
      <div class="field-block wide"><h3>LLM 邊界・負面清單（N1–N9）</h3>
        <div class="negative-list">
          ${llmNegativeList.map(
            ([no, act, why]) =>
              html`<div class="negative-row"><span class="neg-no">${no}</span><div><strong>${act}</strong><small>${why}</small></div></div>`,
          )}
        </div>
      </div>
      <div class="info-block"><h3>Prompt Injection 防護</h3><p class="minor">居民輸入、上傳檔案、RAG 來源、語碼轉換、工具回應皆為注入向量；拒絕未驗證角色扮演（「假裝你是醫師…」）。</p></div>
      <div class="info-block"><h3>幻覺控管與輸出稽核</h3><p class="minor">不知道就說不知道；來源強制引用；輸出 schema 校驗，不通過重試 1 次後人工接手；每次互動留 interaction_id／model_id／sources／confidence。</p></div>
    </div>
  `;
}

/* ============ 治理與資安 ============ */
export function renderGovernanceModule(): SafeHtml {
  const state = getState();
  const tabs: readonly (readonly [string, string])[] = [
    ['rbac', '五級 RBAC'],
    ['audit', '稽核軌'],
    ['security', '資安六道'],
    ['incident', '事件應變'],
    ['interface', '接口目錄'],
    ['llm', 'LLM 邊界'],
  ];
  return html`
    <section class="module-stage">
      <div class="module-stage-head">
        <div><span class="ai-kicker">第五～八部・三軌治理</span><h2>資料治理 ＋ 資安治理 ＋ AI 治理</h2>
          <p>軍火庫思維：為支援六大決策而建。對齊 ISO 27001/27701、NIST CSF、TWGCB、EU AI Act 精神。</p></div>
      </div>
      <div class="tabs module-tabs">${tabs.map(
        ([k, l]) =>
          html`<button class="${state.govTab === k ? 'active' : ''}" ${{ on: { click: () => setGovTab(k) } }}>${l}</button>`,
      )}</div>
      <div class="module-body">${renderGovBody()}</div>
    </section>
  `;
}
