import { html, type SafeHtml } from '../lib/html.ts';
import { icon } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import type { Patient } from '../data/types.ts';
import { dataNukes, threeLevelCompare } from '../data/dashboard.ts';
import { pmoBudget, pmoCommitments, pmoRisks } from '../data/pmo.ts';
import { hasGov } from '../domain/rbac.ts';
import { setClinicalNav, setDashboardView, showToast } from '../state/actions.ts';
import {
  lanyuVillageMap,
  renderClinicalSupportModules,
  renderDashboardHero,
  renderStats,
  renderTodayWorklist,
} from '../components/shared.ts';

type DashboardKey = 'policy' | 'war' | 'station';

function renderPolicyView(): SafeHtml {
  const kpis: readonly (readonly [string, string, number])[] = [
    ['受檢率', '71%', 71],
    ['追蹤完成率', '78%', 78],
    ['家訪率', '84%', 84],
    ['失聯率', '5%', 5],
    ['預算燃燒率', '34%', 34],
  ];
  return html`
    <section class="policy-view">
      <div class="nuke-grid" aria-label="三顆數據核彈">
        ${dataNukes.map(
          ([title, big, small, note]) => html`
            <article class="nuke-card">
              <span class="nuke-kicker">${title}</span>
              <div class="nuke-num"><strong>${big}</strong><span>${small}</span></div>
              <p>${note}</p>
              <button class="xai-btn" ${{ on: { click: () => showToast('資料來源：2022 成人預防保健盛行率報告（字典 v2.1）') } }}>${icon('search')}為什麼？</button>
            </article>
          `,
        )}
      </div>
      <section class="panel compare-panel">
        <div class="panel-header"><div><h2 class="panel-title">糖尿病異常率三級對比</h2><p class="panel-note">健保登錄 vs 全國平均 vs 健檢實測（Y 軸已對齊，單位 %）</p></div></div>
        <div class="compare-bars">
          ${threeLevelCompare.map(
            ([label, val, color]) => html`
              <div class="compare-row">
                <span class="compare-label">${label}</span>
                <span class="compare-track"><span class="compare-fill ${color}" style="width:${(val / 40) * 100}%"></span></span>
                <strong>${val}%</strong>
              </div>
            `,
          )}
        </div>
        <p class="minor">落差達 11 倍：健保登錄 3.36% 嚴重低估在地糖尿病盛行（健檢實測 37.7%），印證「資料底盤崩塌」核心命題。</p>
      </section>
      <div class="kpi-strip">
        ${kpis.map(
          ([l, v, p]) => html`
            <div class="kpi-card"><span>${l}</span><strong>${v}</strong><i><b style="width:${p}%"></b></i></div>
          `,
        )}
      </div>
    </section>
  `;
}

function renderStationView(_patient: Patient): SafeHtml {
  const metrics: readonly (readonly [string, string, string])[] = [
    ['今日家訪', '18', '完成 12 / 未遇 4 / 再訪 2'],
    ['異常待處理', '27', '紅 8 / 橙 11 / 黃 8'],
    ['失聯個案', '5', '需 PMO 介入'],
    ['高風險家戶', '39', 'P0/P1/P6/P9'],
  ];
  return html`
    <section class="station-view">
      <div class="station-metrics">
        ${metrics.map(
          ([l, v, n]) => html`
            <button class="stat" ${{ on: { click: () => setClinicalNav('track') } }}>
              <div class="stat-label">${l}</div>
              <div class="stat-value">${v}</div>
              <small>${n}</small>
            </button>
          `,
        )}
      </div>
      ${renderTodayWorklist()}
      ${lanyuVillageMap()}
    </section>
  `;
}

function renderPmoMiniStrip(): SafeHtml {
  const pct = Math.round((pmoBudget.used / pmoBudget.total) * 100);
  return html`
    <section class="panel pmo-mini">
      <div class="panel-header">
        <div><h2 class="panel-title">PMO 戰情速覽</h2><p class="panel-note">跨機構承諾、預算燃燒、風險（詳見 PMO 治理）</p></div>
        <button class="ghost-btn" ${{ on: { click: () => setClinicalNav('pmo') } }}>${icon('arrow')}前往 PMO 治理</button>
      </div>
      <div class="pmo-mini-grid">
        <div><span>本月燃燒率</span><strong>${pct}%</strong><i><b style="width:${pct}%"></b></i></div>
        <div><span>跨機構承諾</span><strong>${pmoCommitments.filter((c) => c[2] === '已承諾').length}/${pmoCommitments.length}</strong><small>已承諾</small></div>
        <div><span>開放風險</span><strong>${pmoRisks.length}</strong><small>登記簿追蹤中</small></div>
        <div><span>里程碑</span><strong>M2</strong><small>三包採購決標中</small></div>
      </div>
    </section>
  `;
}

function renderWarView(patient: Patient): SafeHtml {
  return html`
    ${renderDashboardHero(patient)}
    <section class="dashboard-stat-strip" aria-label="各項統計卡片">${renderStats()}</section>
    ${renderPmoMiniStrip()}
    ${renderTodayWorklist()}
    ${lanyuVillageMap()}
    ${renderClinicalSupportModules(patient)}
  `;
}

export function renderDecisionDashboard(patient: Patient): SafeHtml {
  const state = getState();
  const views: readonly (readonly [DashboardKey, string, string, boolean])[] = [
    ['policy', '政策視圖', '照護司 / 署長', hasGov(state.accessKey, 'L2')],
    ['war', '戰情視圖', 'PMO / Committee', hasGov(state.accessKey, 'L3')],
    ['station', '駐點視圖', '衛生所所長 / FNP 主管', true],
  ];
  // 確保渲染的視圖符合權限（否則退回駐點視圖）。不在 render 期間變更全域狀態，改用區域 effectiveView。
  const allowedNow = views.find((v) => v[0] === state.dashboardView && v[3]);
  const effectiveView: DashboardKey = allowedNow ? (state.dashboardView as DashboardKey) : 'station';
  return html`
    <section class="clinical-dashboard module-stage">
      <div class="module-stage-head">
        <div>
          <span class="ai-kicker">模組四・風險分層決策儀表板</span>
          <h2>四視圖決策中樞：點一下就看到下一步</h2>
          <p>政策／戰情／駐點／居民四視圖各自獨立；個案下鑽須 L3＋同意旗標＋稽核。</p>
        </div>
        <div class="view-switch">
          ${views.map(
            ([key, label, who, allowed]) => html`
              <button
                class="${effectiveView === key ? 'active' : ''} ${allowed ? '' : 'locked'}"
                ${{
                  on: {
                    click: allowed
                      ? () => setDashboardView(key)
                      : () => showToast(`權限不足：${label}需 L2/L3 以上`),
                  },
                }}
              >
                ${allowed ? '' : icon('lock')}<strong>${label}</strong><small>${who}</small>
              </button>
            `,
          )}
          <button
            ${{
              on: {
                click: () => {
                  setClinicalNav('home');
                  showToast('居民視圖：請於民眾端登入（L5）');
                },
              },
            }}
            class="ghost-view"
            title="居民視圖在民眾端"
          >
            居民視圖↗
          </button>
        </div>
      </div>
      ${effectiveView === 'policy'
        ? renderPolicyView()
        : effectiveView === 'station'
          ? renderStationView(patient)
          : renderWarView(patient)}
    </section>
  `;
}
