const agePackages = [
  {
    band: "0-未滿 1 歲",
    trigger: (age) => age < 1,
    core: ["生長曲線", "餵食與營養", "心肺腹理學", "髖關節", "神經發展", "聽力/視覺初篩", "口腔萌牙衛教", "疫苗盤點"],
    labs: ["依風險加做貧血/鉛暴露"],
    modules: ["兒童預防保健", "早療轉介"],
  },
  {
    band: "1-6 歲",
    trigger: (age) => age >= 1 && age <= 6,
    core: ["身高體重與生長曲線", "發展里程碑", "視力/聽力", "口腔與塗氟", "營養與睡眠", "安全與事故預防", "疫苗盤點"],
    labs: ["依貧血、鉛暴露、營養或慢病風險加做"],
    modules: ["兒童預防保健", "早療/牙科轉介"],
  },
  {
    band: "7-12 歲",
    trigger: (age) => age >= 7 && age <= 12,
    core: ["身高體重 BMI", "血壓", "視力/聽力", "口腔", "脊柱四肢", "尿液", "學習與睡眠"],
    labs: ["肥胖或家族史加血脂/血糖"],
    modules: ["學生健檢", "視力牙科追蹤"],
  },
  {
    band: "13-18 歲",
    trigger: (age) => age >= 13 && age <= 18,
    core: ["BMI/血壓", "視力/聽力/口腔", "脊柱與運動傷害", "心理與睡眠", "菸酒檳榔/物質使用", "性健康與疫苗盤點"],
    labs: ["肥胖、家族史、月經量多或症狀時加做 CBC/血糖/血脂"],
    modules: ["青少年健康", "心理支持與校園轉介"],
  },
  {
    band: "19-29 歲",
    trigger: (age) => age >= 19 && age <= 29,
    core: ["BMI/腰圍", "血壓", "視力口腔", "心理與睡眠", "疫苗盤點", "生殖健康", "菸酒檳榔"],
    labs: ["抽血依肥胖、家族史、症狀或高風險加做"],
    modules: ["青壯年輕量版", "健康行為支持"],
  },
  {
    band: "30-39 歲",
    trigger: (age) => age >= 30 && age <= 39,
    core: ["成人預防保健", "血壓/BMI/腰圍", "血糖", "血脂", "肝腎功能", "尿液", "子宮頸抹片(女性)"],
    labs: ["Glucose AC", "Total-C", "LDL", "HDL", "TG", "ALT", "Creatinine", "Urine protein"],
    modules: ["成人 A+ 版", "口腔黏膜(菸檳)"],
  },
  {
    band: "40-44 歲",
    trigger: (age) => age >= 40 && age <= 44,
    core: ["成人預防保健", "血壓/BMI/腰圍", "血糖", "血脂", "肝腎功能", "尿液", "B/C 肝終身一次", "子宮頸抹片(女性)"],
    labs: ["Glucose AC", "HbA1c", "Lipid profile", "ALT", "Creatinine/eGFR", "HBsAg", "Anti-HCV", "Urinalysis"],
    modules: ["成人 A+ 版", "肝炎與代謝風險"],
  },
  {
    band: "45-49 歲",
    trigger: (age) => age >= 45 && age <= 49,
    core: ["成人預防保健", "FIT", "乳房攝影(女性)", "子宮頸抹片", "口腔癌風險篩檢", "B/C 肝終身一次"],
    labs: ["Glucose AC", "HbA1c", "Lipid profile", "ALT", "Creatinine", "HBsAg", "Anti-HCV"],
    modules: ["成人 A+ 版", "癌篩與肺健康"],
  },
  {
    band: "50-54 歲",
    trigger: (age) => age >= 50 && age <= 54,
    core: ["成人預防保健", "FIT", "乳房攝影(女性)", "子宮頸抹片", "口腔癌風險篩檢", "慢病風險盤點", "LDCT 條件初篩"],
    labs: ["CBC", "Glucose AC", "HbA1c", "Lipid profile", "ALT", "Creatinine/eGFR", "Uric acid", "Urinalysis"],
    modules: ["成人 B 版", "癌篩與慢病預防"],
  },
  {
    band: "55-64 歲",
    trigger: (age) => age >= 55 && age <= 64,
    core: ["原住民每年成人預防保健", "癌篩依條件", "慢病控制", "腎病/心血管風險", "聽力視力口腔", "簡版高齡功能"],
    labs: ["CBC", "Glucose AC", "HbA1c", "Lipid profile", "ALT", "Creatinine/eGFR", "Uric acid", "TSH", "HBsAg", "Anti-HCV", "Urinalysis"],
    modules: ["成人 B 版", "LDCT 高風險分流", "慢病穩定"],
  },
  {
    band: "65-74 歲",
    trigger: (age) => age >= 65 && age <= 74,
    core: ["每年成人預防保健", "FIT/乳攝/LDCT 依條件", "ICOPE 六力", "跌倒風險", "用藥整合", "骨質疏鬆(女性)"],
    labs: ["CBC", "Glucose AC", "HbA1c", "Lipid profile", "ALT", "Creatinine/eGFR", "Urinalysis", "TSH"],
    modules: ["高齡整合版", "長照/復能", "居家安全"],
  },
  {
    band: "75-84 歲",
    trigger: (age) => age >= 75 && age <= 84,
    core: ["成人預防保健個別化", "ICOPE 六力", "ADL/IADL", "跌倒風險", "營養/吞嚥", "用藥整合", "認知與憂鬱", "照顧者負荷"],
    labs: ["CBC", "Glucose AC/HbA1c", "Creatinine/eGFR", "Electrolytes", "Urinalysis", "TSH 依症狀或用藥"],
    modules: ["高齡整合版", "長照/復能", "照顧者支持"],
  },
  {
    band: "85 歲以上",
    trigger: (age) => age >= 85,
    core: ["ADL/IADL", "跌倒", "失智/譫妄", "憂鬱", "營養吞嚥", "口腔", "疼痛", "用藥減量", "照顧負荷"],
    labs: ["症狀導向檢查", "用藥安全必要項目"],
    modules: ["高齡整合版", "照顧者支持", "預立醫療照護諮商"],
  },
];

