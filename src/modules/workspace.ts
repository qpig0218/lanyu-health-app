import { html, type SafeHtml } from '../lib/html.ts';
import { icon, type IconName } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import type { Patient, AgePackage } from '../data/types.ts';
import { patients } from '../data/patients.ts';
import { agePackages, ldctAddOnPackage } from '../data/age-packages.ts';
import { villageNames } from '../data/villages.ts';
import { piiFields, questionnaireSections } from '../data/household.ts';
import { packageForAge, friendlyHouseholdTag, aiSignalsFor, smartPlanFor } from '../domain/risk.ts';
import type { SmartPlan } from '../domain/risk.ts';
import {
  aiToast,
  openModulePicker,
  selectAgePackage,
  selectVisualPatient,
  setClinicalView,
  setQuery,
  setSelectedId,
  setTab,
  setVillage,
  showToast,
} from '../state/actions.ts';

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

function checkItem(text: string, status: string): SafeHtml {
  return html`<div class="check-item"><span class="box">${icon('check')}</span><div>${text}</div><span class="status-pill">${status}</span></div>`;
}

function smartGoal(plan: SmartPlan): SafeHtml {
  return html`
    <div class="smart-goal">
      <span>${plan.domain}</span>
      <strong>${plan.goal}</strong>
      <em>${plan.metric}</em>
    </div>
  `;
}

function schemaCard(title: string, items: readonly string[]): SafeHtml {
  return html`<div class="schema-card"><h4>${title}</h4><ul>${items
    .slice(0, 6)
    .map((i) => html`<li>${i}</li>`)}</ul></div>`;
}

function renderWorkspaceAiBrief(patient: Patient): SafeHtml {
  const signals = aiSignalsFor(patient);
  return html`
    <section class="dashboard-ai-brief workspace-ai-brief">
      <div>
        <span class="ai-kicker">AI健康助理</span>
        <h3>把個案動態、文書草稿與 SMART 建議集中在工作區</h3>
        <p>依目前選取個案自動整理異常訊號，護理師可直接生成摘要、追蹤任務與居民可讀說明。</p>
      </div>
      <div class="dashboard-ai-grid">
        ${signals.map(
          ([title, detail]) => html`
            <button ${{ on: { click: () => setTab('triage') } }}>
              <strong>${title}</strong>
              <span>${detail}</span>
            </button>
          `,
        )}
        <button ${{ on: { click: () => aiToast('AI整理今日工作摘要', patient.id) } }}>
          <strong>今日摘要</strong>
          <span>彙整家訪、健檢與異常檢驗，產生交班重點。</span>
        </button>
      </div>
    </section>
  `;
}

function renderWorkspaceFillPanel(patient: Patient): SafeHtml {
  const pendingLabs = patient.labs.filter((lab) => lab[5] === 'pending').length;
  const abnormalLabs = patient.labs.filter((lab) => ['high', 'low', 'watch'].includes(lab[5])).length;
  const tasks: readonly (readonly [string, string, string, IconName])[] = [
    ['家訪問卷', patient.questionnaire.householdGoal ? '已填核心欄位' : '待填', 'questionnaire', 'clipboard'],
    ['分齡健檢', `${packageForAge(patient.age).band} 待確認`, 'checkup', 'calendar'],
    ['檢驗值', `${abnormalLabs} 異常 / ${pendingLabs} 待補`, 'labs', 'lab'],
    ['家庭健康設計', patient.householdTags.map(friendlyHouseholdTag).join('、'), 'triage', 'users'],
  ];
  return html`
    <aside class="workspace-fill-panel" aria-label="需要填寫的內容">
      <section class="panel">
        <div class="panel-header"><div><h2 class="panel-title">需要填寫的內容</h2><p class="panel-note">依目前個案自動帶出</p></div></div>
        <div class="fill-task-list">
          ${tasks.map(
            ([title, detail, tab, iconName]) => html`
              <button class="fill-task" ${{ on: { click: () => setTab(tab) } }}>
                <span class="task-icon">${icon(iconName)}</span>
                <span><strong>${title}</strong><small>${detail}</small></span>
                <em>填寫</em>
              </button>
            `,
          )}
        </div>
      </section>
      <section class="panel ai-side-panel">
        <div class="panel-header"><div><h2 class="panel-title">AI家庭護理師</h2><p class="panel-note">減少文書與掌握動態</p></div></div>
        <div class="action-list">
          <button class="btn" ${{ on: { click: () => aiToast('AI產生家訪摘要', patient.id) } }}>${icon('clipboard')}產生摘要</button>
          <button class="ghost-btn" ${{ on: { click: () => aiToast('AI追蹤個案動態', patient.id) } }}>${icon('alert')}動態追蹤</button>
          <button class="ghost-btn" ${{ on: { click: () => aiToast('AI建立SMART建議', patient.id) } }}>${icon('check')}SMART建議</button>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header"><div><h2 class="panel-title">下一步</h2><p class="panel-note">現場可直接執行</p></div></div>
        <div class="action-list">
          <button class="btn" ${{ on: { click: () => showToast('已加入今日健檢排程') } }}>${icon('calendar')}安排健檢</button>
          <button class="ghost-btn" ${{ on: { click: () => showToast('已建立轉介單草稿') } }}>${icon('arrow')}建立轉介</button>
          <button class="ghost-btn" ${{ on: { click: () => showToast('已傳送家屬提醒') } }}>${icon('check')}通知聯絡人</button>
        </div>
      </section>
    </aside>
  `;
}

