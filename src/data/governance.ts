// 治理／資安：接口目錄、資安六道防線、事件分級、稽核軌、導覽。

/** [編號, 系統, 介接方式, SLA, 頻率, 最近同步] */
export const interfaceCatalog: readonly (readonly [string, string, string, string, string, string])[] = [
  ['EXT-01', '健保署 NHI MediCloud', '健保 VPN', '99.5%', '即時', '08:14'],
  ['EXT-03', '桃園醫院 HIS', 'FHIR R4 + ETL', '日批次', '日', '02:00'],
  ['EXT-05', '台東馬偕 HIS', 'FHIR R4', '日批次', '日', '02:10'],
  ['EXT-09', '內政部戶政', '政府服務匯流', '月', '月', '05/01'],
  ['EXT-02', '衛福部 MyData / TWHL7', 'OAuth2 + FHIR', '同意觸發', '事件', '07:55'],
];

/** [道, 層, 內容] */
export const securityLines: readonly (readonly [string, string, string])[] = [
  ['第 1 道', '網路', '防火牆、IDS/IPS、政府雲 VPC、零信任'],
  ['第 2 道', '主機', '硬化（CIS Benchmark）、EDR、漏洞掃描'],
  ['第 3 道', '應用', 'OWASP Top 10、安全 SDLC、相依套件掃描'],
  ['第 4 道', '資料', '加密（at-rest/in-transit/in-use）、去識別、遮罩'],
  ['第 5 道', '稽核', '日誌集中、異常偵測、SIEM'],
  ['第 6 道', '人員', '教育訓練、權責分工、最小授權'],
];

/** [等級, 色票, 範例, 通報, 居民通知] */
export const incidentLevels: readonly (readonly [string, string, string, string, string])[] = [
  ['嚴重', 'red', '重大個資外洩、勒索軟體', '1 小時內衛福部＋數發部資安署；72h 報告', '24h 居民通知'],
  ['高', 'orange', '核心服務中斷 > 4 小時', '4 小時內 PMO＋Committee', '24h 公告'],
  ['中', 'yellow', '漏洞、未授權存取嘗試', '24 小時內 IT 小組', '—'],
  ['低', 'green', '失敗登入、配置漂移', '週報', '—'],
];

/** 稽核軌（示範）：[時間, 角色, 動作, 註記, 模組] */
export const auditTrail: readonly (readonly [string, string, string, string, string])[] = [
  ['08:42', 'L3 駐點主管', '個案下鑽 P-00018', '同意旗標 ✓', '模組四'],
  ['08:30', 'AI 分流 Agent', '紅級標記 1 件（H1）', '規則 v2.1', '模組二'],
  ['08:12', 'L4 FNP', '新增家訪紀錄 H-東清-014', '已分派', '工作區'],
  ['07:58', 'L2 PMO', '週報草擬簽核（H2）', 'PMO Agent', '模組三'],
  ['07:40', '系統', '離線快取同步完成（7 天備援）', '邊緣節點', '資安'],
];

/** 醫護端導覽：[nav, icon, 標題, 模組] */
export const clinicalNavItems: readonly (readonly [string, string, string, string])[] = [
  ['dashboard', 'chart', '戰情儀表板', '模組四'],
  ['mpi', 'users', '居民主索引', '模組一'],
  ['track', 'alert', '追蹤閉環', '模組二'],
  ['workspace', 'clipboard', '工作區', '個案'],
  ['visit', 'clipboard', '家訪問卷', '家庭評估'],
  ['pmo', 'calendar', 'PMO 治理', '模組三'],
  ['knowledge', 'book', '知識問答', '模組五'],
  ['agents', 'robot', 'AI Agent', '八大'],
  ['governance', 'shield', '治理資安', 'RBAC'],
];