const patients = [
  {
    id: "P-00018",
    household: "H-東清-014",
    name: "夏曼・明義",
    displayName: "夏曼・明義",
    age: 62,
    sex: "男",
    village: "東清",
    phone: "09xx-123-018",
    consent: "已同意",
    identity: "達悟/雅美",
    contact: "女兒 李小姐",
    risk: 86,
    level: "橘",
    tags: ["P1 健檢優先", "P2 慢病", "P3 LDCT", "P9 交通"],
    householdTags: ["H2 慢病穩定", "H3 肺健康", "H8 醫療可近性"],
    conditions: ["高血壓", "糖尿病", "吸菸 22 包-年", "B 肝結果未知"],
    questionnaire: {
      transport: "需親友載送；颱風季曾延誤回診",
      householdGoal: "希望先完成健檢和肺部檢查，並把血糖穩定下來。",
      alert: "近三個月偶爾久咳，無咳血。",
      home: "三代同住，主要聯絡人為女兒。",
    },
    labs: [
      ["Glucose AC", "空腹血糖", 142, "mg/dL", "70-99", "high"],
      ["HbA1c", "糖化血色素", 7.8, "%", "<5.7", "high"],
      ["LDL", "低密度脂蛋白", 154, "mg/dL", "<130", "high"],
      ["ALT", "肝功能 ALT", 38, "U/L", "<41", "ok"],
      ["Creatinine", "肌酸酐", 1.1, "mg/dL", "0.7-1.3", "ok"],
      ["Anti-HCV", "C 肝抗體", "未檢", "", "陰性", "pending"],
    ],
  },
  {
    id: "P-00042",
    household: "H-野銀-032",
    name: "希婻・阿美",
    displayName: "希婻・阿美",
    age: 73,
    sex: "女",
    village: "野銀",
    phone: "09xx-771-042",
    consent: "已同意",
    identity: "達悟/雅美",
    contact: "媳婦 陳小姐",
    risk: 78,
    level: "黃",
    tags: ["P1 健檢優先", "P6 高齡功能", "P5 口腔"],
    householdTags: ["H4 高齡安全", "H7 口腔照護"],
    conditions: ["跌倒一次", "咀嚼困難", "血壓未規則追蹤"],
    questionnaire: {
      transport: "可由媳婦陪同，上午較適合。",
      householdGoal: "希望改善走路不穩和假牙問題。",
      alert: "無急迫警訊。",
      home: "高齡夫妻與兒子同住，浴室無扶手。",
    },
    labs: [
      ["Hb", "血紅素", 11.2, "g/dL", "12-16", "low"],
      ["Creatinine", "肌酸酐", 0.9, "mg/dL", "0.5-1.1", "ok"],
      ["LDL", "低密度脂蛋白", 128, "mg/dL", "<130", "ok"],
      ["TSH", "甲狀腺刺激素", 4.9, "uIU/mL", "0.4-4.0", "high"],
      ["Urine protein", "尿蛋白", "±", "", "陰性", "watch"],
    ],
  },
  {
    id: "P-00107",
    household: "H-紅頭-009",
    name: "周小恩",
    displayName: "周小恩",
    age: 9,
    sex: "女",
    village: "紅頭",
    phone: "家長 09xx-331-107",
    consent: "家長同意",
    identity: "達悟/雅美",
    contact: "母親 周小姐",
    risk: 41,
    level: "綠",
    tags: ["P7 兒少", "視力追蹤"],
    householdTags: ["H5 兒少發展"],
    conditions: ["近視疑慮", "齲齒未回診"],
    questionnaire: {
      transport: "學校通知即可，家長可陪同牙科。",
      householdGoal: "補做牙科和視力追蹤。",
      alert: "無急迫警訊。",
      home: "核心家庭，家長可配合 LINE 通知。",
    },
    labs: [
      ["Urinalysis", "尿液", "正常", "", "正常", "ok"],
      ["BMI", "BMI 百分位", "P82", "", "P5-P85", "ok"],
    ],
  },
  {
    id: "P-00188",
    household: "H-朗島-021",
    name: "郭海蘭",
    displayName: "郭海蘭",
    age: 34,
    sex: "女",
    village: "朗島",
    phone: "09xx-560-188",
    consent: "待補簽",
    identity: "達悟/雅美",
    contact: "本人",
    risk: 55,
    level: "黃",
    tags: ["P8 孕產婦", "P9 可近性"],
    householdTags: ["H6 孕產婦", "H8 醫療可近性"],
    conditions: ["孕 22 週", "產檢需船班配合"],
    questionnaire: {
      transport: "遇天候不穩需協調產檢與視訊。",
      householdGoal: "希望確保產檢時程與產後支持。",
      alert: "無出血或腹痛。",
      home: "夫妻同住，婆婆可協助照顧。",
    },
    labs: [
      ["Hb", "血紅素", 10.8, "g/dL", "孕期依週數", "watch"],
      ["Glucose", "妊娠糖尿篩檢", "待安排", "", "依產檢", "pending"],
    ],
  },
];

