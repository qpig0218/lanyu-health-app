import { html, type SafeHtml } from '../lib/html.ts';
import { icon } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import { hasGov } from '../domain/rbac.ts';
import { permissionWall } from '../components/shared.ts';
import {
  pmoMilestones,
  pmoCommitments,
  pmoBudget,
  pmoRisks,
  commandNodes,
} from '../data/pmo.ts';
import { aiToast, setPmoTab } from '../state/actions.ts';

function renderCommandNodes(): SafeHtml {
  return html`
    <div class="section-grid">
      <div class="command-nodes wide">
        ${commandNodes.map(
          ([tier, place, role, st]) => html`
          <div class="command-node ${st}">
            <div class="node-pulse ${st}">${icon('node')}</div>
            <strong>${tier}・${place}</strong>
            <small>${role}</small>
            <span class="status-pill ${st === 'online' ? 'green' : 'yellow'}">${st === 'edge' ? '邊緣・離線就緒' : '連線'}</span>
          </div>
        `,
        )}
      </div>
      <div class="info-block wide"><h3>節點同步</h3><p class="minor">中央每日全量＋即時增量；蘭嶼駐點本機快取離線可用 7 天，恢復後自動同步（衝突：中央優先＋人工審查）。</p></div>
    </div>
  `;
}

function renderGantt(): SafeHtml {
  const span = 8; // 5月～12月
  const axis: readonly string[] = ['5', '6', '7', '8', '9', '10', '11', '12'];
  return html`
    <div class="section-grid">
      <div class="field-block wide">
        <h3>115 年九大里程碑（與 00 主時程同步）</h3>
        <div class="gantt">
          <div class="gantt-axis">${axis.map((m) => html`<span>${m}月</span>`)}</div>
          ${pmoMilestones.map(
            ([id, name, s, e, st, mod]) => html`
            <div class="gantt-row">
              <span class="gantt-label">${id} ${name}</span>
              <div class="gantt-track">
                <span class="gantt-bar ${st}" style="left:${((s - 5) / span) * 100}%; width:${((e - s) / span) * 100}%">${mod}</span>
              </div>
            </div>
          `,
          )}
        </div>
      </div>
    </div>
  `;
}

function renderCommitments(): SafeHtml {
  return html`
    <div class="section-grid">
      <div class="field-block wide">
        <h3>跨機構承諾看板（目標 ≥30 條）</h3>
        <div class="commit-list">
          ${pmoCommitments.map(
            ([org, what, st, cls]) => html`
            <div class="commit-row">
              <strong>${org}</strong>
              <small>${what}</small>
              <span class="status-pill ${cls === 'ok' ? 'green' : cls === 'warn' ? 'yellow' : ''}">${st}</span>
            </div>
          `,
          )}
        </div>
      </div>
      <div class="info-block"><h3>HITL</h3><p class="minor">新增決議須有會議紀錄出處；關閉決議須 Owner ＋ L2 PMO 雙簽；預算撥用走 ERP 既有流程，本系統僅可視化。</p></div>
    </div>
  `;
}

function renderBudgetBurn(): SafeHtml {
  const pct = Math.round((pmoBudget.used / pmoBudget.total) * 100);
  return html`
    <div class="section-grid">
      <div class="field-block wide">
        <h3>預算燃燒率（萬元・即時 vs 實際）</h3>
        <div class="burn-head"><div><strong>${pmoBudget.used}</strong><span> / ${pmoBudget.total} 萬（${pct}%）</span></div><span class="status-pill green">偏離 &lt;5%</span></div>
        <div class="burn-track"><span style="width:${pct}%"></span></div>
        <div class="burn-packages">
          ${pmoBudget.packages.map(
            ([name, total, used, share]) => html`
            <div class="burn-pkg"><div><strong>${name}</strong><small>占比 ${share}</small></div><div class="burn-pkg-bar"><span style="width:${Math.round((used / total) * 100)}%"></span></div><em>${used}/${total}</em></div>
          `,
          )}
        </div>
      </div>
      <div class="info-block"><h3>財務 Agent（H4）</h3><p class="minor">偏離 5% 自動告警（自動但留證）；缺件提醒、異常費用識別。不直接動撥預算、不簽核採購。</p></div>
    </div>
  `;
}

function renderRiskRegister(): SafeHtml {
  return html`
    <div class="section-grid">
      <div class="field-block wide">
        <h3>風險登記簿（目標 ≥20 條）</h3>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>ID</th><th>風險</th><th>影響</th><th>機率</th><th>緩解</th><th>Owner</th></tr></thead>
            <tbody>
              ${pmoRisks.map(
                ([id, risk, impact, prob, mit, owner]) => html`
                <tr><td class="num">${id}</td><td>${risk}</td><td><span class="status-pill ${impact === '極高' || impact === '高' ? 'red' : 'yellow'}">${impact}</span></td><td>${prob}</td><td>${mit}</td><td>${owner}</td></tr>
              `,
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderPmoBody(): SafeHtml {
  const state = getState();
  if (state.pmoTab === 'gantt') return renderGantt();
  if (state.pmoTab === 'commit') return renderCommitments();
  if (state.pmoTab === 'budget') return renderBudgetBurn();
  if (state.pmoTab === 'risk') return renderRiskRegister();
  return renderCommandNodes();
}

export function renderPmoModule(): SafeHtml {
  if (!hasGov(getState().accessKey, 'L3')) {
    return permissionWall('PMO 治理看板', 'L2 / L3 以上（PMO、衛生局、駐點主管）');
  }
  const state = getState();
  const tabs: readonly (readonly [string, string])[] = [
    ['nodes', '指揮節點'],
    ['gantt', '里程碑 Gantt'],
    ['commit', '跨機構承諾'],
    ['budget', '預算燃燒'],
    ['risk', '風險登記簿'],
  ];
  return html`
    <section class="module-stage">
      <div class="module-stage-head">
        <div><span class="ai-kicker">模組三・PMO 治理看板</span><h2>三層指揮（駐點／前進／中央）即時治理</h2>
          <p>會議決議、跨機構承諾、預算燃燒、風險全部上看板；週報由 PMO Agent（H2）草擬，PMO 編輯後送出。</p></div>
        <button class="btn" ${{ on: { click: () => aiToast('AI整理今日工作摘要', 'P-00018') } }}>${icon('clipboard')}週報草擬（H2）</button>
      </div>
      <div class="tabs module-tabs">${tabs.map(
        ([k, l]) =>
          html`<button class="${state.pmoTab === k ? 'active' : ''}" ${{ on: { click: () => setPmoTab(k) } }}>${l}</button>`,
      )}</div>
      <div class="module-body">${renderPmoBody()}</div>
    </section>
  `;
}