function renderQueue(): SafeHtml {
  const state = getState();
  const filtered = patients.filter((p) =>
    `${p.name}${p.village}${p.tags.join('')}`.includes(state.query),
  );
  return html`
    <aside class="panel queue">
      <div class="panel-header">
        <div class="queue-title-row">
          <div>
            <h2 class="panel-title">家戶與個案名冊</h2>
            <p class="panel-note">依急迫程度、到檢阻礙和年齡切點排序</p>
          </div>
          <span class="queue-count">${filtered.length}/${patients.length}</span>
        </div>
      </div>
      <div class="searchbox">
        ${icon('search')}
        <input
          value="${state.query}"
          ${{ on: { input: (e: Event) => setQuery((e.target as HTMLInputElement).value) } }}
          placeholder="搜尋姓名、部落、分流標籤"
          data-focus="queue-search"
        />
      </div>
      <div class="patient-list">
        ${filtered.length
          ? filtered.map(
              (p) => html`
                <button
                  class="patient-card ${p.id === state.selectedId ? 'active' : ''}"
                  ${{ on: { click: () => setSelectedId(p.id) } }}
                >
                  <div class="patient-main">
                    <span class="patient-avatar">${p.displayName.slice(0, 1)}</span>
                    <span class="patient-copy">
                      <span class="person-name">${p.displayName}</span>
                      <span class="patient-meta-row">
                        <span>${p.village}</span>
                        <span class="dot"></span>
                        <span>${p.age} 歲</span>
                        <span class="dot"></span>
                        <span class="patient-age-band">${packageForAge(p.age).band}</span>
                      </span>
                    </span>
                    <span class="status-pill ${p.level === '橘' ? 'yellow' : p.level === '紅' ? 'red' : 'green'}">${p.level}</span>
                  </div>
                  <div class="tag-row">
                    ${p.tags
                      .slice(0, 3)
                      .map(
                        (t) =>
                          html`<span class="tag ${t.includes('P0') ? 'urgent' : t.includes('P1') ? 'warn' : ''}">${t}</span>`,
                      )}
                  </div>
                </button>
              `,
            )
          : html`<div class="empty-state">沒有符合條件的個案</div>`}
      </div>
    </aside>
  `;
}