const villageNames = ["東清", "野銀", "朗島", "紅頭", "漁人", "椰油"];

const householdModules = [
  ["H1", "健檢到檢動員", "家庭健檢日曆、提醒、交通、陪同、空腹提醒"],
  ["H2", "慢病穩定", "血壓血糖紀錄、拿藥提醒、共同飲食策略"],
  ["H3", "癌篩與肺健康", "癌篩名單、LDCT 分流、戒菸戒檳、結果追蹤"],
  ["H4", "高齡安全與長照", "居家安全、長照申請、復能、照顧者支持"],
  ["H5", "兒少發展與家庭支持", "兒童健檢、早療、視力牙科、學校支持"],
  ["H6", "孕產婦與嬰幼兒", "產檢、產後心理、兒童預防保健、疫苗"],
  ["H7", "口腔與檳榔減害", "口腔檢查、牙科巡診、戒檳衛教"],
  ["H8", "醫療可近性", "交通/船班協調、遠距、巡迴、陪診、藥事服務"],
  ["H9", "環境健康溝通", "環境健康說明、檢查結果解讀、風險溝通"],
  ["H10", "照顧者支持", "喘息、長照、心理支持、照顧技巧"],
];

const piiFields = [
  ["姓名", "身分證/替代識別碼", "生日", "性別"],
  ["村別與地址", "聯絡電話", "緊急聯絡人", "主要照顧者"],
  ["同意書版本", "資料使用範圍", "撤回同意紀錄", "權限稽核"],
];

const questionnaireSections = [
  ["家戶資料", "家戶成員、照顧者、常住狀態、語言需求"],
  ["可近性", "交通、船班/天候、到檢協助、通知方式"],
  ["個人健康", "疾病史、用藥、警訊症狀、眼牙口腔"],
  ["預防保健", "兒童健檢、成人健檢、疫苗、癌篩、B/C 肝、TB"],
  ["生活與暴露", "菸酒檳榔、飲食、睡眠、工作與環境疑慮"],
  ["年齡別模組", "兒少、孕產婦、LDCT、高齡功能、照顧者壓力"],
];

function getInitialRole() {
  const params = new URLSearchParams(window.location.search);
  const requestedRole = params.get("role") || window.location.hash.replace("#", "");
  return requestedRole === "resident" ? "resident" : "clinical";
}

const state = {
  role: getInitialRole(),
  selectedId: patients[0].id,
  tab: "overview",
  query: "",
  residentTab: "home",
  residentStep: 0,
  toast: "",
};

const icon = (name) => `<svg class="icon"><use href="#icon-${name}"></use></svg>`;
const app = document.querySelector("#app");

function packageForAge(age) {
  return agePackages.find((item) => item.trigger(age)) || {
    band: "需人工確認",
    core: ["年齡資料異常，請先確認生日或戶籍資料"],
    labs: ["暫不自動排檢"],
    modules: ["資料品質檢核"],
  };
}

function jsArg(value) {
  return JSON.stringify(value);
}

function selectedPatient() {
  return patients.find((p) => p.id === state.selectedId) || patients[0];
}

function setRole(role) {
  if (!["clinical", "resident"].includes(role)) return;
  state.role = role;
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.delete("role");
  nextUrl.hash = role;
  window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  render();
}

function setTab(tab) {
  state.tab = tab;
  render();
}

