// 模組三：PMO 治理看板資料。

/** [代碼, 名稱, 起月, 迄月, 狀態, 對應] */
export const pmoMilestones: readonly (readonly [string, string, number, number, string, string])[] = [
  ['M1', 'PMO 成立 + IT 小組就位', 5, 6, 'done', '—'],
  ['M2', '三包採購完成決標', 6, 7, 'active', 'A/B/C 包'],
  ['M3', '主索引 MPI Alpha', 7, 8, '', '模組一'],
  ['M4', '健檢追蹤閉環 Alpha', 8, 9, '', '模組二'],
  ['M5', 'PMO 看板 + 儀表板 Beta', 9, 10, '', '模組三、四'],
  ['M6', '八大 Agent 試營運', 10, 11, '', 'Agent 全部'],
  ['M7', '知識問答庫 Beta', 10, 11, '', '模組五'],
  ['M8', '滲透測試 + AI 紅隊', 11, 12, '', 'C 包'],
  ['M9', '年度檢討 + 116 送審', 12, 13, '', '全'],
];

/** [機構, 承諾, 狀態, 色票] */
export const pmoCommitments: readonly (readonly [string, string, string, string])[] = [
  ['桃園醫院', '107 年健檢資料一次性匯入 + 日批次 FHIR', '進行中', 'warn'],
  ['19 家部立醫院', '本島軌健檢結果 FHIR 回傳', '洽談中', ''],
  ['台東馬偕', '異常追蹤與急診轉介回報', '已承諾', 'ok'],
  ['台東大學', '資料分析與人才培育協作', '已承諾', 'ok'],
  ['蘭嶼鄉公所', '場域、動員與部落會議協調', '進行中', 'warn'],
  ['教會節點', '雙語同意書宣導與名單動員', '已承諾', 'ok'],
];

/** 預算燃燒率：總額/已用 + 各包 [名稱, 預算, 已用, 比率] */
export const pmoBudget: {
  total: number;
  used: number;
  packages: readonly (readonly [string, number, number, string])[];
} = {
  total: 1100,
  used: 372,
  packages: [
    ['A 包 系統開發', 600, 245, '55%'],
    ['B 包 AI Agent', 300, 88, '27%'],
    ['C 包 資安合規', 200, 39, '18%'],
  ],
};

/** 風險登記簿：[編號, 描述, 衝擊, 機率, 對策, 負責] */
export const pmoRisks: readonly (readonly [string, string, string, string, string, string])[] = [
  ['R-02', '廠商過度承諾、低估離島挑戰', '高', '高', '招標必載「離島實地驗證」', '採購組'],
  ['R-04', '居民同意覆蓋率不足', '高', '中', '教會節點＋雙語同意書＋部落會議', 'FNP 主管'],
  ['R-05', '個資外洩', '極高', '低', '6 道防線＋滲透＋紅隊', '資安官'],
  ['R-06', 'LLM 幻覺造成誤導', '高', '中', '第八部規範＋紅隊每季', 'AI 治理'],
  ['R-07', '達悟語審定瓶頸', '中', '高', '≥2 位部落顧問常駐諮詢', 'PMO'],
  ['R-08', '颱風／海纜／停電造成資料損失', '高', '中', '邊緣節點＋衛星備援＋紙本流程', 'IT 小組'],
];

/** 三層指揮節點：[層, 名稱, 職責, 狀態] */
export const commandNodes: readonly (readonly [string, string, string, string])[] = [
  ['中央', '照護司辦公室', '政策視圖・跨案匯流', 'online'],
  ['前進', '台東前進指揮所', '後勤協調・本島軌調度・邊緣快取', 'online'],
  ['駐點', '蘭嶼駐點指揮所', '衛生所／居護所／FNP・離線可用 7 天', 'edge'],
];