function renderRecordHero(patient: Patient): SafeHtml {
  return html`
    <div class="record-hero">
      <div>
        <h2>${patient.displayName}</h2>
        <div class="record-meta">
          <span class="tag">${patient.id}</span>
          <span class="tag">${patient.household}</span>
          <span class="tag">${patient.age} 歲・${patient.sex}</span>
          <span class="tag">${patient.identity}</span>
          <span class="tag ok">${patient.consent}</span>
        </div>
      </div>
      <div class="risk-stack">
        <div class="risk-card" style="--risk-marker:${100 - patient.risk}%">
          <div class="risk-score"><span>${patient.risk}</span></div>
          <div class="risk-band" aria-label="風險色帶：紅色高風險、橘黃色中風險、綠色低風險">
            <span class="risk-marker"></span>
          </div>
          <div class="risk-labels"><span>高</span><span>中</span><span>低</span></div>
        </div>
        <div class="minor">家庭風險分數 / 100</div>
      </div>
    </div>
  `;
}

function renderTabs(): SafeHtml {
  const state = getState();
  const tabs: readonly (readonly [string, string])[] = [
    ['overview', '家戶總覽'],
    ['questionnaire', '家訪問卷'],
    ['checkup', '分齡健檢'],
    ['labs', '檢驗值'],
    ['triage', '分流與設計'],
  ];
  return html`<div class="tabs">${tabs.map(
    ([key, label]) =>
      html`<button class="${state.tab === key ? 'active' : ''}" ${{ on: { click: () => setTab(key) } }}>${label}</button>`,
  )}</div>`;
}

function renderVisualOverview(patient: Patient): SafeHtml {
  const state = getState();
  const sortedByAge = [...patients].sort((a, b) => a.age - b.age);
  return html`
    <div class="visual-suite wide">
      <section class="visual-panel visual-villages">
        <div class="visual-head"><strong>六部落熱點</strong><span>${state.query || patient.village}</span></div>
        <div class="village-map">
          ${villageNames.map((village) => {
            const count = patients.filter((p) => p.village === village).length;
            const active = state.query === village || (!state.query && patient.village === village);
            return html`
              <button
                class="village-node ${active ? 'active' : ''}"
                style="--heat:${Math.max(0.28, count * 0.34)}"
                ${{ on: { click: () => setVillage(village) } }}
              >
                <span class="village-orb"></span>
                <strong>${village}</strong>
                <small>${count || 0} 戶</small>
              </button>
            `;
          })}
        </div>
      </section>
      <section class="visual-panel visual-risk">
        <div class="visual-head"><strong>個案風險流</strong><span>${patient.risk}/100</span></div>
        <div class="risk-flow">
          ${[...patients]
            .sort((a, b) => b.risk - a.risk)
            .map(
              (p) => html`
                <button
                  class="risk-row ${p.id === patient.id ? 'active' : ''}"
                  ${{ on: { click: () => selectVisualPatient(p.id, 'triage') } }}
                >
                  <span>${p.displayName}</span>
                  <span class="risk-track"><span style="width:${p.risk}%"></span></span>
                  <strong>${p.risk}</strong>
                </button>
              `,
            )}
        </div>
      </section>
      <section class="visual-panel visual-age">
        <div class="visual-head"><strong>分齡軌道</strong><span>${packageForAge(patient.age).band}</span></div>
        <div class="age-rail">
          ${sortedByAge.map(
            (p) => html`
              <button
                class="age-pin ${p.id === patient.id ? 'active' : ''}"
                style="left:${Math.min(94, Math.max(4, (p.age / 90) * 100))}%"
                ${{ on: { click: () => selectVisualPatient(p.id, 'checkup') } }}
              >
                <span>${p.age}</span>
                <small>${p.village}</small>
              </button>
            `,
          )}
        </div>
      </section>
    </div>
  `;
}

