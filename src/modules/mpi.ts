import { html, type SafeHtml } from '../lib/html.ts';
import { icon } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import type { Patient } from '../data/types.ts';
import { patients } from '../data/patients.ts';
import { consentTiers } from '../data/access-levels.ts';
import { selectVisualPatient, setMpiTab, setQuery, showToast, toggleLang } from '../state/actions.ts';

/** 家戶 roster 合成成員（非完整 Patient，僅用於一戶一視圖列）。 */
interface RosterMember {
  displayName: string;
  age: number;
  sex: string;
  level: string;
  conditions: string[];
}

function labStatus(status: string): SafeHtml {
  const map: Record<string, readonly [string, string]> = {
    high: ['red', '偏高'],
    low: ['yellow', '偏低'],
    watch: ['yellow', '觀察'],
    pending: ['', '待補'],
    ok: ['green', '正常'],
  };
  const [cls, label] = map[status] ?? ['', '待判'];
  return html`<span class="status-pill ${cls}">${label}</span>`;
}

function renderMpiIndex(): SafeHtml {
  const state = getState();
  const subIndex: readonly (readonly [string, number])[] = [
    ['一般居民', patients.length],
    ['核廢場工人', 0],
    ['訪客／非設籍', 0],
    ['未成年', 1],
  ];
  return html`
    <div class="section-grid">
      <div class="field-block wide">
        <h3>主索引查詢（FNP / 衛生所主管）</h3>
        <div class="searchbox"><span class="filter-pill">在地軌 2,259</span><span class="filter-pill">本島軌 2,760</span><input value="${state.query}" ${{ on: { input: (e: Event) => setQuery((e.target as HTMLInputElement).value) } }} placeholder="查身分證末四碼 / NHI / 自訂 ID / 姓名" /></div>
        <div class="table-scroll">
          <table class="lab-table mpi-table">
            <thead><tr><th>主索引 ID</th><th>三鍵（遮罩）</th><th>姓名</th><th>家戶</th><th>軌別</th><th>同意</th></tr></thead>
            <tbody>
              ${patients.filter((p) => `${p.name}${p.id}${p.village}`.includes(state.query)).map((p) => html`
                <tr ${{ on: { click: () => selectVisualPatient(p.id, 'overview') } }} style="cursor:pointer">
                  <td class="num">${p.id}</td>
                  <td class="num">ID ****${p.id.slice(-3)} · NHI ****${(p.age * 7) % 10000} · 🔒</td>
                  <td>${p.displayName}</td>
                  <td>${p.household}</td>
                  <td>${p.village === '野銀' || p.village === '東清' ? '在地' : '在地'}</td>
                  <td>${labStatus(p.consent.includes('待') ? 'pending' : 'ok')}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
      <div class="info-block">
        <h3>特殊子索引</h3>
        <div class="check-list">${subIndex.map(([l, n]) => html`<div class="check-item"><span class="box">${icon('users')}</span><div>${l}<div class="minor">與一般居民區隔</div></div><span class="status-pill">${n}</span></div>`)}</div>
      </div>
      <div class="info-block">
        <h3>HITL 與 RBAC</h3>
        <p class="minor">新增／合併／拆分主索引：須 L3 駐點主管簽核（L4 僅能提送）。跨機構查詢個資：須同意旗標 ＋ L3 簽核。撤回同意：L5 居民自助即可，須通知 L3。</p>
      </div>
    </div>
  `;
}

function renderHouseholdView(patient: Patient): SafeHtml {
  const members = patients.filter((p) => p.household === patient.household);
  const roster: readonly (Patient | RosterMember)[] = members.length > 1 ? members : [
    patient,
    { displayName: '夏曼・配偶', age: 59, sex: '女', level: '黃', conditions: ['高血壓'] },
    { displayName: '夏曼・孫', age: 12, sex: '男', level: '綠', conditions: ['近視'] },
  ];
  return html`
    <div class="section-grid">
      <div class="field-block wide household-head">
        <div><span class="ai-kicker">一戶一視圖</span><h3>${patient.household}・${patient.village}部落</h3><p class="minor">戶長 ${patient.displayName}｜${roster.length} 名成員｜鄰里碼＋戶長 ID 聚合（支援多戶共用家屋）</p></div>
        <span class="status-pill ${patient.level === '橘' ? 'yellow' : 'green'}">家戶風險 ${patient.risk}</span>
      </div>
      <div class="check-block wide">
        <h3>家戶成員 roster</h3>
        <div class="household-roster">
          ${roster.map((m) => html`
            <div class="roster-card">
              <span class="patient-avatar">${m.displayName.slice(0, 1)}</span>
              <div><strong>${m.displayName}</strong><small>${m.age} 歲・${m.sex}</small></div>
              <div class="roster-cond">${(m.conditions || []).length ? (m.conditions || []).slice(0, 2).map((c) => html`<span class="tag">${c}</span>`) : html`<span class='minor'>—</span>`}</div>
              <span class="status-pill ${m.level === '橘' ? 'yellow' : m.level === '紅' ? 'red' : 'green'}">${m.level || '綠'}</span>
            </div>
          `)}
        </div>
      </div>
      <div class="info-block"><h3>家戶慢病樹</h3><p class="minor">跨代風險：高血壓（戶長＋配偶）、糖尿病（戶長）、近視（孫）。建議啟用 H2 慢病穩定、H5 兒少發展。</p></div>
      <div class="info-block"><h3>家訪與風險摘要</h3><dl class="kv"><dt>最近家訪</dt><dd>2026-05-28（面訪）</dd><dt>到檢阻礙</dt><dd>${patient.questionnaire.transport}</dd><dt>家庭目標</dt><dd>${patient.questionnaire.householdGoal}</dd></dl></div>
    </div>
  `;
}

function renderConsentManager(_patient: Patient): SafeHtml {
  const state = getState();
  return html`
    <div class="section-grid">
      <div class="check-block wide">
        <h3>同意四層旗標（每筆 PII 掛同意層級）</h3>
        <div class="consent-grid">
          ${consentTiers.map(([tier, scope, basis, ver, st]) => html`
            <div class="consent-card ${st}">
              <div class="consent-top"><strong>${tier}</strong>${labStatus(st)}</div>
              <small>${scope}</small>
              <div class="consent-meta"><span>${basis}</span><span>版本 ${ver}</span></div>
            </div>
          `)}
        </div>
      </div>
      <div class="field-block">
        <h3>雙語同意書（中文＋達悟語）</h3>
        <p class="minor">${state.lang === 'tao' ? '〔達悟語版・待部落顧問審定〕審定號：TAO-CONSENT-pending' : '中文標準體＋達悟語並列；達悟語版本須由部落顧問審稿，列審定號於頁尾。'}</p>
        <div class="action-list">
          <button class="btn" ${{ on: { click: () => showToast('已產生雙語同意書 PDF（達悟語待審定）') } }}>${icon('clipboard')}產生雙語同意書</button>
          <button class="ghost-btn" ${{ on: { click: () => toggleLang() } }}>${icon('globe')}切換 ${state.lang === 'tao' ? '中文' : '達悟語'}</button>
        </div>
      </div>
      <div class="field-block">
        <h3>撤回機制（L5 居民自助）</h3>
        <p class="minor">居民可由 PWA / LIFF / 紙本任一管道撤回；系統 24 小時內封存（不刪除以保留稽核），停止跨機構共享與研究，並通知 L3。</p>
        <button class="danger-btn" ${{ on: { click: () => showToast('撤回已受理：24h 內封存，已寫入稽核並通知 L3 駐點主管') } }}>${icon('shield')}模擬撤回同意</button>
      </div>
    </div>
  `;
}

function renderDedupReview(): SafeHtml {
  const pairs: readonly (readonly [string, string, string, string, number, string])[] = [
    ['P-00018', '夏曼・明義', 'P-01133', '夏曼明義', 0.94, '戶籍＋健保同生日，疑似同人多檔'],
    ['P-00042', '希婻・阿美', 'P-00977', '希婻阿美(教會名冊)', 0.88, '姓名相似、部落相同、無身分證對應'],
  ];
  return html`
    <div class="section-grid">
      <div class="info-block wide"><h3>重複偵測審核頁（PMO / L3）</h3><p class="minor">進資料時即時偵測同人多檔，標記人工審核；合併／拆分主索引須 L3 簽核。目前重複率 0.4%（目標 &lt;0.5%）。</p></div>
      ${pairs.map(([idA, nameA, idB, nameB, sim, reason]) => html`
        <div class="dedup-card wide">
          <div class="dedup-pair">
            <div><span class="num">${idA}</span><strong>${nameA}</strong></div>
            <div class="dedup-score"><strong>${Math.round(sim * 100)}%</strong><small>相似度</small></div>
            <div><span class="num">${idB}</span><strong>${nameB}</strong></div>
          </div>
          <p class="minor">${reason}</p>
          <div class="action-list">
            <button class="btn" ${{ on: { click: () => showToast('合併建議已提送 L3 駐點主管簽核（保留稽核）') } }}>${icon('check')}合併（提送簽核）</button>
            <button class="ghost-btn" ${{ on: { click: () => showToast('已標記為不同人，留存判定紀錄') } }}>${icon('arrow')}判定為不同人</button>
          </div>
        </div>
      `)}
    </div>
  `;
}

function renderMpiBody(patient: Patient): SafeHtml {
  const state = getState();
  if (state.mpiTab === 'household') return renderHouseholdView(patient);
  if (state.mpiTab === 'consent') return renderConsentManager(patient);
  if (state.mpiTab === 'dedup') return renderDedupReview();
  return renderMpiIndex();
}

export function renderMpiModule(patient: Patient): SafeHtml {
  const state = getState();
  const tabs: readonly (readonly [string, string])[] = [
    ['index', '主索引查詢'],
    ['household', '一戶一視圖'],
    ['consent', '同意管理'],
    ['dedup', '重複偵測'],
  ];
  return html`
    <section class="module-stage">
      <div class="module-stage-head">
        <div>
          <span class="ai-kicker">模組一・居民主索引 MPI</span>
          <h2>一人一檔 ＋ 一戶一視圖</h2>
          <p>三鍵交叉（身分證＋NHI＋自訂 ID，單向加密）為其他四模組唯一參照；雙軌（在地／本島）統一索引。</p>
        </div>
        <div class="mpi-cover-cards">
          ${([['一人一檔覆蓋', '95%'], ['一戶一視圖', '90%'], ['重複率', '0.4%'], ['同意旗標完整', '100%']] as const).map(([l, v]) => html`<div><strong>${v}</strong><span>${l}</span></div>`)}
        </div>
      </div>
      <div class="tabs module-tabs">${tabs.map(([k, l]) => html`<button class="${state.mpiTab === k ? 'active' : ''}" ${{ on: { click: () => setMpiTab(k) } }}>${l}</button>`)}</div>
      <div class="module-body">${renderMpiBody(patient)}</div>
    </section>
  `;
}
