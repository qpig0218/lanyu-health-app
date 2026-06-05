const agePackages = [
  {
    band: "0-未滿 1 歲",
    trigger: (age) => age < 1,
    core: ["生長曲線", "餵食與營養", "心肺腹理學", "髖關節", "神經發展", "聽力/視覺初篩", "口腔萌牙衛教", "疫苗盤點"],
    labs: ["依風險加做貧血/鉛暴露"],
    modules: ["兒童預防保健", "早療轉介"],
  },
  {
    band: "1-2 歲",
    trigger: (age) => age >= 1 && age <= 2,
    core: ["身高體重與生長曲線", "發展里程碑", "視力/聽力觀察", "口腔與塗氟", "營養與睡眠", "居家安全", "疫苗盤點"],
    labs: ["依貧血、鉛暴露、營養或發展風險加做"],
    modules: ["幼兒預防保健", "早療/牙科轉介"],
  },
  {
    band: "3-6 歲",
    trigger: (age) => age >= 3 && age <= 6,
    core: ["身高體重與生長曲線", "發展/語言/社會互動", "視力/聽力", "口腔與塗氟", "營養與睡眠", "安全與事故預防", "疫苗盤點"],
    labs: ["依肥胖、貧血、鉛暴露、營養或家族史加做"],
    modules: ["學齡前預防保健", "早療/牙科/視力轉介"],
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
  ["部落/行政村與地址", "聯絡電話", "緊急聯絡人", "主要照顧者"],
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

const protocolDimensions = [
  ["結構", "成員、決策者、常住狀態", 86],
  ["健康", "慢病、健檢、疫苗、心理", 68],
  ["資源", "經濟、教育、社會支持", 54],
  ["照顧", "主要照顧者、照顧負荷", 72],
  ["營養", "傳統食物、含糖飲料、鹽分", 48],
  ["環境", "住居、飲水、颱風與氣候", 61],
  ["文化", "長者意見、禁忌、季節節奏", 79],
];

const riskLevels = [
  ["L1", "健康促進", "每年 2-3 次", "green"],
  ["L2", "單一慢病", "每月 2-4 次", "yellow"],
  ["L3", "多重慢病", "每週 1-2 次", "orange"],
  ["L4", "重症/末期", "每週 3-7 次", "red"],
];

const villageServices = [
  { name: "椰油", x: 44, y: 14, households: 456, level: "L2", focus: "衛生所、碼頭與慢病追蹤" },
  { name: "漁人", x: 34, y: 29, households: 238, level: "L2", focus: "到檢交通與長者陪同" },
  { name: "紅頭", x: 31, y: 46, households: 629, level: "L3", focus: "健檢動員、口腔與長照" },
  { name: "朗島", x: 68, y: 25, households: 356, level: "L3", focus: "高齡安全與居家訪視" },
  { name: "東清", x: 74, y: 45, households: 588, level: "L3", focus: "慢病、肺健康、家庭協議" },
  { name: "野銀", x: 62, y: 73, households: 276, level: "L2", focus: "孕產支持與文化適切衛教" },
];

function getInitialRole() {
  const params = new URLSearchParams(window.location.search);
  const requestedRole = params.get("role") || window.location.hash.replace("#", "");
  return requestedRole === "resident" ? "resident" : "clinical";
}

const state = {
  role: getInitialRole(),
  loginRole: getInitialRole(),
  sessionRole: null,
  authenticated: false,
  selectedId: patients[0].id,
  clinicalView: "dashboard",
  clinicalNav: "dashboard",
  dashboardView: "war",
  mpiTab: "index",
  trackTab: "board",
  pmoTab: "nodes",
  kbLayer: "K1",
  kbQuery: "",
  govTab: "rbac",
  agentDetail: null,
  accessKey: "L4",
  lang: "zh",
  tab: "overview",
  query: "",
  residentTab: "home",
  residentStep: 0,
  aiDraft: null,
  modulePicker: null,
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

function moduleByCode(code) {
  return householdModules.find(([moduleCode]) => moduleCode === code);
}

function friendlyHouseholdTag(tag) {
  const code = tag.match(/^H\d+/)?.[0];
  const module = code ? moduleByCode(code) : null;
  return module ? module[1] : tag.replace(/^H\d+\s*/, "");
}

function patientSignalText(patient) {
  return `${patient.tags.join(" ")} ${patient.householdTags.join(" ")} ${patient.conditions.join(" ")} ${patient.questionnaire.transport} ${patient.questionnaire.alert}`;
}

function smartPlanFor(patient) {
  const text = patientSignalText(patient);
  const plans = [];

  if (text.includes("糖尿病") || text.includes("高血壓") || text.includes("慢病")) {
    plans.push({
      domain: "慢病穩定",
      goal: "晚餐後步行 10 分鐘，每週 5 天；6/18 前完成 5 次並由家人協助打卡。",
      metric: "5 次",
    });
    plans.push({
      domain: "飲食調整",
      goal: "一週至少 5 餐把含糖飲料改成白開水，晚餐飯量先減少 1/4。",
      metric: "5 餐",
    });
  }

  if (text.includes("吸菸") || text.includes("LDCT") || text.includes("肺")) {
    plans.push({
      domain: "肺健康",
      goal: "本週記錄每天吸菸支數，選 3 天延後第一支菸 30 分鐘，健檢時完成 LDCT 條件確認。",
      metric: "3 天",
    });
  }

  if (patient.age >= 65 || text.includes("跌倒") || text.includes("高齡")) {
    plans.push({
      domain: "高齡安全",
      goal: "3 天內完成浴室止滑、夜燈與走道雜物檢查，護理師下次家訪確認。",
      metric: "3 項",
    });
  }

  if (text.includes("孕") || text.includes("產檢")) {
    plans.push({
      domain: "孕產支持",
      goal: "本週確認下一次產檢日期、船班備案與緊急聯絡人，完成後傳給護理師。",
      metric: "1 份",
    });
  }

  if (patient.age < 18 || text.includes("兒少") || text.includes("視力") || text.includes("齲齒")) {
    plans.push({
      domain: "兒少健康",
      goal: "兩週內完成視力或牙科預約，家長每天睡前協助刷牙 2 分鐘。",
      metric: "14 天",
    });
  }

  if (!plans.length) {
    plans.push({
      domain: "預防保健",
      goal: "健檢前完成問卷、同意書與交通確認，健檢後 7 天內查看結果。",
      metric: "7 天",
    });
  }

  return plans.slice(0, 3);
}

function aiSignalsFor(patient) {
  const text = patientSignalText(patient);
  const signals = [];

  if (patient.risk >= 80) signals.push(["高風險優先", `家庭風險 ${patient.risk}/100，建議列入今日主動追蹤。`]);
  if (patient.labs.some((lab) => ["high", "low", "watch"].includes(lab[5]))) signals.push(["檢驗異常", "已偵測偏高/偏低或觀察項目，可先產生追蹤清單。"]);
  if (patient.labs.some((lab) => lab[5] === "pending")) signals.push(["缺漏檢驗", "仍有待補項目，AI 可帶入下次抽血或既有紀錄查核。"]);
  if (patient.consent.includes("待")) signals.push(["同意書未完成", "建議家訪時先補簽同意與資料使用範圍。"]);
  if (text.includes("交通") || text.includes("船") || text.includes("天候")) signals.push(["可近性阻礙", "需把交通、船班或陪同者放進到檢動員。"]);
  if (text.includes("跌倒") || text.includes("高齡")) signals.push(["高齡安全", "建議同步評估居家安全、復能與長照資源。"]);

  return signals.slice(0, 3);
}

function aiToast(action, patientId) {
  const patient = patients.find((p) => p.id === patientId) || selectedPatient();
  state.aiDraft = buildAiDraft(action, patient);
  showToast(`${action}：${patient.displayName} 已產生草稿`);
}

function buildAiDraft(action, patient) {
  const signals = aiSignalsFor(patient);
  const smartPlans = smartPlanFor(patient);
  const abnormalLabs = patient.labs.filter((lab) => ["high", "low", "watch"].includes(lab[5]));
  const pendingLabs = patient.labs.filter((lab) => lab[5] === "pending");
  const createdAt = new Date().toLocaleString("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const base = {
    action,
    patientId: patient.id,
    patientName: patient.displayName,
    createdAt,
    chips: [patient.household, `${patient.village}部落`, `${patient.age}歲・${patient.sex}`, patient.consent],
    hitl: action.includes("今日工作") || action.includes("動態") ? "H4 自動但留證" : "H2 草擬・待簽核",
    model: "Claude Haiku 4.5（M 中型）· 規則引擎輔助",
    confidence: patient.risk >= 80 ? "中（高風險建議人工複核）" : "高",
    why: `依目前個案訊號（風險 ${patient.risk}/100、${aiSignalsFor(patient).map(([titleText]) => titleText).join("、") || "例行追蹤"}）與規則引擎產生；ML 僅排序輔助，不做臨床決策。`,
    interactionId: `AI-${patient.id}-${Date.now().toString().slice(-6)}`,
  };

  if (action.includes("檢驗")) {
    return {
      ...base,
      title: "AI檢驗追蹤摘要 Mock",
      subtitle: "把檢驗值轉成護理追蹤重點與居民可讀說明。",
      sections: [
        ["異常/觀察", abnormalLabs.map((lab) => `${lab[1]} ${lab[2]}${lab[3]}（${labStatusText(lab[5])}，參考 ${lab[4]}）`).join("；") || "目前沒有異常檢驗值。"],
        ["待補資料", pendingLabs.map((lab) => `${lab[1]}：下次抽血或調閱既有紀錄時補齊。`).join("；") || "無待補檢驗。"],
        ["居民說明", `${patient.displayName} 目前需追蹤的檢驗項目會由護理師協助確認，不需要自行判讀數字；若出現不適或警訊，請直接聯絡照護團隊。`],
        ["下一步", "建立 2 週內電話追蹤，必要時安排門診或衛生所複測，並把結果同步到家庭健康設計模組。"],
      ],
    };
  }

  if (action.includes("SMART") || action.includes("同步照護任務")) {
    return {
      ...base,
      title: "AI生活型態醫學 SMART 建議 Mock",
      subtitle: "把分流結果轉成可被家人執行、可量測的任務。",
      sections: [
        ["本週目標", smartPlans.map((plan, index) => `${index + 1}. ${plan.domain}：${plan.goal}（指標：${plan.metric}）`).join("\n")],
        ["家庭協作", `${patient.contact} 協助提醒與打卡；護理師下次家訪確認阻礙、調整目標難度。`],
        ["追蹤條件", "若目標未達成，先記錄原因：交通、天候、照顧負荷、藥物副作用或家庭支持不足。"],
      ],
    };
  }

  if (action.includes("排程") || action.includes("健檢")) {
    const pkg = packageForAge(patient.age);
    return {
      ...base,
      title: "AI健檢排程草稿 Mock",
      subtitle: "依年齡層、風險與到檢阻礙整理健檢日任務。",
      sections: [
        ["分齡方案", `${pkg.band}：${pkg.core.slice(0, 4).join("、")}。`],
        ["到檢提醒", `${patient.questionnaire.transport}；健檢前一天提醒空腹、證件、同意書與陪同者。`],
        ["缺漏併檢", pendingLabs.length ? pendingLabs.map((lab) => lab[1]).join("、") : "目前無待補檢驗。"],
        ["現場分工", "報到核身、抽血/檢查、異常值回收、回家後 7 天內檢驗說明。"],
      ],
    };
  }

  if (action.includes("動態")) {
    return {
      ...base,
      title: "AI個案動態摘要 Mock",
      subtitle: "把風險、問卷、檢驗與未完成事項整理成追蹤雷達。",
      sections: [
        ["優先訊號", signals.map(([title, detail]) => `${title}：${detail}`).join("\n") || "目前以例行追蹤為主。"],
        ["家戶風險", `家庭風險分數 ${patient.risk}/100；目前啟用 ${patient.householdTags.join("、")}。`],
        ["未完成事項", `${pendingLabs.length} 個檢驗待補、同意狀態 ${patient.consent}、到檢協助：${patient.questionnaire.transport}。`],
        ["建議通知", `通知 ${patient.contact}，同步健檢時間、交通安排與家屬協助事項。`],
      ],
    };
  }

  if (action.includes("今日工作")) {
    return {
      ...base,
      title: "AI今日交班摘要 Mock",
      subtitle: "把儀表板任務整理成可交班的工作清單。",
      sections: [
        ["今日家訪", "18 戶：完成 12、未遇 4、需再訪 2；優先處理 P1、P3、P8 個案。"],
        ["健檢動員", "健檢名冊 642 人，已同意 71%；交通與陪同需求需在健檢前 3 天確認。"],
        ["高風險", `${patient.displayName}：${patient.tags.join("、")}；家庭風險 ${patient.risk}/100。`],
        ["交班提醒", "檢驗異常待簽核 27 件，高風險 8 件需先產生居民可讀說明。"],
      ],
    };
  }

  return {
    ...base,
    title: "AI家訪摘要草稿 Mock",
    subtitle: "問卷、健檢、檢驗與家庭模組自動整理成護理紀錄草稿。",
    sections: [
      ["S 主觀資料", `${patient.displayName} 家庭主要目標為「${patient.questionnaire.householdGoal}」。家戶狀態：${patient.questionnaire.home}；到檢阻礙：${patient.questionnaire.transport}。`],
      ["O 客觀資料", `分流標籤：${patient.tags.join("、")}；家庭模組：${patient.householdTags.join("、")}；風險分數 ${patient.risk}/100。`],
      ["A 評估", signals.map(([title, detail]) => `${title}：${detail}`).join("\n") || "目前以預防保健與資料補齊為主。"],
      ["P 計畫", smartPlans.map((plan) => `${plan.domain}：${plan.goal}`).join("\n")],
      ["待辦", "補齊同意/聯絡資訊、確認健檢排程、異常檢驗回收後產生居民可讀說明。"],
    ],
  };
}

function labStatusText(status) {
  const map = {
    high: "偏高",
    low: "偏低",
    watch: "觀察",
    pending: "待補",
    ok: "正常",
  };
  return map[status] || "待判";
}

function accountProfile() {
  if (state.sessionRole === "resident") {
    return {
      initials: "夏",
      name: "夏曼家",
      role: "民眾帳號 · L5",
      scope: "家庭共享權限",
      badge: "家戶成員",
    };
  }

  const lv = currentLevel();
  const names = { L1: "照護司 林司長", L2: "PMO 阿德主任", L3: "駐點 王主任", L4: "FNP 阿德護理師" };
  return {
    initials: lv.key,
    name: names[lv.key] || "照護團隊",
    role: `${lv.key} · ${lv.name}`,
    scope: `${lv.scope}`,
    badge: lv.name,
  };
}

function selectLoginRole(role) {
  if (!["clinical", "resident"].includes(role)) return;
  state.loginRole = role;
  render();
}

function loginAs(role = state.loginRole) {
  if (!["clinical", "resident"].includes(role)) return;
  state.authenticated = true;
  state.sessionRole = role;
  state.role = role;
  state.loginRole = role;
  state.aiDraft = null;
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.delete("role");
  nextUrl.hash = role;
  window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  render();
}

function logout() {
  const currentRole = state.sessionRole || state.role;
  state.authenticated = false;
  state.sessionRole = null;
  state.loginRole = currentRole;
  state.aiDraft = null;
  state.modulePicker = null;
  const nextUrl = new URL(window.location.href);
  nextUrl.hash = "";
  window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}`);
  render();
}

function closeAiDraft() {
  state.aiDraft = null;
  render();
}

function applyAiDraft() {
  if (!state.aiDraft) return;
  showToast(`${state.aiDraft.title.replace(" Mock", "")} 已套用到工作區草稿`);
}

function openModulePicker(context = "family") {
  state.modulePicker = context;
  render();
}

function closeModulePicker() {
  state.modulePicker = null;
  render();
}

function selectHouseholdModule(code) {
  const module = moduleByCode(code);
  state.modulePicker = null;
  showToast(module ? `${module[1]} 已加入家庭健康設計草稿` : "已更新家庭健康設計草稿");
}

function setRole(role) {
  if (!["clinical", "resident"].includes(role)) return;
  if (!state.authenticated) {
    state.loginRole = role;
    render();
    return;
  }
  if (state.sessionRole === "resident" && role !== "resident") {
    showToast("民眾帳號無權限進入醫療/護理系統");
    return;
  }
  state.role = role;
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.delete("role");
  nextUrl.hash = role;
  window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  render();
}

function setTab(tab) {
  state.clinicalView = "workspace";
  state.clinicalNav = "workspace";
  state.tab = tab;
  render();
}

function setClinicalView(view) {
  if (!["dashboard", "workspace"].includes(view)) return;
  state.clinicalView = view;
  state.clinicalNav = view;
  render();
}

function setDashboardView(view) {
  if (!["policy", "war", "station"].includes(view)) return;
  state.dashboardView = view;
  state.clinicalNav = "dashboard";
  render();
}
function setMpiTab(tab) { state.mpiTab = tab; render(); }
function setTrackTab(tab) { state.trackTab = tab; render(); }
function setPmoTab(tab) { state.pmoTab = tab; render(); }
function setKbLayer(layer) { state.kbLayer = layer; render(); }
function setGovTab(tab) { state.govTab = tab; render(); }

function setResidentTab(tab) {
  state.residentTab = tab;
  render();
}

function setVillage(village) {
  const match = patients.find((p) => p.village === village);
  state.query = state.query === village ? "" : village;
  if (match && state.query) state.selectedId = match.id;
  showToast(state.query ? `已篩選 ${village}部落名冊` : "已清除部落篩選");
}

function selectVisualPatient(id, tab = state.tab) {
  state.selectedId = id;
  state.query = "";
  state.clinicalView = "workspace";
  state.clinicalNav = "workspace";
  if (tab) state.tab = tab;
  render();
}

function selectAgePackage(index) {
  const target = agePackages[index];
  const match = patients.find((p) => packageForAge(p.age).band === target.band);
  state.clinicalView = "workspace";
  state.clinicalNav = "workspace";
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
  const profile = accountProfile();
  return `
    <header class="topbar app-topbar-auth">
      <div class="account-area">
        <button class="account-chip" onclick="showToast('${profile.name}｜${profile.scope}')">
          <span class="account-avatar">${profile.initials}</span>
          <span class="account-copy">
            <strong>${profile.name}</strong>
            <small>${profile.role}</small>
          </span>
        </button>
        <button class="account-logout" onclick="logout()" title="登出" aria-label="登出">${icon("arrow")}<span>登出</span></button>
      </div>
      <div class="brand brand-centered">
        <img class="company-logo" src="./assets/the-one-ai-logo.png" alt="The One AITech 本一科技 Logo" />
        <div>
          <h1 class="brand-title">Ayoi 蘭嶼健康行動APP</h1>
          <p class="brand-subtitle">The One AITech 本一科技｜家戶圖譜、全齡健檢、檢驗值與家庭健康設計模組</p>
        </div>
      </div>
      <div class="utility-actions auth-actions">
        <span class="role-scope-pill">${icon("shield")}${profile.badge}</span>
        ${state.sessionRole === "clinical" && state.role === "resident" ? `<button class="ghost-btn" onclick="setRole('clinical')">${icon("lab")}回醫護</button>` : ""}
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
        <img class="footer-logo" src="./assets/the-one-ai-logo.png" alt="The One AITech 本一科技 Logo" />
        <span>Copyright © 2026 The One AITech 本一科技 版權所有</span>
      </div>
    </footer>
  `;
}

function renderLanding() {
  const lv = currentLevel();
  const loginLabel = lv.role === "resident" ? "登入民眾頁面（L5）" : `登入治理系統（${lv.key}）`;
  const account = lv.role === "resident" ? "family.h014" : `${lv.key.toLowerCase()}.ayoi@theone`;
  return `
    <main class="landing-shell" aria-label="系統登入">
      <section class="landing-hero">
        <div class="landing-brand">
          <img class="landing-logo" src="./assets/the-one-ai-logo.png" alt="The One AITech 本一科技 Logo" />
          <div>
            <h1>Ayoi 蘭嶼健康行動APP</h1>
            <p>Health Equity Command Center（HECC）｜全人健康照護與治理中樞</p>
          </div>
        </div>
        <div class="landing-grid">
          <section class="login-panel">
            <div class="login-panel-head">
              <div>
                <h2>選擇權限層級（五級 RBAC）</h2>
                <p>依附件 B 角色矩陣・MFA 安全模式</p>
              </div>
              <span class="status-pill green">${icon("shield")}MFA 啟用</span>
            </div>
            <div class="login-role-grid rbac-login-grid" role="radiogroup" aria-label="登入權限層級">
              ${accessLevels.map((l) => loginAccessCard(l)).join("")}
            </div>
            <div class="login-form-mock">
              <label>
                <span>帳號</span>
                <input value="${account}" aria-label="帳號" />
              </label>
              <label>
                <span>密碼 + TOTP</span>
                <input type="password" value="mockpass" aria-label="密碼" />
              </label>
              <button class="btn login-submit" onclick="loginWithAccess()">${icon("shield")}${loginLabel}</button>
            </div>
          </section>
        </div>
      </section>
      ${appFooter()}
    </main>
  `;
}

function loginAccessCard(l) {
  const active = state.accessKey === l.key;
  return `
    <button class="login-role-card rbac-login-card ${active ? "active" : ""}" onclick="selectAccess('${l.key}')" aria-checked="${active}" role="radio">
      <span class="login-role-icon"><span class="lv-badge lv-${l.key.toLowerCase()}">${l.key}</span></span>
      <strong>${l.name}</strong>
      <small>${l.scope}</small>
      <em>${l.who}</em>
    </button>
  `;
}

function selectAccess(key) {
  const lv = accessLevels.find((l) => l.key === key);
  if (!lv) return;
  state.accessKey = key;
  state.loginRole = lv.role;
  render();
}

function loginWithAccess() {
  const lv = currentLevel();
  state.authenticated = true;
  state.sessionRole = lv.role;
  state.role = lv.role;
  state.loginRole = lv.role;
  state.clinicalNav = lv.role === "clinical" ? lv.nav : state.clinicalNav;
  state.dashboardView = { L1: "policy", L2: "war", L3: "station", L4: "station" }[lv.key] || "war";
  state.aiDraft = null;
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.delete("role");
  nextUrl.hash = lv.role;
  window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  render();
}

function loginRoleCard(role, title, account, desc, iconName) {
  const active = state.loginRole === role;
  return `
    <button class="login-role-card ${active ? "active" : ""}" data-login-role="${role}" onclick="selectLoginRole('${role}')" aria-checked="${active}" role="radio">
      <span class="login-role-icon">${icon(iconName)}</span>
      <strong>${title}</strong>
      <small>${account}</small>
      <em>${desc}</em>
    </button>
  `;
}

function renderClinical() {
  const patient = selectedPatient();
  return `
    <main class="layout clinical-layout">
      ${renderClinicalRail()}
      <section class="clinical-stage">
        ${renderClinicalStage(patient)}
      </section>
    </main>
  `;
}

function clinicalViewButton(view, iconName, label) {
  return `<button class="${state.clinicalView === view ? "active" : ""}" title="${label}" onclick="setClinicalView('${view}')">${icon(iconName)}<span>${label}</span></button>`;
}

function renderClinicalDashboard(patient) {
  return `
    <section class="clinical-dashboard">
      ${renderDashboardHero(patient)}
      <section class="dashboard-stat-strip" aria-label="各項統計卡片">
        ${renderStats()}
      </section>
      ${renderTodayWorklist()}
      ${lanyuVillageMap()}
      ${renderClinicalSupportModules(patient)}
    </section>
  `;
}

function renderClinicalSupportModules(patient) {
  return `
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

function renderClinicalWorkspace(patient) {
  return `
    <section class="clinical-workspace">
      <div class="workspace-context-bar">
        <div>
          <span class="ai-kicker">工作區</span>
          <h2>家戶、個案資訊與填寫內容</h2>
          <p>先選家戶與個案，再在中間卡片完成問卷、分齡健檢、檢驗值與分流設計。</p>
        </div>
        <div class="workspace-context-actions">
          <button class="ghost-btn" onclick="setClinicalView('dashboard')">${icon("home")}回儀表板</button>
          <button class="btn" onclick='aiToast("AI產生家訪摘要", ${jsArg(patient.id)})'>${icon("clipboard")}AI摘要</button>
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

function renderDashboardHero(patient) {
  const abnormalCount = patient.labs.filter((lab) => ["high", "low", "watch", "pending"].includes(lab[5])).length;
  return `
    <section class="dashboard-hero">
      <div>
        <span class="ai-kicker">醫護儀表板</span>
        <h2>六部落服務、今日任務與風險總覽</h2>
        <p>把全島服務量、家訪清單、到檢阻礙與高風險個案放在同一個入口，不在這裡填表。</p>
      </div>
      <div class="dashboard-hero-metrics">
        <button onclick="setClinicalView('workspace')"><strong>18</strong><span>今日家訪</span></button>
        <button onclick='setTab("labs")'><strong>${abnormalCount}</strong><span>檢驗待處理</span></button>
        <button onclick='setTab("triage")'><strong>${patient.risk}</strong><span>最高家戶風險</span></button>
      </div>
    </section>
  `;
}

function renderTodayWorklist() {
  const items = [
    {
      title: "今日家訪與補訪",
      detail: "12 戶完成、4 戶未遇、2 戶需再訪",
      meta: "問卷",
      icon: "home",
      tab: "questionnaire",
      patientId: "P-00018",
    },
    {
      title: "健檢到檢動員",
      detail: "P1 健檢優先與 P8 交通協助先處理",
      meta: "健檢",
      icon: "calendar",
      tab: "checkup",
      patientId: "P-00018",
    },
    {
      title: "檢驗異常待簽核",
      detail: "高風險 8 件，需完成居民可讀說明",
      meta: "檢驗",
      icon: "lab",
      tab: "labs",
      patientId: "P-00018",
    },
    {
      title: "同意書與個資缺漏",
      detail: "未完成同意與聯絡方式需家訪補齊",
      meta: "個資",
      icon: "shield",
      tab: "overview",
      patientId: "P-00033",
    },
    {
      title: "家庭健康設計分流",
      detail: "慢病穩定、肺健康與到檢協助需轉成 SMART 任務",
      meta: "分流",
      icon: "alert",
      tab: "triage",
      patientId: "P-00018",
    },
  ];

  return `
    <section class="panel today-work-panel">
      <div class="panel-header">
        <div><h2 class="panel-title">今日工作清單</h2><p class="panel-note">點選後進入工作區處理個案資料</p></div>
      </div>
      <div class="today-work-list">
        ${items.map((item) => `
          <button class="today-work-item" onclick='selectVisualPatient(${jsArg(item.patientId)}, ${jsArg(item.tab)})'>
            <span class="task-icon">${icon(item.icon)}</span>
            <span>
              <strong>${item.title}</strong>
              <small>${item.detail}</small>
            </span>
            <em>${item.meta}</em>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderWorkspaceAiBrief(patient) {
  const signals = aiSignalsFor(patient);
  return `
    <section class="dashboard-ai-brief workspace-ai-brief">
      <div>
        <span class="ai-kicker">AI健康助理</span>
        <h3>把個案動態、文書草稿與 SMART 建議集中在工作區</h3>
        <p>依目前選取個案自動整理異常訊號，護理師可直接生成摘要、追蹤任務與居民可讀說明。</p>
      </div>
      <div class="dashboard-ai-grid">
        ${signals.map(([title, detail]) => `
          <button onclick='setTab("triage")'>
            <strong>${title}</strong>
            <span>${detail}</span>
          </button>
        `).join("")}
        <button onclick='aiToast("AI整理今日工作摘要", ${jsArg(patient.id)})'>
          <strong>今日摘要</strong>
          <span>彙整家訪、健檢與異常檢驗，產生交班重點。</span>
        </button>
      </div>
    </section>
  `;
}

function renderWorkspaceFillPanel(patient) {
  const pendingLabs = patient.labs.filter((lab) => lab[5] === "pending").length;
  const abnormalLabs = patient.labs.filter((lab) => ["high", "low", "watch"].includes(lab[5])).length;
  const tasks = [
    ["家訪問卷", patient.questionnaire.householdGoal ? "已填核心欄位" : "待填", "questionnaire", "clipboard"],
    ["分齡健檢", `${packageForAge(patient.age).band} 待確認`, "checkup", "calendar"],
    ["檢驗值", `${abnormalLabs} 異常 / ${pendingLabs} 待補`, "labs", "lab"],
    ["家庭健康設計", patient.householdTags.map(friendlyHouseholdTag).join("、"), "triage", "users"],
  ];

  return `
    <aside class="workspace-fill-panel" aria-label="需要填寫的內容">
      <section class="panel">
        <div class="panel-header"><div><h2 class="panel-title">需要填寫的內容</h2><p class="panel-note">依目前個案自動帶出</p></div></div>
        <div class="fill-task-list">
          ${tasks.map(([title, detail, tab, iconName]) => `
            <button class="fill-task" onclick='setTab(${jsArg(tab)})'>
              <span class="task-icon">${icon(iconName)}</span>
              <span><strong>${title}</strong><small>${detail}</small></span>
              <em>填寫</em>
            </button>
          `).join("")}
        </div>
      </section>
      <section class="panel ai-side-panel">
        <div class="panel-header"><div><h2 class="panel-title">AI家庭護理師</h2><p class="panel-note">減少文書與掌握動態</p></div></div>
        <div class="action-list">
          <button class="btn" onclick='aiToast("AI產生家訪摘要", ${jsArg(patient.id)})'>${icon("clipboard")}產生摘要</button>
          <button class="ghost-btn" onclick='aiToast("AI追蹤個案動態", ${jsArg(patient.id)})'>${icon("alert")}動態追蹤</button>
          <button class="ghost-btn" onclick='aiToast("AI建立SMART建議", ${jsArg(patient.id)})'>${icon("check")}SMART建議</button>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header"><div><h2 class="panel-title">下一步</h2><p class="panel-note">現場可直接執行</p></div></div>
        <div class="action-list">
          <button class="btn" onclick="showToast('已加入今日健檢排程')">${icon("calendar")}安排健檢</button>
          <button class="ghost-btn" onclick="showToast('已建立轉介單草稿')">${icon("arrow")}建立轉介</button>
          <button class="ghost-btn" onclick="showToast('已傳送家屬提醒')">${icon("check")}通知聯絡人</button>
        </div>
      </section>
    </aside>
  `;
}

function renderClinicalCommand(patient) {
  const abnormalCount = patient.labs.filter((lab) => ["high", "low", "watch", "pending"].includes(lab[5])).length;
  return `
    <section class="clinical-command">
      <div class="clinical-command-copy">
        <span class="ai-kicker">醫護工作台</span>
        <h2>今日家訪與健檢追蹤</h2>
        <p>${patient.displayName}｜${patient.village}｜${patient.household}｜${patient.tags.slice(0, 3).join("、")}</p>
      </div>
      <div class="clinical-command-metrics">
        <button onclick='setTab("questionnaire")'><strong>18</strong><span>今日家訪</span></button>
        <button onclick='setTab("labs")'><strong>${abnormalCount}</strong><span>檢驗待處理</span></button>
        <button onclick='setTab("triage")'><strong>${patient.risk}</strong><span>家戶風險</span></button>
      </div>
      <div class="clinical-command-actions">
        <button class="btn" onclick='aiToast("AI產生家訪摘要", ${jsArg(patient.id)})'>${icon("clipboard")}AI摘要</button>
        <button class="ghost-btn" onclick="showToast('已加入今日健檢排程')">${icon("calendar")}排健檢</button>
      </div>
    </section>
  `;
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
        <input value="${state.query}" oninput="state.query=this.value; render()" placeholder="搜尋姓名、部落、分流標籤" />
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
          ${schemaCard("個資", piiFields[0].concat(piiFields[1]))}
          ${schemaCard("家戶", ["家戶編號", "成員 roster", "照顧者", "交通可近性", "居住安全", "家庭健康目標"])}
          ${schemaCard("健檢/檢驗", ["年齡層方案", "檢查項目", "檢驗值", "正常範圍", "異常旗標", "報告日期"])}
          ${schemaCard("照護", ["個人分流項目", "家庭健康設計", "追蹤期限", "轉介去向", "完成狀態"])}
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
        <div class="visual-head"><strong>六部落熱點</strong><span>${state.query || patient.village}</span></div>
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

function renderAiAssistantPanel(patient) {
  const signals = aiSignalsFor(patient);
  const smartPlans = smartPlanFor(patient);
  return `
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
        <button class="ai-chip" onclick='aiToast("AI產生家訪摘要", ${jsArg(patient.id)})'>
          <strong>文書草稿</strong>
          <span>SOAP、家訪摘要、家屬提醒</span>
        </button>
        <button class="ai-chip" onclick='aiToast("AI追蹤個案動態", ${jsArg(patient.id)})'>
          <strong>動態監測</strong>
          <span>異常值、未到檢、交通阻礙</span>
        </button>
        <button class="ai-chip" onclick='aiToast("AI建立SMART建議", ${jsArg(patient.id)})'>
          <strong>生活型態醫學</strong>
          <span>飲食、活動、睡眠、戒菸檳、壓力支持</span>
        </button>
      </div>
      <div class="ai-insight-row">
        ${signals.map(([title, desc]) => `
          <div class="ai-signal">
            <strong>${title}</strong>
            <span>${desc}</span>
          </div>
        `).join("")}
      </div>
      <div class="smart-list">
        ${smartPlans.map((plan) => smartGoal(plan)).join("")}
      </div>
    </div>
  `;
}

function smartGoal(plan) {
  return `
    <div class="smart-goal">
      <span>${plan.domain}</span>
      <strong>${plan.goal}</strong>
      <em>${plan.metric}</em>
    </div>
  `;
}

function renderQuestionnaire(patient) {
  return `
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

function renderAiDocumentationPanel(patient) {
  const drafts = [
    ["家訪摘要", `家庭目標：${patient.questionnaire.householdGoal}`],
    ["SOAP 草稿", `問題：${patient.conditions.slice(0, 2).join("、") || "待補"}`],
    ["家屬通知", `聯絡人：${patient.contact}，提醒同意書、健檢與追蹤。`],
    ["追蹤待辦", `${aiSignalsFor(patient).map(([title]) => title).join("、") || "例行追蹤"}`],
  ];
  return `
    <div class="ai-doc-card wide">
      <div class="ai-head compact">
        <div>
          <span class="ai-kicker">AI文書減量</span>
          <h3>問卷填完後自動整理成護理紀錄</h3>
        </div>
        <button class="ghost-btn" onclick='aiToast("AI整理問卷紀錄", ${jsArg(patient.id)})'>${icon("clipboard")}產生草稿</button>
      </div>
      <div class="ai-draft-grid">
        ${drafts.map(([title, detail]) => `
          <button class="ai-draft" onclick='showToast(${jsArg(`${title} 已加入草稿`)})'>
            <strong>${title}</strong>
            <span>${detail}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderCheckup(patient) {
  const pkg = packageForAge(patient.age);
  return `
    <div class="section-grid">
      ${renderAgePackageRail(patient)}
      ${renderAiCheckupCoach(patient, pkg)}
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
        <p class="minor">0-6 歲依兒童預防保健與發展風險分層；7-18 歲以學齡/青少年健康為主；30 歲以上接成人預防保健；55 歲以上原住民每年評估；75 歲以上癌篩與抽血項目個別化。</p>
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

function renderAiCheckupCoach(patient, pkg) {
  const actions = [
    ["分齡排檢", `${pkg.band}：${pkg.core.slice(0, 3).join("、")}`],
    ["到檢動員", patient.questionnaire.transport],
    ["缺漏提醒", patient.labs.some((lab) => lab[5] === "pending") ? "有待補檢驗，建議併入健檢日" : "目前無待補檢驗"],
  ];
  return `
    <div class="ai-doc-card wide ai-checkup-card">
      <div class="ai-head compact">
        <div>
          <span class="ai-kicker">AI健康助理</span>
          <h3>自動比對年齡層、風險與到檢阻礙</h3>
        </div>
        <button class="ghost-btn" onclick='aiToast("AI建立健檢排程", ${jsArg(patient.id)})'>${icon("calendar")}排程</button>
      </div>
      <div class="ai-draft-grid">
        ${actions.map(([title, detail]) => `
          <div class="ai-draft static">
            <strong>${title}</strong>
            <span>${detail}</span>
          </div>
        `).join("")}
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
      ${renderAiLabCoach(patient)}
      <div class="field-block wide">
        <h3>檢驗值輸入與異常旗標</h3>
        <div class="table-scroll">
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
    </div>
  `;
}

function renderAiLabCoach(patient) {
  const abnormalLabs = patient.labs.filter((lab) => ["high", "low", "watch"].includes(lab[5]));
  const pendingLabs = patient.labs.filter((lab) => lab[5] === "pending");
  return `
    <div class="ai-doc-card wide ai-lab-card">
      <div class="ai-head compact">
        <div>
          <span class="ai-kicker">AI檢驗摘要</span>
          <h3>把檢驗值轉成追蹤重點與居民可讀說明</h3>
        </div>
        <button class="ghost-btn" onclick='aiToast("AI產生檢驗追蹤", ${jsArg(patient.id)})'>${icon("lab")}摘要</button>
      </div>
      <div class="ai-lab-summary">
        <div><strong>${abnormalLabs.length}</strong><span>異常/觀察</span></div>
        <div><strong>${pendingLabs.length}</strong><span>待補項目</span></div>
        <div><strong>${smartPlanFor(patient).length}</strong><span>SMART建議</span></div>
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
      ${renderAiSmartPanel(patient)}
      <div class="check-block">
        <h3>個人分流標籤</h3>
        <div class="check-list">${patient.tags.map((tag) => checkItem(tag, tag.includes("P1") ? "優先" : "追蹤")).join("")}</div>
      </div>
      <div class="check-block">
        <h3>家庭健康設計模組</h3>
        <div class="check-list">${patient.householdTags.map((tag) => checkItem(friendlyHouseholdTag(tag), "啟用")).join("")}</div>
      </div>
      <div class="field-block wide module-picker-card">
        <div>
          <span class="ai-kicker">家庭健康設計</span>
          <h3>用情境選擇照護模組</h3>
          <p>不要讓護理師在頁面上讀代碼表；需要分流時打開選擇器，看名稱、適用情境與設計重點。</p>
        </div>
        <div class="selected-module-pills">
          ${patient.householdTags.map((tag) => `<span>${friendlyHouseholdTag(tag)}</span>`).join("")}
        </div>
        <button class="btn" onclick="openModulePicker('triage')">${icon("users")}選擇家庭健康設計</button>
      </div>
    </div>
  `;
}

function renderAiSmartPanel(patient) {
  return `
    <div class="ai-assistant-card wide ai-smart-card">
      <div class="ai-head compact">
        <div>
          <span class="ai-kicker">AI健康助理</span>
          <h3>分流後直接生成家庭照護與生活型態醫學任務</h3>
        </div>
        <button class="ghost-btn" onclick='aiToast("AI同步照護任務", ${jsArg(patient.id)})'>${icon("check")}同步</button>
      </div>
      <div class="smart-list">
        ${smartPlanFor(patient).map((plan) => smartGoal(plan)).join("")}
      </div>
    </div>
  `;
}

function renderRightPanel(patient) {
  return `
    <aside class="right-panel">
      <section class="panel ai-side-panel">
        <div class="panel-header"><div><h2 class="panel-title">AI家庭護理師</h2><p class="panel-note">文書、個案動態、SMART建議</p></div></div>
        <div class="action-list">
          <button class="btn" onclick='aiToast("AI產生家訪摘要", ${jsArg(patient.id)})'>${icon("clipboard")}產生家訪摘要</button>
          <button class="ghost-btn" onclick='aiToast("AI追蹤個案動態", ${jsArg(patient.id)})'>${icon("alert")}掌握個案動態</button>
          <button class="ghost-btn" onclick='aiToast("AI建立SMART建議", ${jsArg(patient.id)})'>${icon("check")}建立SMART建議</button>
        </div>
      </section>
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
      <nav class="resident-web-nav" aria-label="民眾端主選單">
        ${residentNav("home", "home", "首頁")}
        ${residentNav("plan", "users", "照護")}
        ${residentNav("survey", "clipboard", "問卷")}
        ${residentNav("schedule", "calendar", "預約")}
        ${residentNav("results", "lab", "結果")}
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
          ${residentNav("home", "home", "首頁")}
          ${residentNav("plan", "users", "照護")}
          ${residentNav("survey", "clipboard", "問卷")}
          ${residentNav("schedule", "calendar", "預約")}
          ${residentNav("results", "lab", "結果")}
        </nav>
      </section>
    </main>
  `;
}

function residentNav(tab, iconName, label) {
  return `<button class="${state.residentTab === tab ? "active" : ""}" onclick="setResidentTab('${tab}')">${icon(iconName)}<span>${label}</span></button>`;
}

function renderResidentBody() {
  if (state.residentTab === "plan") return residentCarePlan();
  if (state.residentTab === "survey") return residentSurvey();
  if (state.residentTab === "schedule") return residentSchedule();
  if (state.residentTab === "results") return residentResults();
  return residentHome();
}

function residentHome() {
  return `
    ${residentFamilyHealthCard()}
    ${residentAiAssistantCard()}
    <div class="task-list">
      ${residentTask("填家訪問卷", "還差生活習慣與交通協助", "12 分鐘", "clipboard")}
      ${residentTask("預約健檢", "6/18 上午還有名額", "可預約", "calendar")}
      ${residentTask("查看結果", "爸爸血糖需追蹤", "需回覆", "lab")}
    </div>
    ${residentHealthPathPreview()}
    ${residentConsentCard()}
  `;
}

function residentConsentCard() {
  return `
    <section class="resident-card consent-resident-card">
      <div class="resident-card-head">
        <div>
          <h3>我的個資與同意</h3>
          <p>${state.lang === "tao" ? "〔達悟語・待部落顧問審定〕你的資料、你做主。" : "你的資料、你做主。可隨時撤回，系統 24 小時內封存。"}</p>
        </div>
        <button class="gov-pill ${state.lang === "tao" ? "active" : ""}" onclick="toggleLang()">${icon("globe")}${state.lang === "tao" ? "達悟語" : "中文"}</button>
      </div>
      <div class="consent-mini">
        ${consentTiers.map(([tier, , , , st]) => `<span class="consent-chip ${st}">${tier.split(" ")[0]}${labStatus(st)}</span>`).join("")}
      </div>
      <div class="action-list">
        <button class="ghost-btn" onclick="showToast('已開啟雙語同意書（達悟語待審定）')">${icon("clipboard")}查看雙語同意書</button>
        <button class="danger-btn" onclick="showToast('撤回已受理：24h 內封存，停止跨機構共享與研究，並通知駐點')">${icon("shield")}撤回同意</button>
      </div>
    </section>
  `;
}

function residentFamilyHealthCard() {
  return `
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
        ${residentMember("爸", "L3", "血糖追蹤")}
        ${residentMember("媽", "L2", "用藥穩定")}
        ${residentMember("女", "L1", "家屬協助")}
      </div>
      <div class="family-design-panel">
        <div>
          <span>家庭健康設計</span>
          <strong>本季先完成全家健檢、血糖追蹤與到檢協助</strong>
        </div>
        <div class="family-design-metrics">
          ${protocolDimensions.slice(0, 4).map(([label, detail, percent]) => `
            <span><b>${label}</b><small>${detail}</small><i style="--pct:${percent}%"></i></span>
          `).join("")}
        </div>
      </div>
      <div class="progress-bar"><span style="width:68%"></span></div>
      <p class="minor family-card-note">護理師會依問卷與健檢結果更新家庭健康設計，家人只看需要一起完成的下一步。</p>
    </div>
  `;
}

function residentMember(label, level, note) {
  return `<span class="member-pill ${level.toLowerCase()}"><strong>${label}</strong><small>${level} ${note}</small></span>`;
}

function residentTask(title, desc, meta, iconName) {
  return `<div class="task-card"><div class="task-icon">${icon(iconName)}</div><div><strong>${title}</strong><div class="minor">${desc}</div></div><span class="status-pill">${meta}</span></div>`;
}

function residentProtocolSnapshot() {
  return `
    <section class="resident-card protocol-snapshot-card">
      <div class="resident-card-head">
        <div>
          <h3>家戶健康設計 Protocol</h3>
          <p>依附件 P08：七大維度、四級風險、每季回顧</p>
        </div>
        <span class="status-pill green">L3</span>
      </div>
      <div class="dimension-grid">
        ${protocolDimensions.slice(0, 4).map(([label, detail, percent]) => `
          <div class="dimension-chip">
            <strong>${label}</strong>
            <span>${detail}</span>
            <i><b style="width:${percent}%"></b></i>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function residentHealthPathPreview() {
  return `
    <section class="resident-card care-path-card">
      <div class="resident-card-head">
        <div>
          <h3>個人健康路徑設計</h3>
          <p>依照家訪、健檢與檢驗結果安排下一步</p>
        </div>
        <span class="status-pill yellow">進行中</span>
      </div>
      <div class="path-strip">
        ${residentPathStep("問卷", "已完成", 100, "check")}
        ${residentPathStep("健檢", "6/18", 72, "calendar")}
        ${residentPathStep("追蹤", "2 週內", 38, "lab")}
      </div>
      <button class="ghost-btn resident-wide-btn" onclick="setResidentTab('plan')">${icon("arrow")}查看完整照護路徑</button>
    </section>
  `;
}

function residentFamilyModulePreview() {
  return `
    <section class="resident-card module-preview-card">
      <div class="resident-card-head">
        <div>
          <h3>家庭健康設計模組</h3>
          <p>依 P08 家戶風險分層與家庭健康協議啟用</p>
        </div>
      </div>
      <div class="resident-module-list">
        ${residentModule("H2", "慢病穩定", "血壓血糖、拿藥、飲食一起追蹤", 68)}
        ${residentModule("H3", "肺健康", "LDCT 條件確認、戒菸支持", 44)}
        ${residentModule("H8", "到檢協助", "交通、陪同、提醒與船班安排", 82)}
      </div>
    </section>
  `;
}

function residentAiAssistantCard() {
  const smart = smartPlanFor(patients[0])[0];
  return `
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

function residentCarePlan() {
  return `
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
          ${residentTimeline("1", "先補完整問卷", "確認家族史、吸菸年數、交通協助", "今天", "done")}
          ${residentTimeline("2", "完成分齡健檢", "成人健檢、血糖血脂、肝腎功能與癌篩條件", "6/18", "active")}
          ${residentTimeline("3", "檢驗結果追蹤", "血糖偏高由護理師電話追蹤，必要時安排門診", "2 週內", "")}
          ${residentTimeline("4", "家庭健康回饋", "一起更新慢病、肺健康、到檢協助", "1 個月", "")}
        </div>
      </section>
      ${residentFamilyDesignPlan()}
    </div>
  `;
}

function residentFamilyDesignPlan() {
  const pillars = [
    ["慢病追蹤", "爸爸晚餐後步行與血糖紀錄，由家人協助打卡。", 68],
    ["肺健康", "補齊吸菸年數，健檢時確認 LDCT 條件。", 44],
    ["到檢協助", "健檢前一天確認交通、陪同者與空腹提醒。", 82],
  ];
  return `
    <section class="resident-card family-design-card">
      <div class="resident-card-head">
        <div>
          <h3>家庭健康設計</h3>
          <p>照護團隊已把家訪與健檢資料整理成家人可一起完成的照護安排。</p>
        </div>
        <span class="status-pill green">已啟用</span>
      </div>
      <div class="resident-module-list friendly-module-list">
        ${pillars.map(([title, desc, percent]) => `
          <div class="resident-module friendly-module">
            <span class="module-code">${title.slice(0, 1)}</span>
            <span class="module-copy">
              <strong>${title}</strong>
              <small>${desc}</small>
              <span class="mini-meter"><span style="width:${percent}%"></span></span>
            </span>
          </div>
        `).join("")}
      </div>
      <div class="dimension-grid all-dimensions">
        ${protocolDimensions.map(([label, detail, percent]) => `
          <div class="dimension-chip">
            <strong>${label}</strong>
            <span>${detail}</span>
            <i><b style="width:${percent}%"></b></i>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function residentProtocolDashboard() {
  return `
    <section class="panel protocol-panel">
      <div class="panel-header"><div><h2 class="panel-title">P08 家庭健康設計</h2><p class="panel-note">從個案管理升級為一戶一視圖</p></div></div>
      <div class="protocol-layout">
        <div class="protocol-score">
          <strong>L3</strong>
          <span>多重慢病家戶</span>
          <small>建議每週 1-2 次追蹤</small>
        </div>
        <div class="risk-levels">
          ${riskLevels.map(([code, label, freq, level]) => `
            <button class="risk-level ${level}" onclick='showToast(${jsArg(`${code} ${label}：${freq}`)})'>
              <span>${code}</span>
              <strong>${label}</strong>
              <small>${freq}</small>
            </button>
          `).join("")}
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

function lanyuVillageMap() {
  return `
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
        ${villageServices.map((village) => `
          <button class="map-pin ${village.level.toLowerCase()}" style="--x:${village.x}%; --y:${village.y}%" onclick='showToast(${jsArg(`${village.name}：${village.focus}`)})'>
            <span>${village.name}</span>
            <small>${village.level}</small>
          </button>
        `).join("")}
      </div>
      <div class="map-layer-legend">
        <span>地理層</span><span>健康層</span><span>資源層</span><span>脆弱度層</span>
      </div>
      <div class="village-service-list">
        ${villageServices.map((village) => `
          <button onclick='showToast(${jsArg(`${village.name}部落 ${village.households} 戶：${village.focus}`)})'>
            <strong>${village.name}</strong>
            <span>${village.households} 戶</span>
            <em>${village.focus}</em>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function residentReferralChain() {
  const steps = [
    ["發現需求", "家訪、問卷或檢驗異常"],
    ["溫暖轉介", "衛生所、IDS、長照、教會志工"],
    ["一週追蹤", "確認到診、障礙與後續建議"],
  ];
  return `
    <section class="panel referral-panel">
      <div class="panel-header"><div><h2 class="panel-title">轉介責任鏈</h2><p class="panel-note">依 P08：不是開單後結束，而是持續追蹤</p></div></div>
      <div class="referral-chain">
        ${steps.map(([title, detail], index) => `
          <div>
            <span>${index + 1}</span>
            <strong>${title}</strong>
            <small>${detail}</small>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function residentPathStep(title, meta, percent, iconName) {
  return `
    <div class="path-step">
      <span class="task-icon">${icon(iconName)}</span>
      <strong>${title}</strong>
      <small>${meta}</small>
      <span class="mini-meter"><span style="width:${percent}%"></span></span>
    </div>
  `;
}

function residentTimeline(num, title, desc, time, stateClass) {
  return `
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

function residentModule(code, title, desc, percent) {
  return `
    <button class="resident-module" onclick="showToast('${code} ${title} 已加入家庭健康設計')">
      <span class="module-code">${code}</span>
      <span class="module-copy">
        <strong>${title}</strong>
        <small>${desc}</small>
        <span class="mini-meter"><span style="width:${percent}%"></span></span>
      </span>
    </button>
  `;
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
      <section class="resident-card ai-resident-card inline-ai">
        <div class="resident-card-head">
          <div>
            <h3>AI問卷助理</h3>
            <p>會把答案整理成家訪摘要、照護待辦與家庭健康模組。</p>
          </div>
        </div>
      </section>
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
      <section class="resident-card ai-resident-card inline-ai">
        <div class="resident-card-head">
          <div>
            <h3>AI結果助理</h3>
            <p>把檢驗值翻成看得懂的追蹤重點，並自動提醒護理師。</p>
          </div>
          <span class="status-pill yellow">需追蹤</span>
        </div>
      </section>
      <div class="task-card"><div class="task-icon">${icon("alert")}</div><div><strong>爸爸：血糖偏高</strong><div class="minor">請 2 週內由護理師電話追蹤，先不用緊張。</div></div><span class="status-pill yellow">需追蹤</span></div>
      <div class="task-card"><div class="task-icon">${icon("check")}</div><div><strong>媽媽：尿液正常</strong><div class="minor">維持喝水與規律回診。</div></div><span class="status-pill green">正常</span></div>
      <div class="task-card"><div class="task-icon">${icon("calendar")}</div><div><strong>LDCT 條件待確認</strong><div class="minor">需補填吸菸年數和家族史。</div></div><span class="status-pill">補資料</span></div>
    </div>
  `;
}

function renderAiDraftDrawer() {
  const draft = state.aiDraft;
  if (!draft) return "";

  return `
    <aside class="ai-draft-drawer" aria-label="AI草稿預覽">
      <div class="ai-draft-toolbar">
        <div>
          <span class="ai-kicker">Mock 產出預覽</span>
          <h2>${draft.title}</h2>
          <p>${draft.subtitle}</p>
        </div>
        <button class="ghost-btn ai-draft-close" onclick="closeAiDraft()" aria-label="關閉AI草稿">${icon("check")}關閉</button>
      </div>
      <div class="ai-draft-meta">
        <strong>${draft.patientName}</strong>
        <span>${draft.patientId}</span>
        <span>${draft.createdAt}</span>
      </div>
      <div class="ai-draft-chip-row">
        ${draft.chips.map((chip) => `<span class="tag">${chip}</span>`).join("")}
      </div>
      ${draft.hitl ? `
      <div class="ai-gov-strip">
        <span class="hitl-badge">${draft.hitl}</span>
        <span class="model-badge">${draft.model}</span>
        <span class="status-pill ${draft.confidence.startsWith("高") ? "green" : "yellow"}">信心：${draft.confidence}</span>
        <span class="tag">${draft.interactionId}</span>
      </div>
      <section class="ai-draft-section xai-section">
        <h3>${icon("search")}為什麼這個建議？（XAI）</h3>
        <p>${draft.why}</p>
      </section>` : ""}
      <div class="ai-draft-content">
        ${draft.sections.map(([title, body]) => `
          <section class="ai-draft-section">
            <h3>${title}</h3>
            <p>${body}</p>
          </section>
        `).join("")}
      </div>
      <div class="ai-draft-actions">
        <button class="btn" onclick="applyAiDraft()">${icon("clipboard")}套用到工作區草稿</button>
        <button class="ghost-btn" onclick="showToast('已複製AI Mock草稿內容')">${icon("check")}複製內容</button>
      </div>
    </aside>
  `;
}

function renderModulePicker() {
  if (!state.modulePicker) return "";
  const activeCodes = selectedPatient().householdTags.map((tag) => tag.match(/^H\d+/)?.[0]).filter(Boolean);
  return `
    <div class="module-modal-backdrop" onclick="closeModulePicker()" role="presentation">
      <section class="module-modal" onclick="event.stopPropagation()" role="dialog" aria-modal="true" aria-label="選擇家庭健康設計">
        <div class="module-modal-head">
          <div>
            <span class="ai-kicker">家庭健康設計選擇器</span>
            <h2>選擇要啟用的照護情境</h2>
            <p>以名稱與任務情境挑選，系統會在後台保留模組代碼，現場不用讀代碼表。</p>
          </div>
          <button class="ghost-btn" onclick="closeModulePicker()">${icon("check")}關閉</button>
        </div>
        <div class="module-option-grid">
          ${householdModules.map(([code, title, detail]) => {
            const active = activeCodes.includes(code);
            return `
              <button class="module-option ${active ? "active" : ""}" onclick='selectHouseholdModule(${jsArg(code)})'>
                <span class="module-option-code">${code}</span>
                <span>
                  <strong>${title}</strong>
                  <small>${detail}</small>
                </span>
                <em>${active ? "已啟用" : "選擇"}</em>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    </div>
  `;
}

/* =======================================================================
   P11 擴充層：五大 MVP 模組 + 八大 Agent + 三軌治理（前端展示）
   沿用既有 design tokens 與類別命名，維持 near-clear-glass 風格
   ======================================================================= */

// ---- 五級存取權限（RBAC L1–L5）----
const accessLevels = [
  { key: "L1", role: "clinical", name: "照護司核心圈", scope: "全蘭嶼去識別化統計", who: "政策視圖・簽核・倫理委員會", icon: "shield", nav: "dashboard" },
  { key: "L2", role: "clinical", name: "PMO / 衛生局", scope: "計畫 KPI、預算、人力", who: "戰情視圖・PMO 治理看板", icon: "chart", nav: "pmo" },
  { key: "L3", role: "clinical", name: "駐點主管", scope: "所轄居民全貌（含 PII）", who: "駐點視圖・異常簽核・合併拆分", icon: "users", nav: "track" },
  { key: "L4", role: "clinical", name: "FNP 一線", scope: "已分派個案", who: "家訪 App・新增訪視・標記完成", icon: "lab", nav: "workspace" },
  { key: "L5", role: "resident", name: "居民", scope: "自身資料", who: "健檢結果・撤回同意・可攜", icon: "home", nav: "home" },
];
function currentLevel() {
  return accessLevels.find((l) => l.key === state.accessKey) || accessLevels[3];
}
const LEVEL_ORDER = { L1: 1, L2: 2, L3: 3, L4: 4, L5: 5 };
// 是否具備「至少某一治理層級」（數字越小權限越高）
function hasGov(maxKey) {
  return LEVEL_ORDER[state.accessKey] <= LEVEL_ORDER[maxKey];
}

// ---- 同意四層 ----
const consentTiers = [
  ["L1 基本資料", "戶籍、聯絡", "Opt-in", "v2.1", "ok"],
  ["L2 健檢資料", "檢驗、影像", "Opt-in＋書面", "v2.1", "ok"],
  ["L3 跨機構共享", "19 部立、台東馬偕等", "個別簽核", "v2.0", "watch"],
  ["L4 研究使用", "IRB 通過", "個別簽核可細分", "—", "pending"],
];

// ---- 異常分級規則（紅橙黃綠 + SLA）----
const abnormalRules = [
  ["紅", "red", "收縮壓 ≥180、空腹血糖 ≥300、Cr ≥4", "24 小時內聯繫", "醫師簽核（H2）觸發轉介"],
  ["橙", "orange", "收縮壓 160–179、空腹血糖 180–299、HbA1c ≥10", "7 天內家訪", "排入家訪派工"],
  ["黃", "yellow", "收縮壓 140–159、空腹血糖 126–179", "14 天內衛教", "衛教＋複檢提醒"],
  ["綠", "green", "邊緣值或正常", "例行年度追蹤", "年度追蹤"],
];

// ---- 追蹤五態狀態機 ----
const trackStates = [
  ["已派工", "派工給 FNP，待家訪", 22, "assigned"],
  ["已訪視", "家訪完成，待複檢或轉介", 31, "visited"],
  ["已複檢", "複檢採檢完成，待結果", 14, "rechecked"],
  ["已穩定", "可關閉或轉長期管理", 18, "stable"],
  ["失聯", "連續 2 次無法聯繫，升級 PMO", 5, "lost"],
];

// ---- PMO 九大里程碑（M1–M9 Gantt）----
const pmoMilestones = [
  ["M1", "PMO 成立 + IT 小組就位", 5, 6, "done", "—"],
  ["M2", "三包採購完成決標", 6, 7, "active", "A/B/C 包"],
  ["M3", "主索引 MPI Alpha", 7, 8, "", "模組一"],
  ["M4", "健檢追蹤閉環 Alpha", 8, 9, "", "模組二"],
  ["M5", "PMO 看板 + 儀表板 Beta", 9, 10, "", "模組三、四"],
  ["M6", "八大 Agent 試營運", 10, 11, "", "Agent 全部"],
  ["M7", "知識問答庫 Beta", 10, 11, "", "模組五"],
  ["M8", "滲透測試 + AI 紅隊", 11, 12, "", "C 包"],
  ["M9", "年度檢討 + 116 送審", 12, 13, "", "全"],
];

// ---- 跨機構承諾看板 ----
const pmoCommitments = [
  ["桃園醫院", "107 年健檢資料一次性匯入 + 日批次 FHIR", "進行中", "warn"],
  ["19 家部立醫院", "本島軌健檢結果 FHIR 回傳", "洽談中", ""],
  ["台東馬偕", "異常追蹤與急診轉介回報", "已承諾", "ok"],
  ["台東大學", "資料分析與人才培育協作", "已承諾", "ok"],
  ["蘭嶼鄉公所", "場域、動員與部落會議協調", "進行中", "warn"],
  ["教會節點", "雙語同意書宣導與名單動員", "已承諾", "ok"],
];

// ---- 預算燃燒率 ----
const pmoBudget = { total: 1100, used: 372, packages: [
  ["A 包 系統開發", 600, 245, "55%"],
  ["B 包 AI Agent", 300, 88, "27%"],
  ["C 包 資安合規", 200, 39, "18%"],
] };

// ---- 風險登記簿（R-01…）----
const pmoRisks = [
  ["R-02", "廠商過度承諾、低估離島挑戰", "高", "高", "招標必載「離島實地驗證」", "採購組"],
  ["R-04", "居民同意覆蓋率不足", "高", "中", "教會節點＋雙語同意書＋部落會議", "FNP 主管"],
  ["R-05", "個資外洩", "極高", "低", "6 道防線＋滲透＋紅隊", "資安官"],
  ["R-06", "LLM 幻覺造成誤導", "高", "中", "第八部規範＋紅隊每季", "AI 治理"],
  ["R-07", "達悟語審定瓶頸", "中", "高", "≥2 位部落顧問常駐諮詢", "PMO"],
  ["R-08", "颱風／海纜／停電造成資料損失", "高", "中", "邊緣節點＋衛星備援＋紙本流程", "IT 小組"],
];

// ---- 三層指揮節點 ----
const commandNodes = [
  ["中央", "照護司辦公室", "政策視圖・跨案匯流", "online"],
  ["前進", "台東前進指揮所", "後勤協調・本島軌調度・邊緣快取", "online"],
  ["駐點", "蘭嶼駐點指揮所", "衛生所／居護所／FNP・離線可用 7 天", "edge"],
];

// ---- 模組四：三顆數據核彈 + 三級對比 ----
const dataNukes = [
  ["糖尿病資料底盤", "3.36%", "37.7%", "健保登錄 vs 健檢實測，落差 11 倍"],
  ["罹病提前", "6–8 歲", "提早", "高血壓 6.2 年、糖尿病 6.8 年、中風 7.9 年"],
  ["醫療可近性", "5.81", "人/萬", "每萬人口醫師數，約全國 1/6；113 年空中轉送 38 件"],
];
const threeLevelCompare = [
  ["健保登錄", 3.36, "violet"],
  ["全國平均", 9.8, "sun"],
  ["健檢實測", 37.7, "reef"],
];

// ---- 模組五：知識問答庫（K1/K2/K3 + 達悟語）----
const knowledgeLayers = [
  ["K1", "公開層", "居民、媒體、外部", "FAQ、政策摘要、聯絡資訊、活動排程", "L5"],
  ["K2", "內部層", "FNP、護理師、行政、合作機構", "SOP、Protocol、表單範本、會議結論", "L4"],
  ["K3", "機敏層", "PMO、Committee", "決策邏輯、未公開預算、風險評估", "L2"],
];
const knowledgeBase = [
  { layer: "K1", q: "健檢當天要帶什麼？", zh: "請攜帶健保卡與身分證件；若需空腹抽血，前一晚 10 點後勿進食，可少量喝水。如需交通協助，可在問卷勾選或聯絡駐點。", tao: "〔達悟語・待部落顧問審定〕Ikongo so panci… 健保卡 ori… —（審定號：TAO-K1-pending）", src: "P06 健檢 Protocol §2；FAQ 維護表", conf: "高", taoCert: "待審定" },
  { layer: "K1", q: "我可以撤回同意嗎？", zh: "可以。您可在民眾端一鍵撤回，系統 24 小時內封存資料並停止跨機構共享與研究使用；撤回紀錄會留存以供日後重新詢問。", tao: "〔達悟語・待部落顧問審定〕—（審定號：TAO-K1-pending）", src: "個資法 §11；P11 §17.3 撤回機制", conf: "高", taoCert: "待審定" },
  { layer: "K2", q: "紅級異常的處理流程為何？", zh: "紅級（收縮壓≥180／空腹血糖≥300／Cr≥4）須 24 小時內聯繫，並由 L3 醫師/PA 簽核（HITL H2）後觸發轉介：蘭嶼→台東馬偕→北部醫學中心。", tao: "—", src: "P06 附件 B；P11 §9.4 異常分級規則", conf: "高", taoCert: "—" },
  { layer: "K2", q: "FNP 家訪派工如何排序？", zh: "依風險分級（紅>橙>黃）＋地理路線＋人員空檔，由排班 Agent（H1）給排序建議，主管決定；駐島巡訪目標 ≤67.6 日、家訪日均 6 戶。", src: "P11 §14.2 排班 Agent", conf: "中", taoCert: "—" },
  { layer: "K3", q: "本案 IT/AI 治理中樞預算切分為何？", zh: "建議三包：A 包系統開發 50–55%、B 包 AI Agent 25–30%、C 包資安合規 15–20%；一次性合計約 NT$ 8.0–13.4M（以核定版為準）。", src: "P11 §52、§58 預算切分", conf: "中", taoCert: "—" },
];

// ---- 八大 AI Agent（完整規格）----
const agents = [
  { code: "PMO", name: "PMO Agent", sub: "進度治理", icon: "chart", hitl: "H2 + H4", model: "M 中型 LLM + 規則", mod: "模組三", conf: "高",
    task: "追蹤待辦、識別延誤、提示風險、草擬週報", out: "待辦清單、延誤清單、風險摘要、週報草稿",
    cant: ["不直接寄送週報", "不直接關閉決議", "不評鑑人員績效"], kpi: "週報草擬時間 ↓≥50%；延誤召回率 ≥90%" },
  { code: "排班", name: "排班 Agent", sub: "雙軌調度", icon: "calendar", hitl: "H1", model: "規則 + 路徑最佳化（OR-tools）", mod: "模組三/二", conf: "高",
    task: "FNP 家訪排班、健檢人力配置、雙軌調度", out: "排班建議（含理由說明）",
    cant: ["不直接修改人事系統", "不直接派工到個人"], kpi: "駐島 ≤67.6 日；家訪日均 6 戶達成率 ≥90%" },
  { code: "外展", name: "外展 Agent", sub: "動員溝通", icon: "users", hitl: "H2", model: "M 中型 LLM + 規則", mod: "模組二/五", conf: "中",
    task: "名單動員、未到檢追蹤、通知節奏、補檢名單", out: "通知文案草稿（中／達悟語）、聯絡優先序",
    cant: ["不直接發訊息／撥電話", "不擅自代教會語氣或部落會議口吻"], kpi: "未到檢補回率 ≥70%；族語通知覆蓋 ≥80%" },
  { code: "分流", name: "分流 Agent", sub: "風險識別", icon: "alert", hitl: "H1（紅級 H2）", model: "規則引擎為主 + ML 輔（排序）", mod: "模組二/四", conf: "高",
    task: "健檢結果風險分層、家戶風險聚合、優先個案標記", out: "4 級風險標記、家戶風險積分、人工複核清單",
    cant: ["絕對不做疾病診斷", "不做用藥建議", "不做預後預測"], kpi: "紅級規則命中率 ≥95%；無漏報嚴重個案" },
  { code: "追蹤", name: "追蹤 Agent", sub: "個案銜接", icon: "check", hitl: "H1 + H4", model: "規則 + M 中型 LLM", mod: "模組二", conf: "高",
    task: "複檢追蹤、家訪狀態同步、轉介完成核對", out: "待追蹤清單、失聯提示、可關閉個案建議",
    cant: ["不擅自關閉個案", "失聯升級必須留證"], kpi: "追蹤完成率 ≥80%；失聯漏接率 ≤5%" },
  { code: "財務", name: "財務 Agent", sub: "核銷控管", icon: "shield", hitl: "H4", model: "規則引擎（不需 LLM）", mod: "模組三", conf: "高",
    task: "預算燃燒率、缺件提醒、異常費用識別", out: "燃燒率報表、缺件清單、異常告警",
    cant: ["不直接動撥預算", "不簽核採購", "不評斷個別人員"], kpi: "偏離 5% 內告警準時率 100%；缺件 7 日補齊 ≥90%" },
  { code: "洞察", name: "洞察 Agent", sub: "資料分析", icon: "chart", hitl: "H2", model: "L 大型 LLM + 統計檢定", mod: "模組四/三", conf: "中",
    task: "月報、亮點／瓶頸識別、決策建議草擬", out: "月報草稿、洞察卡片、決策建議草稿",
    cant: ["不對個人下結論", "不做政策定調", "不揭露個資"], kpi: "月報草擬 ↓≥50%；決策建議採納率 ≥60%" },
  { code: "問答", name: "問答 Agent", sub: "知識查詢", icon: "book", hitl: "H0", model: "RAG + M 中型 LLM", mod: "模組五", conf: "高",
    task: "居民、FNP、行政、合作機構自然語言問答", out: "答案 + 來源引用 + 信心分級",
    cant: ["不知道就說不知道", "不答臨床診斷", "不洩個資", "不答未審定族語"], kpi: "來源引用率 100%；誤答率 ≤3%；達悟語審定 ≥90%" },
];

// ---- LLM 邊界：負面清單 ----
const llmNegativeList = [
  ["N1", "LLM 直接給臨床診斷或處方建議", "醫療法、HITL H5 紅線"],
  ["N2", "用本案居民個資訓練／微調公開模型", "個資法、合約違約"],
  ["N3", "個資（明文）送出政府雲外的 LLM API", "個資法＋衛福部資料管理規範"],
  ["N4", "LLM 自主代發訊息／公文／通知", "必須經 HITL 簽核"],
  ["N5", "LLM 編造引用來源", "知識問答庫紅線"],
  ["N6", "LLM 答未經部落顧問審定的族語", "文化適切性紅線"],
  ["N7", "LLM 自主做預後預測（壽命、惡化機率）", "倫理紅線"],
  ["N8", "LLM 對個別人員做績效評斷", "人事紅線"],
  ["N9", "LLM 接受未驗證角色扮演指令", "Prompt Injection 防護"],
];

// ---- 接口目錄（節錄）----
const interfaceCatalog = [
  ["EXT-01", "健保署 NHI MediCloud", "健保 VPN", "99.5%", "即時", "08:14"],
  ["EXT-03", "桃園醫院 HIS", "FHIR R4 + ETL", "日批次", "日", "02:00"],
  ["EXT-05", "台東馬偕 HIS", "FHIR R4", "日批次", "日", "02:10"],
  ["EXT-09", "內政部戶政", "政府服務匯流", "月", "月", "05/01"],
  ["EXT-02", "衛福部 MyData / TWHL7", "OAuth2 + FHIR", "同意觸發", "事件", "07:55"],
];

// ---- 資安六道防線 ----
const securityLines = [
  ["第 1 道", "網路", "防火牆、IDS/IPS、政府雲 VPC、零信任"],
  ["第 2 道", "主機", "硬化（CIS Benchmark）、EDR、漏洞掃描"],
  ["第 3 道", "應用", "OWASP Top 10、安全 SDLC、相依套件掃描"],
  ["第 4 道", "資料", "加密（at-rest/in-transit/in-use）、去識別、遮罩"],
  ["第 5 道", "稽核", "日誌集中、異常偵測、SIEM"],
  ["第 6 道", "人員", "教育訓練、權責分工、最小授權"],
];
const incidentLevels = [
  ["嚴重", "red", "重大個資外洩、勒索軟體", "1 小時內衛福部＋數發部資安署；72h 報告", "24h 居民通知"],
  ["高", "orange", "核心服務中斷 > 4 小時", "4 小時內 PMO＋Committee", "24h 公告"],
  ["中", "yellow", "漏洞、未授權存取嘗試", "24 小時內 IT 小組", "—"],
  ["低", "green", "失敗登入、配置漂移", "週報", "—"],
];

// ---- 稽核軌（示範）----
const auditTrail = [
  ["08:42", "L3 駐點主管", "個案下鑽 P-00018", "同意旗標 ✓", "模組四"],
  ["08:30", "AI 分流 Agent", "紅級標記 1 件（H1）", "規則 v2.1", "模組二"],
  ["08:12", "L4 FNP", "新增家訪紀錄 H-東清-014", "已分派", "工作區"],
  ["07:58", "L2 PMO", "週報草擬簽核（H2）", "PMO Agent", "模組三"],
  ["07:40", "系統", "離線快取同步完成（7 天備援）", "邊緣節點", "資安"],
];

/* ---------------- 全域治理列（角色／語言／離線） ---------------- */
function governanceBar() {
  const lv = currentLevel();
  return `
    <div class="gov-bar" aria-label="治理狀態列">
      <div class="gov-left">
        <span class="gov-rbac"><span class="lv-badge lv-${lv.key.toLowerCase()}">${lv.key}</span>${lv.name}</span>
        <span class="gov-sep"></span>
        <span class="gov-scope">${icon("lock")}可視範圍：${lv.scope}</span>
      </div>
      <div class="gov-right">
        <button class="gov-pill ${state.lang === "tao" ? "active" : ""}" onclick="toggleLang()" title="中文 / 達悟語">${icon("globe")}${state.lang === "tao" ? "達悟語" : "中文"}</button>
        <span class="gov-pill online" title="離島離線優先：可離線 7 天">${icon("shield")}離線就緒 7 天</span>
        <span class="gov-pill" title="共用 Metadata 字典版本">字典 v2.1@2026-05-15</span>
      </div>
    </div>
  `;
}

function toggleLang() {
  state.lang = state.lang === "tao" ? "zh" : "tao";
  showToast(state.lang === "tao" ? "已切換達悟語（族語答覆須部落顧問審定）" : "已切換中文");
}

/* ---------------- 醫護端：新導覽 + 路由 ---------------- */
const clinicalNavItems = [
  ["dashboard", "chart", "戰情儀表板", "模組四"],
  ["mpi", "users", "居民主索引", "模組一"],
  ["track", "alert", "追蹤閉環", "模組二"],
  ["workspace", "clipboard", "工作區", "個案"],
  ["pmo", "calendar", "PMO 治理", "模組三"],
  ["knowledge", "book", "知識問答", "模組五"],
  ["agents", "robot", "AI Agent", "八大"],
  ["governance", "shield", "治理資安", "RBAC"],
];

function setClinicalNav(nav) {
  state.clinicalNav = nav;
  state.aiDraft = null;
  render();
}

function renderClinicalRail() {
  return `
    <nav class="rail clinical-primary-rail clinical-rail-wide" aria-label="醫護端主選單">
      ${clinicalNavItems.map(([nav, ic, label, tagText]) => `
        <button class="${state.clinicalNav === nav ? "active" : ""}" title="${label}" onclick="setClinicalNav('${nav}')">
          ${icon(ic)}<span>${label}</span><em>${tagText}</em>
        </button>
      `).join("")}
    </nav>
  `;
}

function renderClinicalStage(patient) {
  switch (state.clinicalNav) {
    case "mpi": return renderMpiModule(patient);
    case "track": return renderTrackModule(patient);
    case "workspace": return renderClinicalWorkspace(patient);
    case "pmo": return renderPmoModule();
    case "knowledge": return renderKnowledgeModule();
    case "agents": return renderAgentsModule();
    case "governance": return renderGovernanceModule();
    default: return renderDecisionDashboard(patient);
  }
}

/* ============ 模組四：四視圖決策儀表板 ============ */
function renderDecisionDashboard(patient) {
  const views = [
    ["policy", "政策視圖", "照護司 / 署長", hasGov("L2")],
    ["war", "戰情視圖", "PMO / Committee", hasGov("L3")],
    ["station", "駐點視圖", "衛生所所長 / FNP 主管", true],
  ];
  // 確保渲染的視圖符合權限（否則退回駐點視圖）
  const allowedNow = views.find((v) => v[0] === state.dashboardView && v[3]);
  if (!allowedNow) state.dashboardView = "station";
  return `
    <section class="clinical-dashboard module-stage">
      <div class="module-stage-head">
        <div>
          <span class="ai-kicker">模組四・風險分層決策儀表板</span>
          <h2>四視圖決策中樞：點一下就看到下一步</h2>
          <p>政策／戰情／駐點／居民四視圖各自獨立；個案下鑽須 L3＋同意旗標＋稽核。</p>
        </div>
        <div class="view-switch">
          ${views.map(([key, label, who, allowed]) => `
            <button class="${state.dashboardView === key ? "active" : ""} ${allowed ? "" : "locked"}" onclick="${allowed ? `setDashboardView('${key}')` : `showToast('權限不足：${label}需 L2/L3 以上')`}">
              ${allowed ? "" : icon("lock")}<strong>${label}</strong><small>${who}</small>
            </button>
          `).join("")}
          <button onclick="setClinicalNav('home') || showToast('居民視圖：請於民眾端登入（L5）')" class="ghost-view" title="居民視圖在民眾端">居民視圖↗</button>
        </div>
      </div>
      ${state.dashboardView === "policy" ? renderPolicyView() : state.dashboardView === "station" ? renderStationView(patient) : renderWarView(patient)}
    </section>
  `;
}

function renderPolicyView() {
  return `
    <section class="policy-view">
      <div class="nuke-grid" aria-label="三顆數據核彈">
        ${dataNukes.map(([title, big, small, note]) => `
          <article class="nuke-card">
            <span class="nuke-kicker">${title}</span>
            <div class="nuke-num"><strong>${big}</strong><span>${small}</span></div>
            <p>${note}</p>
            <button class="xai-btn" onclick="showToast('資料來源：2022 成人預防保健盛行率報告（字典 v2.1）')">${icon("search")}為什麼？</button>
          </article>
        `).join("")}
      </div>
      <section class="panel compare-panel">
        <div class="panel-header"><div><h2 class="panel-title">糖尿病異常率三級對比</h2><p class="panel-note">健保登錄 vs 全國平均 vs 健檢實測（Y 軸已對齊，單位 %）</p></div></div>
        <div class="compare-bars">
          ${threeLevelCompare.map(([label, val, color]) => `
            <div class="compare-row">
              <span class="compare-label">${label}</span>
              <span class="compare-track"><span class="compare-fill ${color}" style="width:${(val / 40) * 100}%"></span></span>
              <strong>${val}%</strong>
            </div>
          `).join("")}
        </div>
        <p class="minor">落差達 11 倍：健保登錄 3.36% 嚴重低估在地糖尿病盛行（健檢實測 37.7%），印證「資料底盤崩塌」核心命題。</p>
      </section>
      <div class="kpi-strip">
        ${[["受檢率", "71%", 71], ["追蹤完成率", "78%", 78], ["家訪率", "84%", 84], ["失聯率", "5%", 5], ["預算燃燒率", "34%", 34]].map(([l, v, p]) => `
          <div class="kpi-card"><span>${l}</span><strong>${v}</strong><i><b style="width:${p}%"></b></i></div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderStationView(patient) {
  return `
    <section class="station-view">
      <div class="station-metrics">
        ${[["今日家訪", "18", "完成 12 / 未遇 4 / 再訪 2"], ["異常待處理", "27", "紅 8 / 橙 11 / 黃 8"], ["失聯個案", "5", "需 PMO 介入"], ["高風險家戶", "39", "P0/P1/P6/P9"]].map(([l, v, n]) => `
          <button class="stat" onclick="setClinicalNav('track')"><div class="stat-label">${l}</div><div class="stat-value">${v}</div><small>${n}</small></button>
        `).join("")}
      </div>
      ${renderTodayWorklist()}
      ${lanyuVillageMap()}
    </section>
  `;
}

function renderWarView(patient) {
  // 沿用既有戰情內容
  return `
    ${renderDashboardHero(patient)}
    <section class="dashboard-stat-strip" aria-label="各項統計卡片">${renderStats()}</section>
    ${renderPmoMiniStrip()}
    ${renderTodayWorklist()}
    ${lanyuVillageMap()}
    ${renderClinicalSupportModules(patient)}
  `;
}

function renderPmoMiniStrip() {
  const pct = Math.round((pmoBudget.used / pmoBudget.total) * 100);
  return `
    <section class="panel pmo-mini">
      <div class="panel-header"><div><h2 class="panel-title">PMO 戰情速覽</h2><p class="panel-note">跨機構承諾、預算燃燒、風險（詳見 PMO 治理）</p></div>
        <button class="ghost-btn" onclick="setClinicalNav('pmo')">${icon("arrow")}前往 PMO 治理</button></div>
      <div class="pmo-mini-grid">
        <div><span>本月燃燒率</span><strong>${pct}%</strong><i><b style="width:${pct}%"></b></i></div>
        <div><span>跨機構承諾</span><strong>${pmoCommitments.filter((c) => c[2] === "已承諾").length}/${pmoCommitments.length}</strong><small>已承諾</small></div>
        <div><span>開放風險</span><strong>${pmoRisks.length}</strong><small>登記簿追蹤中</small></div>
        <div><span>里程碑</span><strong>M2</strong><small>三包採購決標中</small></div>
      </div>
    </section>
  `;
}

/* ============ 模組一：居民主索引 MPI ============ */
function renderMpiModule(patient) {
  const tabs = [["index", "主索引查詢"], ["household", "一戶一視圖"], ["consent", "同意管理"], ["dedup", "重複偵測"]];
  return `
    <section class="module-stage">
      <div class="module-stage-head">
        <div>
          <span class="ai-kicker">模組一・居民主索引 MPI</span>
          <h2>一人一檔 ＋ 一戶一視圖</h2>
          <p>三鍵交叉（身分證＋NHI＋自訂 ID，單向加密）為其他四模組唯一參照；雙軌（在地／本島）統一索引。</p>
        </div>
        <div class="mpi-cover-cards">
          ${[["一人一檔覆蓋", "95%"], ["一戶一視圖", "90%"], ["重複率", "0.4%"], ["同意旗標完整", "100%"]].map(([l, v]) => `<div><strong>${v}</strong><span>${l}</span></div>`).join("")}
        </div>
      </div>
      <div class="tabs module-tabs">${tabs.map(([k, l]) => `<button class="${state.mpiTab === k ? "active" : ""}" onclick="setMpiTab('${k}')">${l}</button>`).join("")}</div>
      <div class="module-body">${renderMpiBody(patient)}</div>
    </section>
  `;
}
function renderMpiBody(patient) {
  if (state.mpiTab === "household") return renderHouseholdView(patient);
  if (state.mpiTab === "consent") return renderConsentManager(patient);
  if (state.mpiTab === "dedup") return renderDedupReview();
  return renderMpiIndex();
}
function renderMpiIndex() {
  const subIndex = [["一般居民", patients.length], ["核廢場工人", 0], ["訪客／非設籍", 0], ["未成年", 1]];
  return `
    <div class="section-grid">
      <div class="field-block wide">
        <h3>主索引查詢（FNP / 衛生所主管）</h3>
        <div class="searchbox"><span class="filter-pill">在地軌 2,259</span><span class="filter-pill">本島軌 2,760</span><input value="${state.query}" oninput="state.query=this.value; render()" placeholder="查身分證末四碼 / NHI / 自訂 ID / 姓名" /></div>
        <div class="table-scroll">
          <table class="lab-table mpi-table">
            <thead><tr><th>主索引 ID</th><th>三鍵（遮罩）</th><th>姓名</th><th>家戶</th><th>軌別</th><th>同意</th></tr></thead>
            <tbody>
              ${patients.filter((p) => `${p.name}${p.id}${p.village}`.includes(state.query)).map((p) => `
                <tr onclick="selectVisualPatient('${p.id}','overview')" style="cursor:pointer">
                  <td class="num">${p.id}</td>
                  <td class="num">ID ****${p.id.slice(-3)} · NHI ****${(p.age * 7) % 10000} · 🔒</td>
                  <td>${p.displayName}</td>
                  <td>${p.household}</td>
                  <td>${p.village === "野銀" || p.village === "東清" ? "在地" : "在地"}</td>
                  <td>${labStatus(p.consent.includes("待") ? "pending" : "ok")}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="info-block">
        <h3>特殊子索引</h3>
        <div class="check-list">${subIndex.map(([l, n]) => `<div class="check-item"><span class="box">${icon("users")}</span><div>${l}<div class="minor">與一般居民區隔</div></div><span class="status-pill">${n}</span></div>`).join("")}</div>
      </div>
      <div class="info-block">
        <h3>HITL 與 RBAC</h3>
        <p class="minor">新增／合併／拆分主索引：須 L3 駐點主管簽核（L4 僅能提送）。跨機構查詢個資：須同意旗標 ＋ L3 簽核。撤回同意：L5 居民自助即可，須通知 L3。</p>
      </div>
    </div>
  `;
}
function renderHouseholdView(patient) {
  const members = patients.filter((p) => p.household === patient.household);
  const roster = members.length > 1 ? members : [patient, { displayName: "夏曼・配偶", age: 59, sex: "女", level: "黃", conditions: ["高血壓"] }, { displayName: "夏曼・孫", age: 12, sex: "男", level: "綠", conditions: ["近視"] }];
  return `
    <div class="section-grid">
      <div class="field-block wide household-head">
        <div><span class="ai-kicker">一戶一視圖</span><h3>${patient.household}・${patient.village}部落</h3><p class="minor">戶長 ${patient.displayName}｜${roster.length} 名成員｜鄰里碼＋戶長 ID 聚合（支援多戶共用家屋）</p></div>
        <span class="status-pill ${patient.level === "橘" ? "yellow" : "green"}">家戶風險 ${patient.risk}</span>
      </div>
      <div class="check-block wide">
        <h3>家戶成員 roster</h3>
        <div class="household-roster">
          ${roster.map((m) => `
            <div class="roster-card">
              <span class="patient-avatar">${m.displayName.slice(0, 1)}</span>
              <div><strong>${m.displayName}</strong><small>${m.age} 歲・${m.sex}</small></div>
              <div class="roster-cond">${(m.conditions || []).slice(0, 2).map((c) => `<span class="tag">${c}</span>`).join("") || "<span class='minor'>—</span>"}</div>
              <span class="status-pill ${m.level === "橘" ? "yellow" : m.level === "紅" ? "red" : "green"}">${m.level || "綠"}</span>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="info-block"><h3>家戶慢病樹</h3><p class="minor">跨代風險：高血壓（戶長＋配偶）、糖尿病（戶長）、近視（孫）。建議啟用 H2 慢病穩定、H5 兒少發展。</p></div>
      <div class="info-block"><h3>家訪與風險摘要</h3><dl class="kv"><dt>最近家訪</dt><dd>2026-05-28（面訪）</dd><dt>到檢阻礙</dt><dd>${patient.questionnaire.transport}</dd><dt>家庭目標</dt><dd>${patient.questionnaire.householdGoal}</dd></dl></div>
    </div>
  `;
}
function renderConsentManager(patient) {
  return `
    <div class="section-grid">
      <div class="check-block wide">
        <h3>同意四層旗標（每筆 PII 掛同意層級）</h3>
        <div class="consent-grid">
          ${consentTiers.map(([tier, scope, basis, ver, st]) => `
            <div class="consent-card ${st}">
              <div class="consent-top"><strong>${tier}</strong>${labStatus(st)}</div>
              <small>${scope}</small>
              <div class="consent-meta"><span>${basis}</span><span>版本 ${ver}</span></div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="field-block">
        <h3>雙語同意書（中文＋達悟語）</h3>
        <p class="minor">${state.lang === "tao" ? "〔達悟語版・待部落顧問審定〕審定號：TAO-CONSENT-pending" : "中文標準體＋達悟語並列；達悟語版本須由部落顧問審稿，列審定號於頁尾。"}</p>
        <div class="action-list">
          <button class="btn" onclick="showToast('已產生雙語同意書 PDF（達悟語待審定）')">${icon("clipboard")}產生雙語同意書</button>
          <button class="ghost-btn" onclick="toggleLang()">${icon("globe")}切換 ${state.lang === "tao" ? "中文" : "達悟語"}</button>
        </div>
      </div>
      <div class="field-block">
        <h3>撤回機制（L5 居民自助）</h3>
        <p class="minor">居民可由 PWA / LIFF / 紙本任一管道撤回；系統 24 小時內封存（不刪除以保留稽核），停止跨機構共享與研究，並通知 L3。</p>
        <button class="danger-btn" onclick="showToast('撤回已受理：24h 內封存，已寫入稽核並通知 L3 駐點主管')">${icon("shield")}模擬撤回同意</button>
      </div>
    </div>
  `;
}
function renderDedupReview() {
  const pairs = [
    ["P-00018", "夏曼・明義", "P-01133", "夏曼明義", 0.94, "戶籍＋健保同生日，疑似同人多檔"],
    ["P-00042", "希婻・阿美", "P-00977", "希婻阿美(教會名冊)", 0.88, "姓名相似、部落相同、無身分證對應"],
  ];
  return `
    <div class="section-grid">
      <div class="info-block wide"><h3>重複偵測審核頁（PMO / L3）</h3><p class="minor">進資料時即時偵測同人多檔，標記人工審核；合併／拆分主索引須 L3 簽核。目前重複率 0.4%（目標 &lt;0.5%）。</p></div>
      ${pairs.map(([idA, nameA, idB, nameB, sim, reason], i) => `
        <div class="dedup-card wide">
          <div class="dedup-pair">
            <div><span class="num">${idA}</span><strong>${nameA}</strong></div>
            <div class="dedup-score"><strong>${Math.round(sim * 100)}%</strong><small>相似度</small></div>
            <div><span class="num">${idB}</span><strong>${nameB}</strong></div>
          </div>
          <p class="minor">${reason}</p>
          <div class="action-list">
            <button class="btn" onclick="showToast('合併建議已提送 L3 駐點主管簽核（保留稽核）')">${icon("check")}合併（提送簽核）</button>
            <button class="ghost-btn" onclick="showToast('已標記為不同人，留存判定紀錄')">${icon("arrow")}判定為不同人</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

/* ============ 模組二：受檢與異常追蹤閉環 ============ */
function renderTrackModule(patient) {
  const tabs = [["board", "異常總覽"], ["machine", "追蹤狀態機"], ["dispatch", "家訪派工"], ["rules", "分級規則"]];
  return `
    <section class="module-stage">
      <div class="module-stage-head">
        <div>
          <span class="ai-kicker">模組二・受檢與異常追蹤閉環</span>
          <h2>健檢 → 異常分流 → 轉介/家訪 → 持續管理 → 複檢，全程不漏接</h2>
          <p>雙軌共用同一套紅橙黃綠分級與五態狀態機；紅級須 L3 醫師簽核（HITL H2）才觸發轉介。</p>
        </div>
        <div class="mpi-cover-cards">
          ${[["追蹤完成率", "78%"], ["失聯漏接", "5%"], ["24h 入庫", "95%"], ["紅級命中", "96%"]].map(([l, v]) => `<div><strong>${v}</strong><span>${l}</span></div>`).join("")}
        </div>
      </div>
      <div class="tabs module-tabs">${tabs.map(([k, l]) => `<button class="${state.trackTab === k ? "active" : ""}" onclick="setTrackTab('${k}')">${l}</button>`).join("")}</div>
      <div class="module-body">${renderTrackBody(patient)}</div>
    </section>
  `;
}
function renderTrackBody(patient) {
  if (state.trackTab === "machine") return renderStateMachine();
  if (state.trackTab === "dispatch") return renderDispatch(patient);
  if (state.trackTab === "rules") return renderAbnormalRules();
  return renderAbnormalBoard();
}
function renderAbnormalBoard() {
  const cases = [...patients].sort((a, b) => b.risk - a.risk);
  return `
    <div class="section-grid">
      <div class="field-block wide">
        <h3>異常個案總覽（PMO）</h3>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>個案</th><th>部落</th><th>分級</th><th>SLA</th><th>狀態</th><th>下一步</th></tr></thead>
            <tbody>
              ${cases.map((p) => {
                const lvl = p.risk >= 80 ? abnormalRules[0] : p.risk >= 60 ? abnormalRules[1] : p.risk >= 45 ? abnormalRules[2] : abnormalRules[3];
                return `<tr onclick="selectVisualPatient('${p.id}','labs')" style="cursor:pointer">
                  <td>${p.displayName}</td><td>${p.village}</td>
                  <td><span class="status-pill ${lvl[1] === "red" ? "red" : lvl[1] === "orange" ? "yellow" : lvl[1] === "yellow" ? "yellow" : "green"}">${lvl[0]}級</span></td>
                  <td>${lvl[3]}</td><td>${p.consent.includes("待") ? "待派工" : "已派工"}</td><td>${lvl[4]}</td>
                </tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="info-block"><h3>轉介路徑</h3><p class="minor">紅級自動觸發（須醫師 H2 簽核）：蘭嶼衛生所 → 台東馬偕 → 北部醫學中心。轉介後一週追蹤確認到診。</p></div>
      <div class="info-block"><h3>複檢提醒</h3><p class="minor">三個月 / 半年 / 一年自動提醒；複檢結果回收後更新狀態機與家庭健康設計。</p></div>
    </div>
  `;
}
function renderStateMachine() {
  return `
    <div class="section-grid">
      <div class="state-machine wide">
        ${trackStates.map(([name, desc, count, cls], i) => `
          <div class="state-node ${cls}">
            <div class="state-top"><strong>${name}</strong><span class="state-count">${count}</span></div>
            <small>${desc}</small>
            ${i < trackStates.length - 1 ? `<span class="state-arrow">${icon("arrow")}</span>` : ""}
          </div>
        `).join("")}
      </div>
      <div class="info-block wide"><h3>失聯升級（H4 自動但留證）</h3><p class="minor">連續 2 次無法聯繫 → 自動升級為「需 PMO 介入」，全程寫入稽核；本週 5 件失聯已升級。</p>
        <button class="btn" onclick="showToast('已將 5 件失聯個案升級 PMO（已留稽核）')">${icon("alert")}升級失聯個案</button>
      </div>
    </div>
  `;
}
function renderDispatch(patient) {
  const work = [...patients].sort((a, b) => b.risk - a.risk).map((p, i) => [p, ["紅", "橙", "黃", "綠"][Math.min(3, Math.floor(i))]]);
  return `
    <div class="section-grid">
      <div class="field-block wide">
        <h3>家訪派工地圖（依風險＋地理路線最佳化）</h3>
        <p class="minor">排班 Agent（H1）給排序建議，主管決定；駐島巡訪 ≤67.6 日、家訪日均 6 戶。</p>
        <div class="dispatch-list">
          ${work.map(([p, lvl], i) => `
            <div class="dispatch-row">
              <span class="dispatch-order">${i + 1}</span>
              <div><strong>${p.displayName}</strong><small>${p.village}・${p.household}</small></div>
              <span class="status-pill ${lvl === "紅" ? "red" : lvl === "綠" ? "green" : "yellow"}">${lvl}級</span>
              <button class="ghost-btn" onclick="showToast('已派工給 FNP：${p.displayName}')">${icon("arrow")}派工</button>
            </div>
          `).join("")}
        </div>
      </div>
      ${lanyuVillageMap()}
    </div>
  `;
}
function renderAbnormalRules() {
  return `
    <div class="section-grid">
      <div class="field-block wide">
        <h3>異常分級規則（紅／橙／黃／綠）</h3>
        <p class="minor">本系統僅實作 P06 健檢 Protocol 附件 B 的數位化版本；規則引擎透明可解釋（XAI）。</p>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>級</th><th>觸發條件範例</th><th>SLA</th><th>處置</th></tr></thead>
            <tbody>
              ${abnormalRules.map(([lvl, color, cond, sla, act]) => `
                <tr><td><span class="status-pill ${color === "red" ? "red" : color === "green" ? "green" : "yellow"}">${lvl}級</span></td><td>${cond}</td><td>${sla}</td><td>${act}</td></tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="info-block wide"><h3>可解釋性（XAI）</h3><p class="minor">每筆分級留存「使用的規則 + 模型版本」，醫師可反查為何如此分級；ML 僅做排序輔助，不做關鍵決策。</p></div>
    </div>
  `;
}

/* ============ 模組三：PMO 治理看板 ============ */
function renderPmoModule() {
  if (!hasGov("L3")) {
    return permissionWall("PMO 治理看板", "L2 / L3 以上（PMO、衛生局、駐點主管）");
  }
  const tabs = [["nodes", "指揮節點"], ["gantt", "里程碑 Gantt"], ["commit", "跨機構承諾"], ["budget", "預算燃燒"], ["risk", "風險登記簿"]];
  return `
    <section class="module-stage">
      <div class="module-stage-head">
        <div><span class="ai-kicker">模組三・PMO 治理看板</span><h2>三層指揮（駐點／前進／中央）即時治理</h2>
          <p>會議決議、跨機構承諾、預算燃燒、風險全部上看板；週報由 PMO Agent（H2）草擬，PMO 編輯後送出。</p></div>
        <button class="btn" onclick='aiToast("AI整理今日工作摘要", "P-00018")'>${icon("clipboard")}週報草擬（H2）</button>
      </div>
      <div class="tabs module-tabs">${tabs.map(([k, l]) => `<button class="${state.pmoTab === k ? "active" : ""}" onclick="setPmoTab('${k}')">${l}</button>`).join("")}</div>
      <div class="module-body">${renderPmoBody()}</div>
    </section>
  `;
}
function renderPmoBody() {
  if (state.pmoTab === "gantt") return renderGantt();
  if (state.pmoTab === "commit") return renderCommitments();
  if (state.pmoTab === "budget") return renderBudgetBurn();
  if (state.pmoTab === "risk") return renderRiskRegister();
  return renderCommandNodes();
}
function renderCommandNodes() {
  return `
    <div class="section-grid">
      <div class="command-nodes wide">
        ${commandNodes.map(([tier, place, role, st]) => `
          <div class="command-node ${st}">
            <div class="node-pulse ${st}">${icon("node")}</div>
            <strong>${tier}・${place}</strong>
            <small>${role}</small>
            <span class="status-pill ${st === "online" ? "green" : "yellow"}">${st === "edge" ? "邊緣・離線就緒" : "連線"}</span>
          </div>
        `).join("")}
      </div>
      <div class="info-block wide"><h3>節點同步</h3><p class="minor">中央每日全量＋即時增量；蘭嶼駐點本機快取離線可用 7 天，恢復後自動同步（衝突：中央優先＋人工審查）。</p></div>
    </div>
  `;
}
function renderGantt() {
  const span = 8; // 5月～12月
  return `
    <div class="section-grid">
      <div class="field-block wide">
        <h3>115 年九大里程碑（與 00 主時程同步）</h3>
        <div class="gantt">
          <div class="gantt-axis">${["5", "6", "7", "8", "9", "10", "11", "12"].map((m) => `<span>${m}月</span>`).join("")}</div>
          ${pmoMilestones.map(([id, name, s, e, st, mod]) => `
            <div class="gantt-row">
              <span class="gantt-label">${id} ${name}</span>
              <div class="gantt-track">
                <span class="gantt-bar ${st}" style="left:${((s - 5) / span) * 100}%; width:${((e - s) / span) * 100}%">${mod}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}
function renderCommitments() {
  return `
    <div class="section-grid">
      <div class="field-block wide">
        <h3>跨機構承諾看板（目標 ≥30 條）</h3>
        <div class="commit-list">
          ${pmoCommitments.map(([org, what, st, cls]) => `
            <div class="commit-row">
              <strong>${org}</strong>
              <small>${what}</small>
              <span class="status-pill ${cls === "ok" ? "green" : cls === "warn" ? "yellow" : ""}">${st}</span>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="info-block"><h3>HITL</h3><p class="minor">新增決議須有會議紀錄出處；關閉決議須 Owner ＋ L2 PMO 雙簽；預算撥用走 ERP 既有流程，本系統僅可視化。</p></div>
    </div>
  `;
}
function renderBudgetBurn() {
  const pct = Math.round((pmoBudget.used / pmoBudget.total) * 100);
  return `
    <div class="section-grid">
      <div class="field-block wide">
        <h3>預算燃燒率（萬元・即時 vs 實際）</h3>
        <div class="burn-head"><div><strong>${pmoBudget.used}</strong><span> / ${pmoBudget.total} 萬（${pct}%）</span></div><span class="status-pill green">偏離 &lt;5%</span></div>
        <div class="burn-track"><span style="width:${pct}%"></span></div>
        <div class="burn-packages">
          ${pmoBudget.packages.map(([name, total, used, share]) => `
            <div class="burn-pkg"><div><strong>${name}</strong><small>占比 ${share}</small></div><div class="burn-pkg-bar"><span style="width:${Math.round((used / total) * 100)}%"></span></div><em>${used}/${total}</em></div>
          `).join("")}
        </div>
      </div>
      <div class="info-block"><h3>財務 Agent（H4）</h3><p class="minor">偏離 5% 自動告警（自動但留證）；缺件提醒、異常費用識別。不直接動撥預算、不簽核採購。</p></div>
    </div>
  `;
}
function renderRiskRegister() {
  return `
    <div class="section-grid">
      <div class="field-block wide">
        <h3>風險登記簿（目標 ≥20 條）</h3>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>ID</th><th>風險</th><th>影響</th><th>機率</th><th>緩解</th><th>Owner</th></tr></thead>
            <tbody>
              ${pmoRisks.map(([id, risk, impact, prob, mit, owner]) => `
                <tr><td class="num">${id}</td><td>${risk}</td><td><span class="status-pill ${impact === "極高" || impact === "高" ? "red" : "yellow"}">${impact}</span></td><td>${prob}</td><td>${mit}</td><td>${owner}</td></tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function permissionWall(title, need) {
  return `
    <section class="module-stage">
      <div class="permission-wall">
        <span class="perm-lock">${icon("lock")}</span>
        <h2>${title}</h2>
        <p>此模組需 ${need} 權限。目前身分：<strong>${currentLevel().key} ${currentLevel().name}</strong>。</p>
        <p class="minor">五級 RBAC 依附件 B 矩陣控管；可於登出後改以較高權限登入，或請 L2/L3 協助。</p>
        <button class="ghost-btn" onclick="setClinicalNav('dashboard')">${icon("arrow")}回戰情儀表板</button>
      </div>
    </section>
  `;
}

/* ============ 模組五：知識問答庫（含達悟語）============ */
function visibleKbLayers() {
  // 依角色分層：L2↑ 可見 K3，L4↑ 可見 K2，全員可見 K1
  return knowledgeLayers.filter(([code, , , , need]) => hasGov(need) || code === "K1");
}
function renderKnowledgeModule() {
  const layers = visibleKbLayers();
  const activeLayer = state.kbLayer && layers.some((l) => l[0] === state.kbLayer) ? state.kbLayer : "K1";
  const entries = knowledgeBase.filter((e) => e.layer === activeLayer);
  return `
    <section class="module-stage">
      <div class="module-stage-head">
        <div><span class="ai-kicker">模組五・知識問答庫（問答 Agent H0）</span><h2>自然語言查正確答案，對外口徑一致</h2>
          <p>三層 K1/K2/K3 綁 RBAC；每答必附來源與信心分級；不知道就說不知道；達悟語須部落顧問審定。</p></div>
        <button class="gov-pill ${state.lang === "tao" ? "active" : ""}" onclick="toggleLang()">${icon("globe")}${state.lang === "tao" ? "達悟語" : "中文"}輸入</button>
      </div>
      <div class="kb-layer-tabs">
        ${knowledgeLayers.map(([code, name, who]) => {
          const allowed = layers.some((l) => l[0] === code);
          return `<button class="${activeLayer === code ? "active" : ""} ${allowed ? "" : "locked"}" onclick="${allowed ? `setKbLayer('${code}')` : `showToast('跨層拒答：${code} ${name} 需更高權限，請洽 ${code === "K3" ? "PMO" : "駐點"}')`}">${allowed ? "" : icon("lock")}<strong>${code}</strong><small>${name}</small></button>`;
        }).join("")}
      </div>
      <div class="kb-search">${icon("search")}<input value="${state.kbQuery || ""}" oninput="state.kbQuery=this.value; render()" placeholder="${state.lang === "tao" ? "以達悟語輸入問題…（答覆須審定）" : "輸入問題，例如：紅級異常怎麼處理？"}" /><button class="btn" onclick="showToast('問答 Agent（RAG）已檢索，附來源與信心')">${icon("book")}查詢</button></div>
      <div class="module-body">
        <div class="kb-list">
          ${entries.filter((e) => !state.kbQuery || e.q.includes(state.kbQuery) || e.zh.includes(state.kbQuery)).map((e) => renderKbCard(e)).join("") || `<div class="empty-state">此層暫無命中。問答 Agent 會回覆「不確定，請洽 PMO」而非編造。</div>`}
        </div>
      </div>
    </section>
  `;
}
function renderKbCard(e) {
  const body = state.lang === "tao" && e.tao ? e.tao : e.zh;
  const confCls = e.conf === "高" ? "green" : e.conf === "中" ? "yellow" : "";
  return `
    <article class="kb-card">
      <div class="kb-q"><span class="status-pill">${e.layer}</span><h3>${e.q}</h3></div>
      <p class="kb-a">${body}</p>
      <div class="kb-meta">
        <span class="kb-source">${icon("book")}來源：${e.src}</span>
        <span class="status-pill ${confCls}">信心 ${e.conf}</span>
        ${e.taoCert && e.taoCert !== "—" ? `<span class="tag">達悟語審定：${e.taoCert}</span>` : ""}
        <button class="xai-btn" onclick="showToast('問答 Agent 邊界：不臨床診斷、不洩個資、不答未審定族語、不編造')">${icon("search")}為什麼這個答案？</button>
      </div>
    </article>
  `;
}

/* ============ 八大 AI Agent 中心 ============ */
function renderAgentsModule() {
  return `
    <section class="module-stage">
      <div class="module-stage-head">
        <div><span class="ai-kicker">第四部・八大 AI Agent 任務規格</span><h2>降低偏鄉治理成本，不炫技</h2>
          <p>每個 Agent 都有單一任務、HITL 等級、負面清單、可解釋輸出、稽核留存與 fallback；禁止 H5 自主臨床決策。</p></div>
        <button class="ghost-btn" onclick="setGovTab('llm'); setClinicalNav('governance')">${icon("shield")}LLM 邊界與負面清單</button>
      </div>
      <div class="agent-grid">
        ${agents.map((a) => `
          <button class="agent-card" onclick="openAgent('${a.code}')">
            <div class="agent-top"><span class="agent-icon">${icon(a.icon)}</span><div><strong>${a.name}</strong><small>${a.sub}・${a.mod}</small></div></div>
            <div class="agent-badges"><span class="hitl-badge">${a.hitl}</span><span class="model-badge">${a.model.split("（")[0].split(" ")[0]}</span></div>
            <p>${a.task}</p>
            <div class="agent-foot"><span class="status-pill ${a.conf === "高" ? "green" : "yellow"}">信心 ${a.conf}</span><em>查看模型卡 →</em></div>
          </button>
        `).join("")}
      </div>
      <div class="hitl-legend">
        <strong>HITL 等級：</strong>
        <span>H0 純資訊</span><span>H1 排序建議</span><span>H2 草擬待簽核</span><span>H3 即時協作</span><span>H4 自動但留證</span><span class="forbidden">H5 自主臨床決策（禁止）</span>
      </div>
    </section>
  `;
}
function openAgent(code) { state.agentDetail = code; render(); }
function closeAgent() { state.agentDetail = null; render(); }
function renderAgentDrawer() {
  if (!state.agentDetail) return "";
  const a = agents.find((x) => x.code === state.agentDetail);
  if (!a) return "";
  return `
    <aside class="ai-draft-drawer agent-drawer" aria-label="Agent 模型卡">
      <div class="ai-draft-toolbar">
        <div><span class="ai-kicker">Model Card / Agent 規格</span><h2>${a.name}</h2><p>${a.sub}・對應 ${a.mod}</p></div>
        <button class="ghost-btn ai-draft-close" onclick="closeAgent()">${icon("check")}關閉</button>
      </div>
      <div class="ai-draft-chip-row">
        <span class="hitl-badge">HITL ${a.hitl}</span><span class="model-badge">${a.model}</span><span class="status-pill ${a.conf === "高" ? "green" : "yellow"}">信心 ${a.conf}</span>
      </div>
      <div class="ai-draft-content">
        <section class="ai-draft-section"><h3>任務</h3><p>${a.task}</p></section>
        <section class="ai-draft-section"><h3>輸出</h3><p>${a.out}</p></section>
        <section class="ai-draft-section"><h3>邊界（不可做）</h3><p>${a.cant.map((c) => `・${c}`).join("<br>")}</p></section>
        <section class="ai-draft-section"><h3>稽核留存</h3><p>每次輸入／輸出／信心／模型版本／延遲／使用者均留存 ≥ 2 年（interaction_id、model_id、sources、hitl_decision）。</p></section>
        <section class="ai-draft-section"><h3>Fallback</h3><p>主模型超時 → 切換次選；兩家失效 → 降級規則引擎或「請洽 PMO」＋留 ticket。</p></section>
        <section class="ai-draft-section"><h3>KPI</h3><p>${a.kpi}</p></section>
      </div>
      <div class="ai-draft-actions">
        <button class="btn" onclick="showToast('模型卡／資料卡已送 AI 倫理委員會審視')">${icon("shield")}送倫理委員會</button>
        <button class="ghost-btn" onclick="showToast('已產生季度公平性報告草稿')">${icon("chart")}公平性報告</button>
      </div>
    </aside>
  `;
}

/* ============ 治理與資安 ============ */
function renderGovernanceModule() {
  const tabs = [["rbac", "五級 RBAC"], ["audit", "稽核軌"], ["security", "資安六道"], ["incident", "事件應變"], ["interface", "接口目錄"], ["llm", "LLM 邊界"]];
  return `
    <section class="module-stage">
      <div class="module-stage-head">
        <div><span class="ai-kicker">第五～八部・三軌治理</span><h2>資料治理 ＋ 資安治理 ＋ AI 治理</h2>
          <p>軍火庫思維：為支援六大決策而建。對齊 ISO 27001/27701、NIST CSF、TWGCB、EU AI Act 精神。</p></div>
      </div>
      <div class="tabs module-tabs">${tabs.map(([k, l]) => `<button class="${state.govTab === k ? "active" : ""}" onclick="setGovTab('${k}')">${l}</button>`).join("")}</div>
      <div class="module-body">${renderGovBody()}</div>
    </section>
  `;
}
function renderGovBody() {
  if (state.govTab === "audit") return renderAuditTrail();
  if (state.govTab === "security") return renderSecurityLines();
  if (state.govTab === "incident") return renderIncident();
  if (state.govTab === "interface") return renderInterfaceCatalog();
  if (state.govTab === "llm") return renderLlmBoundary();
  return renderRbacMatrix();
}
function renderRbacMatrix() {
  const ops = [
    ["居民個資（自身）", "—", "—", "✓", "✓", "✓"],
    ["居民個資（他人）", "—", "—", "✓", "—", "—"],
    ["去識別統計", "✓", "✓", "✓", "✓", "—"],
    ["異常分級調整", "—", "—", "✓", "提送", "—"],
    ["主索引合併／拆分", "—", "提送", "✓簽核", "—", "—"],
    ["撤回同意", "—", "—", "知會", "知會", "✓"],
    ["跨機構查詢", "—", "—", "✓須同意", "—", "—"],
    ["預算審核", "✓", "✓", "—", "—", "—"],
    ["模型卡／倫理審查", "✓", "提送", "—", "—", "—"],
  ];
  return `
    <div class="section-grid">
      <div class="field-block wide">
        <h3>五級 RBAC 角色</h3>
        <div class="rbac-roles">
          ${accessLevels.map((l) => `<div class="rbac-role ${state.accessKey === l.key ? "active" : ""}"><span class="lv-badge lv-${l.key.toLowerCase()}">${l.key}</span><strong>${l.name}</strong><small>${l.scope}</small></div>`).join("")}
        </div>
      </div>
      <div class="field-block wide">
        <h3>權限矩陣（附件 B 節錄）</h3>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>資源 / 操作</th><th>L1</th><th>L2</th><th>L3</th><th>L4</th><th>L5</th></tr></thead>
            <tbody>${ops.map((r) => `<tr><td>${r[0]}</td>${r.slice(1).map((c) => `<td class="rbac-cell ${c === "✓" || c.includes("✓") ? "yes" : c === "—" ? "no" : "part"}">${c}</td>`).join("")}</tr>`).join("")}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
function renderAuditTrail() {
  return `
    <div class="section-grid">
      <div class="field-block wide">
        <h3>稽核軌（誰・何時・何操作・出處）</h3>
        <p class="minor">操作、查詢、個案下鑽全留存；稽核日誌最少保留 2 年（ISO 27001 + TWGCB）。</p>
        <div class="audit-list">
          ${auditTrail.map(([time, who, act, basis, mod]) => `
            <div class="audit-row"><span class="audit-time">${time}</span><div><strong>${who}</strong><small>${act}</small></div><span class="tag">${basis}</span><em>${mod}</em></div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}
function renderSecurityLines() {
  return `
    <div class="section-grid">
      <div class="field-block wide"><h3>資安六道防線</h3>
        <div class="defense-grid">
          ${securityLines.map(([no, name, desc]) => `<div class="defense-card"><span class="defense-no">${no}</span><strong>${name}</strong><small>${desc}</small></div>`).join("")}
        </div>
      </div>
      <div class="info-block"><h3>加密與身分</h3><p class="minor">at-rest：AES-256；in-transit：TLS 1.3 + HSTS；金鑰 Vault 年輪換；密碼 Argon2id。MFA：首登＋每 90 天＋敏感操作（刪除／匯出／跨機構查詢）。</p></div>
      <div class="info-block"><h3>離島斷線備援</h3><p class="minor">本機快取 token 最長 7 天；家訪 App 完整離線可用，恢復後自動同步；海纜斷裂以衛星（Starlink／中華電信）次選；停電優雅降級紙本。</p></div>
    </div>
  `;
}
function renderIncident() {
  return `
    <div class="section-grid">
      <div class="field-block wide"><h3>資安／個資事件分級應變</h3>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>級</th><th>範例</th><th>通報時限</th><th>公告時限</th></tr></thead>
            <tbody>${incidentLevels.map(([lvl, color, ex, report, notice]) => `<tr><td><span class="status-pill ${color === "red" ? "red" : color === "green" ? "green" : "yellow"}">${lvl}</span></td><td>${ex}</td><td>${report}</td><td>${notice}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>
      <div class="info-block wide"><h3>應變流程</h3><p class="minor">偵測 → 抑制 → 根除 → 復原 → 事後檢討（含對外溝通）。個資外洩：24h 內個別通知受影響居民（LIFF／郵寄）、72h 內報主管機關，透過 PMO／教會／部落會議雙語溝通。</p></div>
    </div>
  `;
}
function renderInterfaceCatalog() {
  return `
    <div class="section-grid">
      <div class="field-block wide"><h3>接口目錄 Interface Catalog（EXT 節錄）</h3>
        <p class="minor">所有外部接口登錄於 PMO 維護的接口目錄，含擁有者、SLA、停機、資料同步延遲、最後成功時間。</p>
        <div class="table-scroll">
          <table class="lab-table">
            <thead><tr><th>編號</th><th>對接系統</th><th>協定</th><th>SLA / 頻率</th><th>同步</th><th>最後成功</th></tr></thead>
            <tbody>${interfaceCatalog.map((r) => `<tr><td class="num">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td><span class="status-pill green">${r[5]}</span></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
function renderLlmBoundary() {
  return `
    <div class="section-grid">
      <div class="field-block wide"><h3>LLM 邊界・負面清單（N1–N9）</h3>
        <div class="negative-list">
          ${llmNegativeList.map(([no, act, why]) => `<div class="negative-row"><span class="neg-no">${no}</span><div><strong>${act}</strong><small>${why}</small></div></div>`).join("")}
        </div>
      </div>
      <div class="info-block"><h3>Prompt Injection 防護</h3><p class="minor">居民輸入、上傳檔案、RAG 來源、語碼轉換、工具回應皆為注入向量；拒絕未驗證角色扮演（「假裝你是醫師…」）。</p></div>
      <div class="info-block"><h3>幻覺控管與輸出稽核</h3><p class="minor">不知道就說不知道；來源強制引用；輸出 schema 校驗，不通過重試 1 次後人工接手；每次互動留 interaction_id／model_id／sources／confidence。</p></div>
    </div>
  `;
}

function render() {
  app.className = `app ${!state.authenticated ? "landing-app" : state.role === "resident" ? "resident-app" : "clinical-app"}`;
  if (!state.authenticated) {
    app.innerHTML = `
      ${renderLanding()}
      ${state.toast ? `<div class="toast">${icon("check")}${state.toast}</div>` : ""}
    `;
    return;
  }

  app.innerHTML = `
    ${topbar()}
    ${state.role === "clinical" ? governanceBar() : ""}
    ${state.role === "clinical" ? renderClinical() : renderResident()}
    ${state.role === "clinical" ? appFooter() : ""}
    ${renderAiDraftDrawer()}
    ${renderAgentDrawer()}
    ${renderModulePicker()}
    ${state.toast ? `<div class="toast">${icon("check")}${state.toast}</div>` : ""}
  `;
}

window.setRole = setRole;
window.setTab = setTab;
window.setClinicalView = setClinicalView;
window.selectLoginRole = selectLoginRole;
window.loginAs = loginAs;
window.logout = logout;
window.setResidentTab = setResidentTab;
window.setVillage = setVillage;
window.selectVisualPatient = selectVisualPatient;
window.selectAgePackage = selectAgePackage;
window.showToast = showToast;
window.aiToast = aiToast;
window.closeAiDraft = closeAiDraft;
window.applyAiDraft = applyAiDraft;
window.openModulePicker = openModulePicker;
window.closeModulePicker = closeModulePicker;
window.selectHouseholdModule = selectHouseholdModule;
window.setClinicalNav = setClinicalNav;
window.setDashboardView = setDashboardView;
window.setMpiTab = setMpiTab;
window.setTrackTab = setTrackTab;
window.setPmoTab = setPmoTab;
window.setKbLayer = setKbLayer;
window.setGovTab = setGovTab;
window.toggleLang = toggleLang;
window.selectAccess = selectAccess;
window.loginWithAccess = loginWithAccess;
window.openAgent = openAgent;
window.closeAgent = closeAgent;
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
  if (!state.authenticated) {
    state.loginRole = role;
    state.role = role;
    render();
    return;
  }
  if (state.sessionRole === "resident" && role !== "resident") {
    window.location.hash = "resident";
    showToast("民眾帳號無權限進入醫療/護理系統");
    return;
  }
  if (role !== state.role) {
    state.role = role;
    render();
  }
});

render();