function renderAiAssistantPanel(patient: Patient): SafeHtml {
  const signals = aiSignalsFor(patient);
  const smartPlans = smartPlanFor(patient);
  return html`
    <div class="ai-assistant-card wide">
      <div class="ai-head">
        <div>
          <span class="ai-kicker">AI家庭護理師 / AI健康助理</span>
          <h3>自動掌握個案動態，減少家訪後文書</h3>
          <p>把家訪問卷、健檢項目、檢驗值與家庭模組整理成可簽核的照護摘要。</p>
        </div>
        <span class="ai-badge">SMART</span>
      </div>
      <div class="ai-grid">
        <button class="ai-chip" ${{ on: { click: () => aiToast('AI產生家訪摘要', patient.id) } }}>
          <strong>文書草稿</strong>
          <span>SOAP、家訪摘要、家屬提醒</span>
        </button>
        <button class="ai-chip" ${{ on: { click: () => aiToast('AI追蹤個案動態', patient.id) } }}>
          <strong>動態監測</strong>
          <span>異常值、未到檢、交通阻礙</span>
        </button>
        <button class="ai-chip" ${{ on: { click: () => aiToast('AI建立SMART建議', patient.id) } }}>
          <strong>生活型態醫學</strong>
          <span>飲食、活動、睡眠、戒菸檳、壓力支持</span>
        </button>
      </div>
      <div class="ai-insight-row">
        ${signals.map(
          ([title, desc]) => html`
            <div class="ai-signal">
              <strong>${title}</strong>
              <span>${desc}</span>
            </div>
          `,
        )}
      </div>
      <div class="smart-list">${smartPlans.map((plan) => smartGoal(plan))}</div>
    </div>
  `;
}

function renderOverview(patient: Patient): SafeHtml {
  return html`
    <div class="section-grid">
      ${renderVisualOverview(patient)}
      ${renderAiAssistantPanel(patient)}
      <div class="info-block">
        <h3>個資與同意</h3>
        <dl class="kv">
          <dt>家戶編號</dt><dd>${patient.household}</dd>
          <dt>主要電話</dt><dd>${patient.phone}</dd>
          <dt>聯絡人</dt><dd>${patient.contact}</dd>
          <dt>同意狀態</dt><dd>${patient.consent}</dd>
        </dl>
      </div>
      <div class="info-block">
        <h3>家庭健康圖譜</h3>
        <dl class="kv">
          <dt>部落</dt><dd>${patient.village}</dd>
          <dt>家戶狀態</dt><dd>${patient.questionnaire.home}</dd>
          <dt>到檢阻礙</dt><dd>${patient.questionnaire.transport}</dd>
          <dt>家庭目標</dt><dd>${patient.questionnaire.householdGoal}</dd>
        </dl>
      </div>
      <div class="check-block wide">
        <h3>本案必收資料欄位</h3>
        <div class="schema-grid">
          ${schemaCard('個資', [...piiFields[0]!, ...piiFields[1]!])}
          ${schemaCard('家戶', ['家戶編號', '成員 roster', '照顧者', '交通可近性', '居住安全', '家庭健康目標'])}
          ${schemaCard('健檢/檢驗', ['年齡層方案', '檢查項目', '檢驗值', '正常範圍', '異常旗標', '報告日期'])}
          ${schemaCard('照護', ['個人分流項目', '家庭健康設計', '追蹤期限', '轉介去向', '完成狀態'])}
        </div>
      </div>
    </div>
  `;
}

function renderAiDocumentationPanel(patient: Patient): SafeHtml {
  const drafts: readonly (readonly [string, string])[] = [
    ['家訪摘要', `家庭目標：${patient.questionnaire.householdGoal}`],
    ['SOAP 草稿', `問題：${patient.conditions.slice(0, 2).join('、') || '待補'}`],
    ['家屬通知', `聯絡人：${patient.contact}，提醒同意書、健檢與追蹤。`],
    ['追蹤待辦', `${aiSignalsFor(patient).map(([title]) => title).join('、') || '例行追蹤'}`],
  ];
  return html`
    <div class="ai-doc-card wide">
      <div class="ai-head compact">
        <div>
          <span class="ai-kicker">AI文書減量</span>
          <h3>問卷填完後自動整理成護理紀錄</h3>
        </div>
        <button class="ghost-btn" ${{ on: { click: () => aiToast('AI整理問卷紀錄', patient.id) } }}>${icon('clipboard')}產生草稿</button>
      </div>
      <div class="ai-draft-grid">
        ${drafts.map(
          ([title, detail]) => html`
            <button class="ai-draft" ${{ on: { click: () => showToast(`${title} 已加入草稿`) } }}>
              <strong>${title}</strong>
              <span>${detail}</span>
            </button>
          `,
        )}
      </div>
    </div>
  `;
}

