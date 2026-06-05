import { html, type SafeHtml } from '../lib/html.ts';
import { icon, type IconName } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import { patients } from '../data/patients.ts';
import { consentTiers } from '../data/access-levels.ts';
import { protocolDimensions } from '../data/household.ts';
import { smartPlanFor } from '../domain/risk.ts';
import { appFooter } from '../components/chrome.ts';
import {
  nextResidentStep,
  prevResidentStep,
  setResidentTab,
  showToast,
  toggleLang,
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

function residentNav(tab: string, iconName: IconName, label: string): SafeHtml {
  const active = getState().residentTab === tab ? 'active' : '';
  return html`
    <button class="${active}" ${{ on: { click: () => setResidentTab(tab) } }}>
      ${icon(iconName)}<span>${label}</span>
    </button>
  `;
}

function residentMember(label: string, level: string, note: string): SafeHtml {
  return html`<span class="member-pill ${level.toLowerCase()}"><strong>${label}</strong><small>${level} ${note}</small></span>`;
}

function residentTask(title: string, desc: string, meta: string, iconName: IconName): SafeHtml {
  return html`<div class="task-card"><div class="task-icon">${icon(iconName)}</div><div><strong>${title}</strong><div class="minor">${desc}</div></div><span class="status-pill">${meta}</span></div>`;
}

function residentPathStep(
  title: string,
  meta: string,
  percent: number,
  iconName: IconName,
): SafeHtml {
  return html`
    <div class="path-step">
      <span class="task-icon">${icon(iconName)}</span>
      <strong>${title}</strong>
      <small>${meta}</small>
      <span class="mini-meter"><span style="width:${percent}%"></span></span>
    </div>
  `;
}

function residentTimeline(
  num: string,
  title: string,
  desc: string,
  time: string,
  stateClass: string,
): SafeHtml {
  return html`
    <div class="timeline-item ${stateClass}">
      <span class="timeline-index">${num}</span>
      <div>
        <strong>${title}</strong>
        <p>${desc}</p>
      </div>
      <span class="status-pill">${time}</span>
    </div>
  `;
}

function residentConsentCard(): SafeHtml {
  const lang = getState().lang;
  return html`
    <section class="resident-card consent-resident-card">
      <div class="resident-card-head">
        <div>
          <h3>我的個資與同意</h3>
          <p>
            ${lang === 'tao'
              ? '〔達悟語・待部落顧問審定〕你的資料、你做主。'
              : '你的資料、你做主。可隨時撤回，系統 24 小時內封存。'}
          </p>
        </div>
        <button class="gov-pill ${lang === 'tao' ? 'active' : ''}" ${{ on: { click: () => toggleLang() } }}>
          ${icon('globe')}${lang === 'tao' ? '達悟語' : '中文'}
        </button>
      </div>
      <div class="consent-mini">
        ${consentTiers.map(
          ([tier, , , , st]) => html`
            <span class="consent-chip ${st}">${tier.split(' ')[0]}${labStatus(st)}</span>
          `,
        )}
      </div>
      <div class="action-list">
        <button class="ghost-btn" ${{ on: { click: () => showToast('已開啟雙語同意書（達悟語待審定）') } }}>
          ${icon('clipboard')}查看雙語同意書
        </button>
        <button
          class="danger-btn"
          ${{ on: { click: () => showToast('撤回已受理：24h 內封存，停止跨機構共享與研究，並通知駐點') } }}
        >
          ${icon('shield')}撤回同意
        </button>
      </div>
    </section>
  `;
}

function residentFamilyHealthCard(): SafeHtml {
  return html`
    <div class="family-card family-command-card family-health-design-card">
      <div class="family-hero-grid">
        <div>
          <span class="family-eyebrow">我的家庭健康</span>
          <h2>夏曼家</h2>
          <p>慢病穩定、肺健康、健檢交通協助</p>
        </div>
        <div class="family-score-dial" aria-label="家戶資料完成度 68%">
          <div class="family-score-core">
            <div><strong>68</strong><span>%</span></div>
            <small>完成度</small>
          </div>
        </div>
      </div>
      <div class="family-member-row">
        ${residentMember('爸', 'L3', '血糖追蹤')}
        ${residentMember('媽', 'L2', '用藥穩定')}
        ${residentMember('女', 'L1', '家屬協助')}
      </div>
      <div class="family-design-panel">
        <div>
          <span>家庭健康設計</span>
          <strong>本季先完成全家健檢、血糖追蹤與到檢協助</strong>
        </div>
        <div class="family-design-metrics">
          ${protocolDimensions.slice(0, 4).map(
            ([label, detail, percent]) => html`
              <span><b>${label}</b><small>${detail}</small><i style="--pct:${percent}%"></i></span>
            `,
          )}
        </div>
      </div>
      <div class="progress-bar"><span style="width:68%"></span></div>
      <p class="minor family-card-note">
        護理師會依問卷與健檢結果更新家庭健康設計，家人只看需要一起完成的下一步。
      </p>
    </div>
  `;
}

function residentAiAssistantCard(): SafeHtml {
  const smart = smartPlanFor(patients[0]!)[0]!;
  return html`
    <section class="resident-card ai-resident-card">
      <div class="resident-card-head">
        <div>
          <h3>AI健康助理</h3>
          <p>把問卷、預約、檢驗與家庭照護任務整理成下一步</p>
        </div>
        <span class="status-pill green">啟用</span>
      </div>
      <div class="resident-ai-list">
        <div><strong>提醒</strong><span>6/18 健檢前一天空腹、交通與陪同確認。</span></div>
        <div><strong>整理</strong><span>問卷答案會轉成護理師可讀摘要，減少重複說明。</span></div>
        <div><strong>建議</strong><span>依 SMART 原則給出本週可做到的生活型態目標。</span></div>
      </div>
      <div class="resident-smart-goal">
        <span>本週SMART目標</span>
        <strong>${smart.goal}</strong>
      </div>
    </section>
  `;
}

function residentHealthPathPreview(): SafeHtml {
  return html`
    <section class="resident-card care-path-card">
      <div class="resident-card-head">
        <div>
          <h3>個人健康路徑設計</h3>
          <p>依照家訪、健檢與檢驗結果安排下一步</p>
        </div>
        <span class="status-pill yellow">進行中</span>
      </div>
      <div class="path-strip">
        ${residentPathStep('問卷', '已完成', 100, 'check')}
        ${residentPathStep('健檢', '6/18', 72, 'calendar')}
        ${residentPathStep('追蹤', '2 週內', 38, 'lab')}
      </div>
      <button class="ghost-btn resident-wide-btn" ${{ on: { click: () => setResidentTab('plan') } }}>
        ${icon('arrow')}查看完整照護路徑
      </button>
    </section>
  `;
}

function residentHome(): SafeHtml {
  return html`
    ${residentFamilyHealthCard()}
    ${residentAiAssistantCard()}
    <div class="task-list">
      ${residentTask('填家訪問卷', '還差生活習慣與交通協助', '12 分鐘', 'clipboard')}
      ${residentTask('預約健檢', '6/18 上午還有名額', '可預約', 'calendar')}
      ${residentTask('查看結果', '爸爸血糖需追蹤', '需回覆', 'lab')}
    </div>
    ${residentHealthPathPreview()}
    ${residentConsentCard()}
  `;
}

function residentFamilyDesignPlan(): SafeHtml {
  const pillars: readonly (readonly [string, string, number])[] = [
    ['慢病追蹤', '爸爸晚餐後步行與血糖紀錄，由家人協助打卡。', 68],
    ['肺健康', '補齊吸菸年數，健檢時確認 LDCT 條件。', 44],
    ['到檢協助', '健檢前一天確認交通、陪同者與空腹提醒。', 82],
  ];
  return html`
    <section class="resident-card family-design-card">
      <div class="resident-card-head">
        <div>
          <h3>家庭健康設計</h3>
          <p>照護團隊已把家訪與健檢資料整理成家人可一起完成的照護安排。</p>
        </div>
        <span class="status-pill green">已啟用</span>
      </div>
      <div class="resident-module-list friendly-module-list">
        ${pillars.map(
          ([title, desc, percent]) => html`
            <div class="resident-module friendly-module">
              <span class="module-code">${title.slice(0, 1)}</span>
              <span class="module-copy">
                <strong>${title}</strong>
                <small>${desc}</small>
                <span class="mini-meter"><span style="width:${percent}%"></span></span>
              </span>
            </div>
          `,
        )}
      </div>
      <div class="dimension-grid all-dimensions">
        ${protocolDimensions.map(
          ([label, detail, percent]) => html`
            <div class="dimension-chip">
              <strong>${label}</strong>
              <span>${detail}</span>
              <i><b style="width:${percent}%"></b></i>
            </div>
          `,
        )}
      </div>
    </section>
  `;
}

function residentCarePlan(): SafeHtml {
  return html`
    <div class="resident-plan">
      ${residentAiAssistantCard()}
      <section class="resident-card care-path-card">
        <div class="resident-card-head">
          <div>
            <h3>個人健康路徑設計</h3>
            <p>把「要做什麼、什麼時候做、誰協助」整理成一條路徑</p>
          </div>
          <span class="status-pill green">已建立</span>
        </div>
        <div class="path-timeline">
          ${residentTimeline('1', '先補完整問卷', '確認家族史、吸菸年數、交通協助', '今天', 'done')}
          ${residentTimeline('2', '完成分齡健檢', '成人健檢、血糖血脂、肝腎功能與癌篩條件', '6/18', 'active')}
          ${residentTimeline('3', '檢驗結果追蹤', '血糖偏高由護理師電話追蹤，必要時安排門診', '2 週內', '')}
          ${residentTimeline('4', '家庭健康回饋', '一起更新慢病、肺健康、到檢協助', '1 個月', '')}
        </div>
      </section>
      ${residentFamilyDesignPlan()}
    </div>
  `;
}

function residentSurvey(): SafeHtml {
  const steps: readonly (readonly [string, readonly string[]])[] = [
    ['家裡最想先處理哪件健康問題？', ['長輩跌倒或走路不穩', '血壓血糖或拿藥', '肺部/癌症篩檢', '孩子視力或牙齒', '就醫交通']],
    ['健檢當天需要什麼協助？', ['電話提醒', '交通接送', '家屬陪同', '族語協助', '輪椅或行動協助']],
    ['是否同意照護團隊追蹤健檢異常？', ['同意電話追蹤', '同意家訪追蹤', '先由家屬聯絡', '暫不同意']],
    ['家庭健康目標', ['先完成全家健檢', '控制血壓血糖', '戒菸/戒檳/減酒', '改善長輩居家安全']],
  ];
  const step = getState().residentStep;
  const [question, options] = steps[step] ?? steps[0]!;
  return html`
    <div class="wizard">
      <section class="resident-card ai-resident-card inline-ai">
        <div class="resident-card-head">
          <div>
            <h3>AI問卷助理</h3>
            <p>會把答案整理成家訪摘要、照護待辦與家庭健康模組。</p>
          </div>
        </div>
      </section>
      <div class="stepper">
        ${steps.map((_, i) => html`<span class="step ${i <= step ? 'active' : ''}"></span>`)}
      </div>
      <h2>${question}</h2>
      <div class="option-grid">
        ${options.map((o) => html`<label class="choice"><input type="checkbox" />${o}</label>`)}
      </div>
      <div style="display:flex; gap:8px">
        <button class="ghost-btn" ${{ on: { click: () => prevResidentStep() } }}>上一步</button>
        <button class="btn" ${{ on: { click: () => nextResidentStep() } }}>下一步</button>
      </div>
    </div>
  `;
}

function residentSchedule(): SafeHtml {
  const times = ['6/18 上午 08:30', '6/18 下午 13:30', '6/19 上午 09:00'];
  return html`
    <div class="task-list">
      <div class="info-block">
        <h3>可預約時段</h3>
        <div class="check-list">
          ${times.map(
            (time) => html`
              <button class="check-item" ${{ on: { click: () => showToast(`已選擇 ${time}`) } }}>
                <span class="box">${icon('calendar')}</span>
                <div>${time}<div class="minor">東清活動中心</div></div>
                <span class="status-pill">選擇</span>
              </button>
            `,
          )}
        </div>
      </div>
      <button class="btn" ${{ on: { click: () => showToast('已送出預約需求') } }}>${icon('check')}送出預約</button>
    </div>
  `;
}

function residentResults(): SafeHtml {
  return html`
    <div class="task-list">
      <section class="resident-card ai-resident-card inline-ai">
        <div class="resident-card-head">
          <div>
            <h3>AI結果助理</h3>
            <p>把檢驗值翻成看得懂的追蹤重點，並自動提醒護理師。</p>
          </div>
          <span class="status-pill yellow">需追蹤</span>
        </div>
      </section>
      <div class="task-card"><div class="task-icon">${icon('alert')}</div><div><strong>爸爸：血糖偏高</strong><div class="minor">請 2 週內由護理師電話追蹤，先不用緊張。</div></div><span class="status-pill yellow">需追蹤</span></div>
      <div class="task-card"><div class="task-icon">${icon('check')}</div><div><strong>媽媽：尿液正常</strong><div class="minor">維持喝水與規律回診。</div></div><span class="status-pill green">正常</span></div>
      <div class="task-card"><div class="task-icon">${icon('calendar')}</div><div><strong>LDCT 條件待確認</strong><div class="minor">需補填吸菸年數和家族史。</div></div><span class="status-pill">補資料</span></div>
    </div>
  `;
}

function renderResidentBody(): SafeHtml {
  switch (getState().residentTab) {
    case 'plan':
      return residentCarePlan();
    case 'survey':
      return residentSurvey();
    case 'schedule':
      return residentSchedule();
    case 'results':
      return residentResults();
    default:
      return residentHome();
  }
}

export function renderResident(): SafeHtml {
  return html`
    <main class="resident-wrap">
      <nav class="resident-web-nav" aria-label="民眾端主選單">
        ${residentNav('home', 'home', '首頁')}
        ${residentNav('plan', 'users', '照護')}
        ${residentNav('survey', 'clipboard', '問卷')}
        ${residentNav('schedule', 'calendar', '預約')}
        ${residentNav('results', 'lab', '結果')}
      </nav>
      <section class="phone">
        <div class="phone-top">
          <div>
            <h2 class="phone-title">我的家庭健康</h2>
            <div class="minor">東清部落 H-014</div>
          </div>
          <span class="status-pill green">已同意</span>
        </div>
        <div class="phone-body">${renderResidentBody()}</div>
        ${appFooter()}
        <nav class="bottom-nav">
          ${residentNav('home', 'home', '首頁')}
          ${residentNav('plan', 'users', '照護')}
          ${residentNav('survey', 'clipboard', '問卷')}
          ${residentNav('schedule', 'calendar', '預約')}
          ${residentNav('results', 'lab', '結果')}
        </nav>
      </section>
    </main>
  `;
}
