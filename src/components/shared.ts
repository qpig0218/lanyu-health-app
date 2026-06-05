import { html, type SafeHtml } from '../lib/html.ts';
import { icon, type IconName } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import type { Patient } from '../data/types.ts';
import { villageServices } from '../data/villages.ts';
import { riskLevels } from '../data/household.ts';
import { currentLevel } from '../domain/rbac.ts';
import {
  selectVisualPatient,
  setClinicalNav,
  setClinicalView,
  setTab,
  showToast,
} from '../state/actions.ts';

export function renderDashboardHero(patient: Patient): SafeHtml {
  const abnormalCount = patient.labs.filter((lab) =>
    ['high', 'low', 'watch', 'pending'].includes(lab[5]),
  ).length;
  return html`
    <section class="dashboard-hero">
      <div>
        <span class="ai-kicker">醫護儀表板</span>
        <h2>六部落服務、今日任務與風險總覽</h2>
        <p>把全島服務量、家訪清單、到檢阻礙與高風險個案放在同一個入口，不在這裡填表。</p>
      </div>
      <div class="dashboard-hero-metrics">
        <button ${{ on: { click: () => setClinicalView('workspace') } }}><strong>18</strong><span>今日家訪</span></button>
        <button ${{ on: { click: () => setTab('labs') } }}><strong>${abnormalCount}</strong><span>檢驗待處理</span></button>
        <button ${{ on: { click: () => setTab('triage') } }}><strong>${patient.risk}</strong><span>最高家戶風險</span></button>
      </div>
    </section>
  `;
}

export function renderStats(): SafeHtml {
  const stats: readonly (readonly [string, string, string, number, string])[] = [
    ['今日家訪', '18', '完成 12 / 未遇 4 / 需再訪 2', 67, 'questionnaire'],
    ['健檢名冊', '642', '已同意 71%', 71, 'checkup'],
    ['需優先追蹤', '39', 'P0/P1/P6/P9', 39, 'triage'],
    ['檢驗異常待簽核', '27', '高風險 8 件', 27, 'labs'],
  ];
  return html`
    <div class="stats-grid">
      ${stats.map(
        ([label, value, note, percent, tab]) => html`
          <button class="stat" ${{ on: { click: () => setTab(tab) } }}>
            <div class="stat-label">${label}</div>
            <div class="stat-value">${value}</div>
            <div class="stat-meter"><span style="width:${percent}%"></span></div>
            <small>${note}</small>
          </button>
        `,
      )}
    </div>
  `;
}

export function renderTodayWorklist(): SafeHtml {
  const items: readonly {
    title: string;
    detail: string;
    meta: string;
    icon: IconName;
    tab: string;
    patientId: string;
  }[] = [
    { title: '今日家訪與補訪', detail: '12 戶完成、4 戶未遇、2 戶需再訪', meta: '問卷', icon: 'home', tab: 'questionnaire', patientId: 'P-00018' },
    { title: '健檢到檢動員', detail: 'P1 健檢優先與 P8 交通協助先處理', meta: '健檢', icon: 'calendar', tab: 'checkup', patientId: 'P-00018' },
    { title: '檢驗異常待簽核', detail: '高風險 8 件，需完成居民可讀說明', meta: '檢驗', icon: 'lab', tab: 'labs', patientId: 'P-00018' },
    { title: '同意書與個資缺漏', detail: '未完成同意與聯絡方式需家訪補齊', meta: '個資', icon: 'shield', tab: 'overview', patientId: 'P-00033' },
    { title: '家庭健康設計分流', detail: '慢病穩定、肺健康與到檢協助需轉成 SMART 任務', meta: '分流', icon: 'alert', tab: 'triage', patientId: 'P-00018' },
  ];
  return html`
    <section class="panel today-work-panel">
      <div class="panel-header">
        <div><h2 class="panel-title">今日工作清單</h2><p class="panel-note">點選後進入工作區處理個案資料</p></div>
      </div>
      <div class="today-work-list">
        ${items.map(
          (item) => html`
            <button class="today-work-item" ${{ on: { click: () => selectVisualPatient(item.patientId, item.tab) } }}>
              <span class="task-icon">${icon(item.icon)}</span>
              <span>
                <strong>${item.title}</strong>
                <small>${item.detail}</small>
              </span>
              <em>${item.meta}</em>
            </button>
          `,
        )}
      </div>
    </section>
  `;
}