function renderQuestionnaire(patient: Patient): SafeHtml {
  return html`
    <div class="section-grid">
      <div class="field-block wide">
        <h3>家訪問卷快速填寫</h3>
        <div class="field-grid">
          <div class="field"><label>訪視方式</label><select><option>面訪</option><option>電話</option><option>第二次補訪</option></select></div>
          <div class="field"><label>語言需求</label><select><option>國語可溝通</option><option>需族語協助</option><option>家屬協助</option></select></div>
          <div class="field"><label>可通知方式</label><select><option>電話 + LINE</option><option>部落/村辦通知</option><option>家屬代收</option></select></div>
          <div class="field"><label>家庭最擔心問題</label><input value="${patient.questionnaire.householdGoal}" /></div>
          <div class="field"><label>到檢協助</label><input value="${patient.questionnaire.transport}" /></div>
          <div class="field"><label>急迫警訊</label><input value="${patient.questionnaire.alert}" /></div>
        </div>
      </div>
      ${renderAiDocumentationPanel(patient)}
      ${questionnaireSections.map(
        ([title, detail]) => html`
          <div class="check-block">
            <h3>${title}</h3>
            <div class="check-item">
              <span class="box">${icon('check')}</span>
              <div>${detail}<div class="minor">已納入資料欄位</div></div>
              <span class="status-pill green">完成</span>
            </div>
          </div>
        `,
      )}
    </div>
  `;
}

function renderAgePackageRail(patient: Patient): SafeHtml {
  const activeBand = packageForAge(patient.age).band;
  return html`
    <div class="visual-panel age-package-panel wide">
      <div class="visual-head"><strong>全齡健檢軌道</strong><span>${activeBand}</span></div>
      <div class="age-package-grid">
        ${agePackages.map((pkg, index) => {
          const hasSample = patients.some((p) => packageForAge(p.age).band === pkg.band);
          return html`
            <button
              class="age-package ${pkg.band === activeBand ? 'active' : ''} ${hasSample ? 'has-sample' : ''}"
              ${{ on: { click: () => selectAgePackage(index) } }}
            >
              <span>${pkg.band}</span>
              <small>${pkg.modules[0]}</small>
            </button>
          `;
        })}
      </div>
    </div>
  `;
}

function renderAiCheckupCoach(patient: Patient, pkg: AgePackage): SafeHtml {
  const actions: readonly (readonly [string, string])[] = [
    ['分齡排檢', `${pkg.band}：${pkg.core.slice(0, 3).join('、')}`],
    ['到檢動員', patient.questionnaire.transport],
    ['缺漏提醒', patient.labs.some((lab) => lab[5] === 'pending') ? '有待補檢驗，建議併入健檢日' : '目前無待補檢驗'],
  ];
  return html`
    <div class="ai-doc-card wide ai-checkup-card">
      <div class="ai-head compact">
        <div>
          <span class="ai-kicker">AI健康助理</span>
          <h3>自動比對年齡層、風險與到檢阻礙</h3>
        </div>
        <button class="ghost-btn" ${{ on: { click: () => aiToast('AI建立健檢排程', patient.id) } }}>${icon('calendar')}排程</button>
      </div>
      <div class="ai-draft-grid">
        ${actions.map(
          ([title, detail]) => html`
            <div class="ai-draft static">
              <strong>${title}</strong>
              <span>${detail}</span>
            </div>
          `,
        )}
      </div>
    </div>
  `;
}

function renderLdctAddOnPanel(patient: Patient): SafeHtml {
  const signalText = `${patient.tags.join(' ')} ${patient.conditions.join(' ')} ${patient.questionnaire.alert}`;
  const candidate = patient.age >= 50 || signalText.includes('LDCT') || signalText.includes('吸菸') || signalText.includes('肺');
  return html`
    <div class="check-block wide ldct-addon-panel">
      <div class="ldct-addon-head">
        <div>
          <span class="ai-kicker">LDCT 加做包</span>
          <h3>${ldctAddOnPackage.band}</h3>
        </div>
        <span class="status-pill ${candidate ? 'yellow' : ''}">${candidate ? '需條件確認' : '依風險分流'}</span>
      </div>
      <div class="section-grid compact-grid">
        <div>
          <h3>條件確認</h3>
          <div class="check-list">${ldctAddOnPackage.core.map((item) => checkItem(item, '確認'))}</div>
        </div>
        <div>
          <h3>影像與追蹤</h3>
          <div class="check-list">${ldctAddOnPackage.labs.map((item) => checkItem(item, '排程'))}</div>
        </div>
      </div>
    </div>
  `;
}

