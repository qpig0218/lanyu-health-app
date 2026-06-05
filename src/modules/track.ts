import { html, type SafeHtml } from '../lib/html.ts';
import { icon } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import type { Patient } from '../data/types.ts';
import { patients } from '../data/patients.ts';
import { abnormalRules, trackStates } from '../data/tracking.ts';
import { lanyuVillageMap } from '../components/shared.ts';
import { selectVisualPatient, setTrackTab, showToast } from '../state/actions.ts';

/* ============ 模組二：受檢與異常追蹤閉環 ============ */
export function renderTrackModule(patient: Patient): SafeHtml {
  const state = getState();
  const tabs: readonly (readonly [string, string])[] = [
    ['board', '異常總覽'],
    ['machine', '追蹤狀態機'],
    ['dispatch', '家訪派工'],
    ['rules', '分級規則'],
  ];
  const coverCards: readonly (readonly [string, string])[] = [
    ['追蹤完成率', '78%'],
    ['失聯漏接', '5%'],
    ['24h 入庫', '95%'],
    ['紅級命中', '96%'],
  ];
  return html`
    <section class="module-stage">
      <div class="module-stage-head">
        <div>
          <span class="ai-kicker">模組二・受檢與異常追蹤閉環</span>
          <h2>健檢 → 異常分流 → 轉介/家訪 → 持續管理 → 複檢，全程不漏接</h2>
          <p>雙軌共用同一套紅橙黃綠分級與五態狀態機；紅級須 L3 醫師簽核（HITL H2）才觸發轉介。</p>
        </div>
        <div class="mpi-cover-cards">
          ${coverCards.map(([l, v]) => html`<div><strong>${v}</strong><span>${l}</span></div>`)}
        </div>
      </div>
      <div class="tabs module-tabs">${tabs.map(
        ([k, l]) =>
          html`<button class="${state.trackTab === k ? 'active' : ''}" ${{ on: { click: () => setTrackTab(k) } }}>${l}</button>`,
      )}</div>
      <div class="module-body">${renderTrackBody(patient)}</div>
    </section>
  `;
}

function renderTrackBody(patient: Patient): SafeHtml {
  const state = getState();
  if (state.trackTab === 'machine') return renderStateMachine();
  if (state.trackTab === 'dispatch') return renderDispatch(patient);
  if (state.trackTab === 'rules') return renderAbnormalRules();
  return renderAbnormalBoard();
}

function renderAbnormalBoard(): SafeHtml {
  const cases = [...patients].sort((a, b) => b.risk - a.risk);
  return html`
    <div class="section-grid">
      <div class="field-block wide">
        <h3>異常個案總覽（PMO）</h3>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>個案</th><th>部落</th><th>分級</th><th>SLA</th><th>狀態</th><th>下一步</th></tr></thead>
            <tbody>
              ${cases.map((p) => {
                const lvl =
                  p.risk >= 80
                    ? abnormalRules[0]!
                    : p.risk >= 60
                      ? abnormalRules[1]!
                      : p.risk >= 45
                        ? abnormalRules[2]!
                        : abnormalRules[3]!;
                return html`<tr ${{ on: { click: () => selectVisualPatient(p.id, 'labs') } }} style="cursor:pointer">
                  <td>${p.displayName}</td><td>${p.village}</td>
                  <td><span class="status-pill ${lvl[1] === 'red' ? 'red' : lvl[1] === 'orange' ? 'yellow' : lvl[1] === 'yellow' ? 'yellow' : 'green'}">${lvl[0]}級</span></td>
                  <td>${lvl[3]}</td><td>${p.consent.includes('待') ? '待派工' : '已派工'}</td><td>${lvl[4]}</td>
                </tr>`;
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div class="info-block"><h3>轉介路徑</h3><p class="minor">紅級自動觸發（須醫師 H2 簽核）：蘭嶼衛生所 → 台東馬偕 → 北部醫學中心。轉介後一週追蹤確認到診。</p></div>
      <div class="info-block"><h3>複檢提醒</h3><p class="minor">三個月 / 半年 / 一年自動提醒；複檢結果回收後更新狀態機與家庭健康設計。</p></div>
    </div>
  `;
}

function renderStateMachine(): SafeHtml {
  return html`
    <div class="section-grid">
      <div class="state-machine wide">
        ${trackStates.map(
          ([name, desc, count, cls], i) => html`
          <div class="state-node ${cls}">
            <div class="state-top"><strong>${name}</strong><span class="state-count">${count}</span></div>
            <small>${desc}</small>
            ${i < trackStates.length - 1 ? html`<span class="state-arrow">${icon('arrow')}</span>` : ''}
          </div>
        `,
        )}
      </div>
      <div class="info-block wide"><h3>失聯升級（H4 自動但留證）</h3><p class="minor">連續 2 次無法聯繫 → 自動升級為「需 PMO 介入」，全程寫入稽核；本週 5 件失聯已升級。</p>
        <button class="btn" ${{ on: { click: () => showToast('已將 5 件失聯個案升級 PMO（已留稽核）') } }}>${icon('alert')}升級失聯個案</button>
      </div>
    </div>
  `;
}

function renderDispatch(_patient: Patient): SafeHtml {
  const work: readonly (readonly [Patient, string])[] = [...patients]
    .sort((a, b) => b.risk - a.risk)
    .map((p, i) => [p, ['紅', '橙', '黃', '綠'][Math.min(3, Math.floor(i))]!] as const);
  return html`
    <div class="section-grid">
      <div class="field-block wide">
        <h3>家訪派工地圖（依風險＋地理路線最佳化）</h3>
        <p class="minor">排班 Agent（H1）給排序建議，主管決定；駐島巡訪 ≤67.6 日、家訪日均 6 戶。</p>
        <div class="dispatch-list">
          ${work.map(
            ([p, lvl], i) => html`
            <div class="dispatch-row">
              <span class="dispatch-order">${i + 1}</span>
              <div><strong>${p.displayName}</strong><small>${p.village}・${p.household}</small></div>
              <span class="status-pill ${lvl === '紅' ? 'red' : lvl === '綠' ? 'green' : 'yellow'}">${lvl}級</span>
              <button class="ghost-btn" ${{ on: { click: () => showToast(`已派工給 FNP：${p.displayName}`) } }}>${icon('arrow')}派工</button>
            </div>
          `,
          )}
        </div>
      </div>
      ${lanyuVillageMap()}
    </div>
  `;
}

function renderAbnormalRules(): SafeHtml {
  return html`
    <div class="section-grid">
      <div class="field-block wide">
        <h3>異常分級規則（紅／橙／黃／綠）</h3>
        <p class="minor">本系統僅實作 P06 健檢 Protocol 附件 B 的數位化版本；規則引擎透明可解釋（XAI）。</p>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>級</th><th>觸發條件範例</th><th>SLA</th><th>處置</th></tr></thead>
            <tbody>
              ${abnormalRules.map(
                ([lvl, color, cond, sla, act]) => html`
                <tr><td><span class="status-pill ${color === 'red' ? 'red' : color === 'green' ? 'green' : 'yellow'}">${lvl}級</span></td><td>${cond}</td><td>${sla}</td><td>${act}</td></tr>
              `,
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div class="info-block wide"><h3>可解釋性（XAI）</h3><p class="minor">每筆分級留存「使用的規則 + 模型版本」，醫師可反查為何如此分級；ML 僅做排序輔助，不做關鍵決策。</p></div>
    </div>
  `;
}