export function lanyuVillageMap(): SafeHtml {
  return html`
    <section class="panel lanyu-map-panel">
      <div class="panel-header"><div><h2 class="panel-title">六部落服務地圖</h2><p class="panel-note">六部落、四行政村（椰油、紅頭、朗島、東清）｜GIS 四層疊圖</p></div></div>
      <div class="lanyu-map">
        <svg viewBox="0 0 320 430" role="img" aria-label="蘭嶼六部落服務地圖">
          <defs>
            <linearGradient id="islandGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stop-color="#8be7d0" stop-opacity=".88" />
              <stop offset="54%" stop-color="#46b99f" stop-opacity=".82" />
              <stop offset="100%" stop-color="#1f8f7a" stop-opacity=".78" />
            </linearGradient>
            <linearGradient id="riskWash" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stop-color="#34c759" stop-opacity=".25" />
              <stop offset="45%" stop-color="#ffd60a" stop-opacity=".22" />
              <stop offset="100%" stop-color="#ff453a" stop-opacity=".20" />
            </linearGradient>
          </defs>
          <path class="map-sea" d="M32 46 C74 8 147 4 203 20 C266 38 301 86 305 151 C310 233 262 342 211 397 C168 443 94 420 55 366 C16 310 11 96 32 46Z" />
          <path class="map-island" d="M150 24 C187 39 227 73 241 122 C256 175 239 232 222 279 C204 331 180 390 137 397 C98 404 69 359 65 309 C61 259 87 223 78 174 C69 125 78 82 108 50 C120 37 133 27 150 24Z" />
          <path class="map-risk-wash" d="M164 72 C203 91 218 132 208 177 C198 219 219 249 201 294 C184 337 155 371 126 359 C94 346 95 295 103 253 C112 205 83 166 100 121 C113 88 134 70 164 72Z" />
          <path class="map-road" d="M136 44 C108 91 99 139 109 187 C119 235 97 279 116 330 C126 358 146 380 166 390" />
          <path class="map-road" d="M218 123 C173 134 131 157 91 184" />
          <path class="map-road" d="M218 255 C176 251 134 268 96 304" />
          <circle class="resource-dot clinic" cx="132" cy="70" r="6" />
          <circle class="resource-dot pier" cx="104" cy="188" r="6" />
          <circle class="resource-dot care" cx="201" cy="254" r="6" />
        </svg>
        ${villageServices.map(
          (village) => html`
            <button
              class="map-pin ${village.level.toLowerCase()}"
              style="--x:${village.x}%; --y:${village.y}%"
              ${{ on: { click: () => showToast(`${village.name}：${village.focus}`) } }}
            >
              <span>${village.name}</span>
              <small>${village.level}</small>
            </button>
          `,
        )}
      </div>
      <div class="map-layer-legend">
        <span>地理層</span><span>健康層</span><span>資源層</span><span>脆弱度層</span>
      </div>
      <div class="village-service-list">
        ${villageServices.map(
          (village) => html`
            <button ${{ on: { click: () => showToast(`${village.name}部落 ${village.households} 戶：${village.focus}`) } }}>
              <strong>${village.name}</strong>
              <span>${village.households} 戶</span>
              <em>${village.focus}</em>
            </button>
          `,
        )}
      </div>
    </section>
  `;
}

export function residentProtocolDashboard(): SafeHtml {
  return html`
    <section class="panel protocol-panel">
      <div class="panel-header"><div><h2 class="panel-title">P08 家庭健康設計</h2><p class="panel-note">從個案管理升級為一戶一視圖</p></div></div>
      <div class="protocol-layout">
        <div class="protocol-score">
          <strong>L3</strong>
          <span>多重慢病家戶</span>
          <small>建議每週 1-2 次追蹤</small>
        </div>
        <div class="risk-levels">
          ${riskLevels.map(
            ([code, label, freq, level]) => html`
              <button class="risk-level ${level}" ${{ on: { click: () => showToast(`${code} ${label}：${freq}`) } }}>
                <span>${code}</span>
                <strong>${label}</strong>
                <small>${freq}</small>
              </button>
            `,
          )}
        </div>
      </div>
      <div class="protocol-actions">
        <div><strong>家戶健康史</strong><span>家族疾病樹、跨代風險、生活轉折點</span></div>
        <div><strong>家戶健康協議</strong><span>3-5 個 SMART 目標，每季回顧</span></div>
        <div><strong>數位健康存摺</strong><span>家庭共享、權限分流、可追蹤留言</span></div>
      </div>
    </section>
  `;
}

export function residentReferralChain(): SafeHtml {
  const steps: readonly (readonly [string, string])[] = [
    ['發現需求', '家訪、問卷或檢驗異常'],
    ['溫暖轉介', '衛生所、IDS、長照、教會志工'],
    ['一週追蹤', '確認到診、障礙與後續建議'],
  ];
  return html`
    <section class="panel referral-panel">
      <div class="panel-header"><div><h2 class="panel-title">轉介責任鏈</h2><p class="panel-note">依 P08：不是開單後結束，而是持續追蹤</p></div></div>
      <div class="referral-chain">
        ${steps.map(
          ([title, detail], index) => html`
            <div>
              <span>${index + 1}</span>
              <strong>${title}</strong>
              <small>${detail}</small>
            </div>
          `,
        )}
      </div>
    </section>
  `;
}

export function renderClinicalSupportModules(_patient: Patient): SafeHtml {
  return html`
    <section class="clinical-support-modules" aria-label="照護支援模組">
      <section class="support-hub-head clinical-support-head">
        <span class="ai-kicker">照護支援模組</span>
        <h2>家庭健康設計與轉介責任鏈</h2>
        <p>這些是照護團隊用來設計一戶一視圖、追蹤責任與服務銜接的工作模組，不放在民眾端。</p>
      </section>
      <div class="clinical-support-grid">
        ${residentProtocolDashboard()}
        ${residentReferralChain()}
      </div>
    </section>
  `;
}

export function permissionWall(title: string, need: string): SafeHtml {
  const lv = currentLevel(getState().accessKey);
  return html`
    <section class="module-stage">
      <div class="permission-wall">
        <span class="perm-lock">${icon('lock')}</span>
        <h2>${title}</h2>
        <p>此模組需 ${need} 權限。目前身分：<strong>${lv.key} ${lv.name}</strong>。</p>
        <p class="minor">五級 RBAC 依附件 B 矩陣控管；可於登出後改以較高權限登入，或請 L2/L3 協助。</p>
        <button class="ghost-btn" ${{ on: { click: () => setClinicalNav('dashboard') } }}>${icon('arrow')}回戰情儀表板</button>
      </div>
    </section>
  `;
}