function renderCheckup(patient: Patient): SafeHtml {
  const pkg = packageForAge(patient.age);
  return html`
    <div class="section-grid">
      ${renderAgePackageRail(patient)}
      ${renderAiCheckupCoach(patient, pkg)}
      <div class="info-block">
        <h3>系統自動判斷年齡層</h3>
        <dl class="kv">
          <dt>年齡</dt><dd>${patient.age} 歲</dd>
          <dt>方案</dt><dd>${pkg.band}</dd>
          <dt>主模組</dt><dd>${pkg.modules.join('、')}</dd>
        </dl>
      </div>
      <div class="info-block">
        <h3>分齡原則</h3>
        <p class="minor">未滿 7 歲不列主檢包；7-18 歲採兒少 S 版；19-49 歲成人 A 版；50-64 歲成人 B 版；65+ 採高齡 G 版。LDCT 不設年齡層，依政策或高風險條件加做。</p>
      </div>
      ${renderLdctAddOnPanel(patient)}
      <div class="check-block">
        <h3>核心檢查</h3>
        <div class="check-list">${pkg.core.map((item) => checkItem(item, '安排'))}</div>
      </div>
      <div class="check-block">
        <h3>檢驗/影像/篩檢</h3>
        <div class="check-list">${pkg.labs.map((item) => checkItem(item, '待排'))}</div>
      </div>
    </div>
  `;
}

function renderLabVisual(patient: Patient): SafeHtml {
  const totals: Record<string, number> = patient.labs.reduce<Record<string, number>>((acc, lab) => {
    acc[lab[5]] = (acc[lab[5]] ?? 0) + 1;
    return acc;
  }, {});
  const abnormal = (totals.high ?? 0) + (totals.low ?? 0) + (totals.watch ?? 0);
  return html`
    <div class="visual-panel lab-visual-panel wide">
      <div class="visual-head"><strong>檢驗狀態圖</strong><span>異常 ${abnormal}/${patient.labs.length}</span></div>
      <div class="lab-orbit">
        ${patient.labs.map(
          (lab) => html`
            <button class="lab-bubble ${lab[5]}" ${{ on: { click: () => showToast(`${lab[1]}：${lab[2]}${lab[3]}`) } }}>
              <strong>${lab[0]}</strong>
              <span>${lab[2]}${lab[3]}</span>
              ${labStatus(lab[5])}
            </button>
          `,
        )}
      </div>
    </div>
  `;
}

function renderAiLabCoach(patient: Patient): SafeHtml {
  const abnormalLabs = patient.labs.filter((lab) => ['high', 'low', 'watch'].includes(lab[5]));
  const pendingLabs = patient.labs.filter((lab) => lab[5] === 'pending');
  return html`
    <div class="ai-doc-card wide ai-lab-card">
      <div class="ai-head compact">
        <div>
          <span class="ai-kicker">AI檢驗摘要</span>
          <h3>把檢驗值轉成追蹤重點與居民可讀說明</h3>
        </div>
        <button class="ghost-btn" ${{ on: { click: () => aiToast('AI產生檢驗追蹤', patient.id) } }}>${icon('lab')}摘要</button>
      </div>
      <div class="ai-lab-summary">
        <div><strong>${abnormalLabs.length}</strong><span>異常/觀察</span></div>
        <div><strong>${pendingLabs.length}</strong><span>待補項目</span></div>
        <div><strong>${smartPlanFor(patient).length}</strong><span>SMART建議</span></div>
      </div>
    </div>
  `;
}