function setResidentTab(tab) {
  state.residentTab = tab;
  render();
}

function setVillage(village) {
  const match = patients.find((p) => p.village === village);
  state.query = state.query === village ? "" : village;
  if (match && state.query) state.selectedId = match.id;
  showToast(state.query ? `已篩選 ${village} 名冊` : "已清除村別篩選");
}

function selectVisualPatient(id, tab = state.tab) {
  state.selectedId = id;
  state.query = "";
  if (tab) state.tab = tab;
  render();
}

function selectAgePackage(index) {
  const target = agePackages[index];
  const match = patients.find((p) => packageForAge(p.age).band === target.band);
  state.tab = "checkup";
  if (match) {
    state.selectedId = match.id;
    state.query = "";
    render();
    return;
  }
  showToast(`${target.band} 目前無示範個案`);
}

function showToast(message) {
  state.toast = message;
  render();
  window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

function topbar() {
  return `
    <header class="topbar">
      <div class="brand">
        <img class="company-logo" src="./assets/the-one-ai-logo.png" alt="The One AI 本一科技 Logo" />
        <div>
          <h1 class="brand-title">Ayoi蘭嶼健康行動—護理健康到您家APP</h1>
          <p class="brand-subtitle">The One AI 本一科技｜家戶圖譜、全齡健檢、檢驗值與家庭健康設計模組</p>
        </div>
      </div>
      <div class="role-switch" aria-label="角色切換">
        <button data-role="clinical" class="${state.role === "clinical" ? "active" : ""}">${icon("lab")}醫療/護理端</button>
        <button data-role="resident" class="${state.role === "resident" ? "active" : ""}">${icon("home")}民眾端</button>
      </div>
      <div class="utility-actions">
        <button class="ghost-btn" onclick="showToast('已建立離線草稿，回到有網路時同步')">${icon("shield")}離線模式</button>
        <button class="btn" onclick="showToast('本原型已模擬儲存')">${icon("check")}儲存</button>
      </div>
    </header>
  `;
}

function appFooter() {
  return `
    <footer class="app-footer" aria-label="版權資訊">
      <div class="footer-brand">
        <img class="footer-logo" src="./assets/the-one-ai-logo.png" alt="The One AI 本一科技 Logo" />
        <div>
          <strong>The One AI 本一科技</strong>
          <span>Copyright © 2026 The One AI 本一科技 版權所有</span>
        </div>
      </div>
      <div class="footer-note">Ayoi蘭嶼健康行動—護理健康到您家APP 原型</div>
    </footer>
  `;
}

function renderClinical() {
  const patient = selectedPatient();
  return `
    <main class="layout">
      <nav class="rail" aria-label="醫護端主選單">
        ${railButton("overview", "home", "總覽")}
        ${railButton("questionnaire", "clipboard", "問卷")}
        ${railButton("checkup", "users", "健檢")}
        ${railButton("labs", "lab", "檢驗")}
        ${railButton("triage", "alert", "分流")}
      </nav>
      ${renderQueue()}
      <section class="workspace">
        ${renderStats()}
        <article class="panel record">
          ${renderRecordHero(patient)}
          ${renderTabs()}
          <div class="tab-body">${renderTabBody(patient)}</div>
        </article>
      </section>
      ${renderRightPanel(patient)}
    </main>
  `;
}

function railButton(tab, iconName, label) {
  return `<button class="${state.tab === tab ? "active" : ""}" title="${label}" onclick="setTab('${tab}')">${icon(iconName)}</button>`;
}

function renderStats() {
  const stats = [
    ["今日家訪", "18", "完成 12 / 未遇 4 / 需再訪 2", 67, "questionnaire"],
    ["健檢名冊", "642", "已同意 71%", 71, "checkup"],
    ["需優先追蹤", "39", "P0/P1/P6/P9", 39, "triage"],
    ["檢驗異常待簽核", "27", "高風險 8 件", 27, "labs"],
  ];
  return `
    <div class="stats-grid">
      ${stats.map(([label, value, note, percent, tab]) => `
        <button class="stat" onclick='setTab(${jsArg(tab)})'>
          <div class="stat-label">${label}</div>
          <div class="stat-value">${value}</div>
          <div class="stat-meter"><span style="width:${percent}%"></span></div>
          <small>${note}</small>
        </button>
      `).join("")}
    </div>
  `;
}

function renderQueue() {
  const filtered = patients.filter((p) => `${p.name}${p.village}${p.tags.join("")}`.includes(state.query));
  return `
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
        ${icon("search")}
        <input value="${state.query}" oninput="state.query=this.value; render()" placeholder="搜尋姓名、村別、分流標籤" />
      </div>
      <div class="patient-list">
        ${filtered.map((p) => `
          <button class="patient-card ${p.id === state.selectedId ? "active" : ""}" onclick="state.selectedId='${p.id}'; render()">
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
              <span class="status-pill ${p.level === "橘" ? "yellow" : p.level === "紅" ? "red" : "green"}">${p.level}</span>
            </div>
            <div class="tag-row">${p.tags.slice(0, 3).map((t) => `<span class="tag ${t.includes("P0") ? "urgent" : t.includes("P1") ? "warn" : ""}">${t}</span>`).join("")}</div>
          </button>
        `).join("") || `<div class="empty-state">沒有符合條件的個案</div>`}
      </div>
    </aside>
  `;
}

function renderRecordHero(patient) {
  return `
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

function renderTabs() {
  const tabs = [
    ["overview", "家戶總覽"],
    ["questionnaire", "家訪問卷"],
    ["checkup", "分齡健檢"],
    ["labs", "檢驗值"],
    ["triage", "分流與設計"],
  ];
  return `<div class="tabs">${tabs.map(([key, label]) => `<button class="${state.tab === key ? "active" : ""}" onclick="setTab('${key}')">${label}</button>`).join("")}</div>`;
}

function renderTabBody(patient) {
  if (state.tab === "questionnaire") return renderQuestionnaire(patient);
  if (state.tab === "checkup") return renderCheckup(patient);
  if (state.tab === "labs") return renderLabs(patient);
  if (state.tab === "triage") return renderTriage(patient);
  return renderOverview(patient);
}

function renderOverview(patient) {
  return `
    <div class="section-grid">
      ${renderVisualOverview(patient)}
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
          <dt>村別</dt><dd>${patient.village}</dd>
          <dt>家戶狀態</dt><dd>${patient.questionnaire.home}</dd>
          <dt>到檢阻礙</dt><dd>${patient.questionnaire.transport}</dd>
          <dt>家庭目標</dt><dd>${patient.questionnaire.householdGoal}</dd>
        </dl>
      </div>
      <div class="check-block wide">
        <h3>本案必收資料欄位</h3>
        <div class="schema-grid">
          ${schemaCard("個資", piiFields[0].concat(piiFields[1]))}
          ${schemaCard("家戶", ["家戶編號", "成員 roster", "照顧者", "交通可近性", "居住安全", "家庭健康目標"])}
          ${schemaCard("健檢/檢驗", ["年齡層方案", "檢查項目", "檢驗值", "正常範圍", "異常旗標", "報告日期"])}
          ${schemaCard("照護", ["P0-P9 個人分流", "H1-H10 家庭模組", "追蹤期限", "轉介去向", "完成狀態"])}
        </div>
      </div>
    </div>
  `;
}

function renderVisualOverview(patient) {
  const sortedByAge = [...patients].sort((a, b) => a.age - b.age);
  return `
    <div class="visual-suite wide">
      <section class="visual-panel visual-villages">
        <div class="visual-head"><strong>六村熱點</strong><span>${state.query || patient.village}</span></div>
        <div class="village-map">
          ${villageNames.map((village) => {
            const count = patients.filter((p) => p.village === village).length;
            const active = state.query === village || (!state.query && patient.village === village);
            return `
              <button class="village-node ${active ? "active" : ""}" style="--heat:${Math.max(0.28, count * 0.34)}" onclick='setVillage(${jsArg(village)})'>
                <span class="village-orb"></span>
                <strong>${village}</strong>
                <small>${count || 0} 戶</small>
              </button>
            `;
          }).join("")}
        </div>
      </section>
      <section class="visual-panel visual-risk">
        <div class="visual-head"><strong>個案風險流</strong><span>${patient.risk}/100</span></div>
        <div class="risk-flow">
          ${[...patients].sort((a, b) => b.risk - a.risk).map((p) => `
            <button class="risk-row ${p.id === patient.id ? "active" : ""}" onclick='selectVisualPatient(${jsArg(p.id)}, "triage")'>
              <span>${p.displayName}</span>
              <span class="risk-track"><span style="width:${p.risk}%"></span></span>
              <strong>${p.risk}</strong>
            </button>
          `).join("")}
        </div>
      </section>
      <section class="visual-panel visual-age">
        <div class="visual-head"><strong>分齡軌道</strong><span>${packageForAge(patient.age).band}</span></div>
        <div class="age-rail">
          ${sortedByAge.map((p) => `
            <button class="age-pin ${p.id === patient.id ? "active" : ""}" style="left:${Math.min(94, Math.max(4, (p.age / 90) * 100))}%" onclick='selectVisualPatient(${jsArg(p.id)}, "checkup")'>
              <span>${p.age}</span>
              <small>${p.village}</small>
            </button>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function schemaCard(title, items) {
  return `<div class="schema-card"><h4>${title}</h4><ul>${items.slice(0, 6).map((i) => `<li>${i}</li>`).join("")}</ul></div>`;
}

function renderQuestionnaire(patient) {
  return `
    <div class="section-grid">
      <div class="field-block wide">
        <h3>家訪問卷快速填寫</h3>
        <div class="field-grid">
          <div class="field"><label>訪視方式</label><select><option>面訪</option><option>電話</option><option>第二次補訪</option></select></div>
          <div class="field"><label>語言需求</label><select><option>國語可溝通</option><option>需族語協助</option><option>家屬協助</option></select></div>
          <div class="field"><label>可通知方式</label><select><option>電話 + LINE</option><option>村辦通知</option><option>家屬代收</option></select></div>
          <div class="field"><label>家庭最擔心問題</label><input value="${patient.questionnaire.householdGoal}" /></div>
          <div class="field"><label>到檢協助</label><input value="${patient.questionnaire.transport}" /></div>
          <div class="field"><label>急迫警訊</label><input value="${patient.questionnaire.alert}" /></div>
        </div>
      </div>
      ${questionnaireSections.map(([title, detail]) => `
        <div class="check-block">
          <h3>${title}</h3>
          <div class="check-item">
            <span class="box">${icon("check")}</span>
            <div>${detail}<div class="minor">已納入資料欄位</div></div>
            <span class="status-pill green">完成</span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderCheckup(patient) {
  const pkg = packageForAge(patient.age);
  return `
    <div class="section-grid">
      ${renderAgePackageRail(patient)}
      <div class="info-block">
        <h3>系統自動判斷年齡層</h3>
        <dl class="kv">
          <dt>年齡</dt><dd>${patient.age} 歲</dd>
          <dt>方案</dt><dd>${pkg.band}</dd>
          <dt>主模組</dt><dd>${pkg.modules.join("、")}</dd>
        </dl>
      </div>
      <div class="info-block">
        <h3>分齡原則</h3>
        <p class="minor">0-18 歲不套成人抽血包；30 歲以上接成人預防保健；55 歲以上原住民每年評估；75 歲以上癌篩個別化。</p>
      </div>
      <div class="check-block">
        <h3>核心檢查</h3>
        <div class="check-list">${pkg.core.map((item) => checkItem(item, "安排")).join("")}</div>
      </div>
      <div class="check-block">
        <h3>檢驗/影像/篩檢</h3>
        <div class="check-list">${pkg.labs.map((item) => checkItem(item, "待排")).join("")}</div>
      </div>
    </div>
  `;
}

function renderAgePackageRail(patient) {
  const activeBand = packageForAge(patient.age).band;
  return `
    <div class="visual-panel age-package-panel wide">
      <div class="visual-head"><strong>全齡健檢軌道</strong><span>${activeBand}</span></div>
      <div class="age-package-grid">
        ${agePackages.map((pkg, index) => {
          const hasSample = patients.some((p) => packageForAge(p.age).band === pkg.band);
          return `
            <button class="age-package ${pkg.band === activeBand ? "active" : ""} ${hasSample ? "has-sample" : ""}" onclick="selectAgePackage(${index})">
              <span>${pkg.band}</span>
              <small>${pkg.modules[0]}</small>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function checkItem(text, status) {
  return `<div class="check-item"><span class="box">${icon("check")}</span><div>${text}</div><span class="status-pill">${status}</span></div>`;
}

function renderLabs(patient) {
  return `
    <div class="section-grid">
      ${renderLabVisual(patient)}
      <div class="field-block wide">
        <h3>檢驗值輸入與異常旗標</h3>
        <table class="lab-table">
          <thead><tr><th>代碼</th><th>項目</th><th>值</th><th>單位</th><th>參考</th><th>狀態</th></tr></thead>
          <tbody>
            ${patient.labs.map((lab) => `
              <tr>
                <td class="num">${lab[0]}</td>
                <td>${lab[1]}</td>
                <td><input class="lab-input" value="${lab[2]}" onchange="showToast('已更新 ${lab[1]}')" /></td>
                <td>${lab[3]}</td>
                <td>${lab[4]}</td>
                <td>${labStatus(lab[5])}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderLabVisual(patient) {
  const totals = patient.labs.reduce((acc, lab) => {
    acc[lab[5]] = (acc[lab[5]] || 0) + 1;
    return acc;
  }, {});
  return `
    <div class="visual-panel lab-visual-panel wide">
      <div class="visual-head"><strong>檢驗狀態圖</strong><span>異常 ${((totals.high || 0) + (totals.low || 0) + (totals.watch || 0))}/${patient.labs.length}</span></div>
      <div class="lab-orbit">
        ${patient.labs.map((lab) => `
          <button class="lab-bubble ${lab[5]}" onclick='showToast(${jsArg(`${lab[1]}：${lab[2]}${lab[3]}`)})'>
            <strong>${lab[0]}</strong>
            <span>${lab[2]}${lab[3]}</span>
            ${labStatus(lab[5])}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function labStatus(status) {
  const map = {
    high: ["red", "偏高"],
    low: ["yellow", "偏低"],
    watch: ["yellow", "觀察"],
    pending: ["", "待補"],
    ok: ["green", "正常"],
  };
  const [cls, label] = map[status] || ["", "待判"];
  return `<span class="status-pill ${cls}">${label}</span>`;
}

function renderTriage(patient) {
  return `
    <div class="section-grid">
      <div class="check-block">
        <h3>個人分流標籤</h3>
        <div class="check-list">${patient.tags.map((tag) => checkItem(tag, tag.includes("P1") ? "優先" : "追蹤")).join("")}</div>
      </div>
      <div class="check-block">
        <h3>家庭健康設計模組</h3>
        <div class="check-list">${patient.householdTags.map((tag) => checkItem(tag, "啟用")).join("")}</div>
      </div>
      <div class="field-block wide">
        <h3>模組庫 H1-H10</h3>
        <table class="module-table">
          <thead><tr><th>模組</th><th>名稱</th><th>設計重點</th></tr></thead>
          <tbody>${householdModules.map((m) => `<tr><td class="num">${m[0]}</td><td>${m[1]}</td><td>${m[2]}</td></tr>`).join("")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderRightPanel(patient) {
  return `
    <aside class="right-panel">
      <section class="panel">
        <div class="panel-header"><div><h2 class="panel-title">下一步</h2><p class="panel-note">現場可直接執行</p></div></div>
        <div class="action-list">
          <button class="btn" onclick="showToast('已加入今日健檢排程')">${icon("calendar")}安排健檢</button>
          <button class="ghost-btn" onclick="showToast('已建立轉介單草稿')">${icon("arrow")}建立轉介</button>
          <button class="ghost-btn" onclick="showToast('已傳送家屬提醒')">${icon("check")}通知聯絡人</button>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header"><div><h2 class="panel-title">個資權限</h2><p class="panel-note">L4 一線可視範圍</p></div></div>
        <div class="privacy-line">${icon("shield")}<div>僅顯示已同意且分派個案。匯出、列印與跨機構傳送需主管簽核。</div></div>
        <div class="privacy-line">${icon("check")}<div>同意狀態：${patient.consent}。可撤回與改版重簽需留稽核紀錄。</div></div>
      </section>
      <section class="panel">
        <div class="panel-header"><div><h2 class="panel-title">資料品質</h2><p class="panel-note">缺漏欄位</p></div></div>
        <div class="action-list">
          <div class="action-item"><strong>B/C 肝結果</strong><span class="minor">需抽血或查核既有紀錄</span></div>
          <div class="action-item"><strong>LDCT 條件</strong><span class="minor">包-年與一等親肺癌家族史需確認</span></div>
        </div>
      </section>
    </aside>
  `;
}

function renderResident() {
  return `
    <main class="resident-wrap">
      <section class="phone">
        <div class="phone-top">
          <div>
            <h2 class="phone-title">我的家庭健康</h2>
            <div class="minor">東清村 H-014</div>
          </div>
          <span class="status-pill green">已同意</span>
        </div>
        <div class="phone-body">${renderResidentBody()}</div>
        <nav class="bottom-nav">
          ${residentNav("home", "home", "首頁")}
          ${residentNav("survey", "clipboard", "問卷")}
          ${residentNav("schedule", "calendar", "預約")}
          ${residentNav("results", "lab", "結果")}
        </nav>
      </section>
      <aside class="resident-side">
        <section class="panel">
          <div class="panel-header"><div><h2 class="panel-title">民眾端設計重點</h2><p class="panel-note">避免醫療術語，直接告訴居民下一步</p></div></div>
          <div class="action-list">
            <div class="action-item"><strong>一戶一張家庭健康卡</strong><span class="minor">看得到誰還沒填、誰要健檢、誰需要追蹤。</span></div>
            <div class="action-item"><strong>問卷一次一題</strong><span class="minor">大型按鈕、可由家屬代填、可儲存草稿。</span></div>
            <div class="action-item"><strong>結果用人話呈現</strong><span class="minor">正常、需追蹤、需盡快聯絡醫護，不顯示恐嚇式文字。</span></div>
          </div>
        </section>
        <section class="panel">
          <div class="panel-header"><div><h2 class="panel-title">六村服務圖</h2><p class="panel-note">可作為未來排程和巡迴路線入口</p></div></div>
          <div class="map-strip"><div class="village">東清</div><div class="village">野銀</div><div class="village">朗島</div><div class="village">紅頭</div><div class="village">漁人</div><div class="village">椰油</div></div>
        </section>
      </aside>
    </main>
  `;
}

function residentNav(tab, iconName, label) {
  return `<button class="${state.residentTab === tab ? "active" : ""}" onclick="setResidentTab('${tab}')">${icon(iconName)}<span>${label}</span></button>`;
}

function renderResidentBody() {
  if (state.residentTab === "survey") return residentSurvey();
  if (state.residentTab === "schedule") return residentSchedule();
  if (state.residentTab === "results") return residentResults();
  return residentHome();
}

function residentHome() {
  return `
    <div class="family-card">
      <h2>夏曼家</h2>
      <p>家庭健康設計：慢病穩定 + 肺健康 + 到檢協助</p>
      <div class="progress-bar"><span style="width:68%"></span></div>
      <p class="minor" style="color:rgba(255,255,255,.76)">資料完成 68%，還有 2 位家人要確認。</p>
    </div>
    <div class="task-list">
      ${residentTask("填家訪問卷", "還差生活習慣與交通協助", "12 分鐘", "clipboard")}
      ${residentTask("預約健檢", "6/18 上午還有名額", "可預約", "calendar")}
      ${residentTask("查看結果", "爸爸血糖需追蹤", "需回覆", "lab")}
    </div>
  `;
}

function residentTask(title, desc, meta, iconName) {
  return `<div class="task-card"><div class="task-icon">${icon(iconName)}</div><div><strong>${title}</strong><div class="minor">${desc}</div></div><span class="status-pill">${meta}</span></div>`;
}

function residentSurvey() {
  const steps = [
    ["家裡最想先處理哪件健康問題？", ["長輩跌倒或走路不穩", "血壓血糖或拿藥", "肺部/癌症篩檢", "孩子視力或牙齒", "就醫交通"]],
    ["健檢當天需要什麼協助？", ["電話提醒", "交通接送", "家屬陪同", "族語協助", "輪椅或行動協助"]],
    ["是否同意照護團隊追蹤健檢異常？", ["同意電話追蹤", "同意家訪追蹤", "先由家屬聯絡", "暫不同意"]],
    ["家庭健康目標", ["先完成全家健檢", "控制血壓血糖", "戒菸/戒檳/減酒", "改善長輩居家安全"]],
  ];
  const [question, options] = steps[state.residentStep];
  return `
    <div class="wizard">
      <div class="stepper">${steps.map((_, i) => `<span class="step ${i <= state.residentStep ? "active" : ""}"></span>`).join("")}</div>
      <h2>${question}</h2>
      <div class="option-grid">${options.map((o) => `<label class="choice"><input type="checkbox" />${o}</label>`).join("")}</div>
      <div style="display:flex; gap:8px">
        <button class="ghost-btn" onclick="state.residentStep=Math.max(0,state.residentStep-1); render()">上一步</button>
        <button class="btn" onclick="state.residentStep=Math.min(3,state.residentStep+1); showToast('問卷已暫存')">下一步</button>
      </div>
    </div>
  `;
}

function residentSchedule() {
  return `
    <div class="task-list">
      <div class="info-block">
        <h3>可預約時段</h3>
        <div class="check-list">
          ${["6/18 上午 08:30", "6/18 下午 13:30", "6/19 上午 09:00"].map((time) => `<button class="check-item" onclick="showToast('已選擇 ${time}')"><span class="box">${icon("calendar")}</span><div>${time}<div class="minor">東清活動中心</div></div><span class="status-pill">選擇</span></button>`).join("")}
        </div>
      </div>
      <button class="btn" onclick="showToast('已送出預約需求')">${icon("check")}送出預約</button>
    </div>
  `;
}

function residentResults() {
  return `
    <div class="task-list">
      <div class="task-card"><div class="task-icon">${icon("alert")}</div><div><strong>爸爸：血糖偏高</strong><div class="minor">請 2 週內由護理師電話追蹤，先不用緊張。</div></div><span class="status-pill yellow">需追蹤</span></div>
      <div class="task-card"><div class="task-icon">${icon("check")}</div><div><strong>媽媽：尿液正常</strong><div class="minor">維持喝水與規律回診。</div></div><span class="status-pill green">正常</span></div>
      <div class="task-card"><div class="task-icon">${icon("calendar")}</div><div><strong>LDCT 條件待確認</strong><div class="minor">需補填吸菸年數和家族史。</div></div><span class="status-pill">補資料</span></div>
    </div>
  `;
}

function render() {
  app.innerHTML = `
    ${topbar()}
    ${state.role === "clinical" ? renderClinical() : renderResident()}
    ${appFooter()}
    ${state.toast ? `<div class="toast">${icon("check")}${state.toast}</div>` : ""}
  `;
}

window.setRole = setRole;
window.setTab = setTab;
window.setResidentTab = setResidentTab;
window.setVillage = setVillage;
window.selectVisualPatient = selectVisualPatient;
window.selectAgePackage = selectAgePackage;
window.showToast = showToast;
window.state = state;
window.render = render;

document.addEventListener("click", (event) => {
  const roleButton = event.target.closest("[data-role]");
  if (roleButton) {
    setRole(roleButton.dataset.role);
  }
});

window.addEventListener("hashchange", () => {
  const role = getInitialRole();
  if (role !== state.role) {
    state.role = role;
    render();
  }
});

render();
