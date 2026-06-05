import { html, raw, type SafeHtml } from '../lib/html.ts';
import { icon, type IconName } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import { agents } from '../data/agents.ts';
import { setAgentDetail, setClinicalNav, setGovTab, showToast } from '../state/actions.ts';

export function renderAgentsModule(): SafeHtml {
  return html`
    <section class="module-stage">
      <div class="module-stage-head">
        <div>
          <span class="ai-kicker">第四部・八大 AI Agent 任務規格</span>
          <h2>降低偏鄉治理成本，不炫技</h2>
          <p>每個 Agent 都有單一任務、HITL 等級、負面清單、可解釋輸出、稽核留存與 fallback；禁止 H5 自主臨床決策。</p>
        </div>
        <button
          class="ghost-btn"
          ${{
            on: {
              click: () => {
                setGovTab('llm');
                setClinicalNav('governance');
              },
            },
          }}
        >
          ${icon('shield')}LLM 邊界與負面清單
        </button>
      </div>
      <div class="agent-grid">
        ${agents.map(
          (a) => html`
            <button class="agent-card" ${{ on: { click: () => setAgentDetail(a.code) } }}>
              <div class="agent-top">
                <span class="agent-icon">${icon(a.icon as IconName)}</span>
                <div><strong>${a.name}</strong><small>${a.sub}・${a.mod}</small></div>
              </div>
              <div class="agent-badges">
                <span class="hitl-badge">${a.hitl}</span>
                <span class="model-badge">${a.model.split('（')[0]!.split(' ')[0]}</span>
              </div>
              <p>${a.task}</p>
              <div class="agent-foot">
                <span class="status-pill ${a.conf === '高' ? 'green' : 'yellow'}">信心 ${a.conf}</span>
                <em>查看模型卡 →</em>
              </div>
            </button>
          `,
        )}
      </div>
      <div class="hitl-legend">
        <strong>HITL 等級：</strong>
        <span>H0 純資訊</span><span>H1 排序建議</span><span>H2 草擬待簽核</span><span>H3 即時協作</span><span>H4 自動但留證</span><span class="forbidden">H5 自主臨床決策（禁止）</span>
      </div>
    </section>
  `;
}

export function renderAgentDrawer(): SafeHtml | string {
  const detail = getState().agentDetail;
  if (!detail) return '';
  const a = agents.find((x) => x.code === detail);
  if (!a) return '';
  return html`
    <aside class="ai-draft-drawer agent-drawer" aria-label="Agent 模型卡">
      <div class="ai-draft-toolbar">
        <div><span class="ai-kicker">Model Card / Agent 規格</span><h2>${a.name}</h2><p>${a.sub}・對應 ${a.mod}</p></div>
        <button class="ghost-btn ai-draft-close" ${{ on: { click: () => setAgentDetail(null) } }}>${icon('check')}關閉</button>
      </div>
      <div class="ai-draft-chip-row">
        <span class="hitl-badge">HITL ${a.hitl}</span>
        <span class="model-badge">${a.model}</span>
        <span class="model-badge">${a.modelVersion}</span>
        <span class="status-pill ${a.conf === '高' ? 'green' : 'yellow'}">信心 ${a.conf}</span>
      </div>
      <div class="ai-draft-content">
        <section class="ai-draft-section"><h3>任務</h3><p>${a.task}</p></section>
        <section class="ai-draft-section"><h3>輸出</h3><p>${a.out}</p></section>
        <section class="ai-draft-section"><h3>為什麼這個建議（XAI）</h3><p>${a.why}</p></section>
        <section class="ai-draft-section"><h3>邊界（不可做）</h3><p>${a.cant.map((c, i) =>
          i === 0 ? html`・${c}` : html`${raw('<br>')}・${c}`,
        )}</p></section>
        <section class="ai-draft-section"><h3>稽核留存（≥ 2 年）</h3><p>${a.audit}</p><p class="minor">每次輸入／輸出／信心／模型版本／延遲／使用者均留存（interaction_id、model_id、sources、hitl_decision）。</p></section>
        <section class="ai-draft-section"><h3>Fallback</h3><p>${a.fallback}</p></section>
        <section class="ai-draft-section"><h3>KPI</h3><p>${a.kpi}</p></section>
      </div>
      <div class="ai-draft-actions">
        <button class="btn" ${{ on: { click: () => showToast('模型卡／資料卡已送 AI 倫理委員會審視') } }}>${icon('shield')}送倫理委員會</button>
        <button class="ghost-btn" ${{ on: { click: () => showToast('已產生季度公平性報告草稿') } }}>${icon('chart')}公平性報告</button>
      </div>
    </aside>
  `;
}