function renderLabs(patient: Patient): SafeHtml {
  return html`
    <div class="section-grid">
      ${renderLabVisual(patient)}
      ${renderAiLabCoach(patient)}
      <div class="field-block wide">
        <h3>檢驗值輸入與異常旗標</h3>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>代碼</th><th>項目</th><th>值</th><th>單位</th><th>參考</th><th>狀態</th></tr></thead>
            <tbody>
              ${patient.labs.map(
                (lab) => html`
                  <tr>
                    <td class="num">${lab[0]}</td>
                    <td>${lab[1]}</td>
                    <td><input class="lab-input" value="${lab[2]}" ${{ on: { change: () => showToast(`已更新 ${lab[1]}`) } }} /></td>
                    <td>${lab[3]}</td>
                    <td>${lab[4]}</td>
                    <td>${labStatus(lab[5])}</td>
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderAiSmartPanel(patient: Patient): SafeHtml {
  return html`
    <div class="ai-assistant-card wide ai-smart-card">
      <div class="ai-head compact">
        <div>
          <span class="ai-kicker">AI健康助理</span>
          <h3>分流後直接生成家庭照護與生活型態醫學任務</h3>
        </div>
        <button class="ghost-btn" ${{ on: { click: () => aiToast('AI同步照護任務', patient.id) } }}>${icon('check')}同步</button>
      </div>
      <div class="smart-list">${smartPlanFor(patient).map((plan) => smartGoal(plan))}</div>
    </div>
  `;
}

function renderTriage(patient: Patient): SafeHtml {
  return html`
    <div class="section-grid">
      ${renderAiSmartPanel(patient)}
      <div class="check-block">
        <h3>個人分流標籤</h3>
        <div class="check-list">${patient.tags.map((tag) => checkItem(tag, tag.includes('P1') ? '優先' : '追蹤'))}</div>
      </div>
      <div class="check-block">
        <h3>家庭健康設計模組</h3>
        <div class="check-list">${patient.householdTags.map((tag) => checkItem(friendlyHouseholdTag(tag), '啟用'))}</div>
      </div>
      <div class="field-block wide module-picker-card">
        <div>
          <span class="ai-kicker">家庭健康設計</span>
          <h3>用情境選擇照護模組</h3>
          <p>不要讓護理師在頁面上讀代碼表；需要分流時打開選擇器，看名稱、適用情境與設計重點。</p>
        </div>
        <div class="selected-module-pills">
          ${patient.householdTags.map((tag) => html`<span>${friendlyHouseholdTag(tag)}</span>`)}
        </div>
        <button class="btn" ${{ on: { click: () => openModulePicker('triage') } }}>${icon('users')}選擇家庭健康設計</button>
      </div>
    </div>
  `;
}

function renderTabBody(patient: Patient): SafeHtml {
  switch (getState().tab) {
    case 'questionnaire':
      return renderQuestionnaire(patient);
    case 'checkup':
      return renderCheckup(patient);
    case 'labs':
      return renderLabs(patient);
    case 'triage':
      return renderTriage(patient);
    default:
      return renderOverview(patient);
  }
}

export function renderClinicalWorkspace(patient: Patient): SafeHtml {
  return html`
    <section class="clinical-workspace">
      <div class="workspace-context-bar">
        <div>
          <span class="ai-kicker">工作區</span>
          <h2>家戶、個案資訊與填寫內容</h2>
          <p>先選家戶與個案，再在中間卡片完成問卷、分齡健檢、檢驗值與分流設計。</p>
        </div>
        <div class="workspace-context-actions">
          <button class="ghost-btn" ${{ on: { click: () => setClinicalView('dashboard') } }}>${icon('home')}回儀表板</button>
          <button class="btn" ${{ on: { click: () => aiToast('AI產生家訪摘要', patient.id) } }}>${icon('clipboard')}AI摘要</button>
        </div>
      </div>
      ${renderWorkspaceAiBrief(patient)}
      <section class="clinical-workspace-grid">
        ${renderQueue()}
        <section class="workspace-center" aria-label="個案資訊">
          <article class="panel record">
            ${renderRecordHero(patient)}
            ${renderTabs()}
            <div class="tab-body">${renderTabBody(patient)}</div>
          </article>
        </section>
        ${renderWorkspaceFillPanel(patient)}
      </section>
    </section>
  `;
}
