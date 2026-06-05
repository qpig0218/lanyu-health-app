# Ayoi 蘭嶼健康行動 APP — Health Equity Command Center（HECC）原型

雙介面 Web App 原型，依《P11 IT/AI 系統委外規格與治理架構 v1.0》擴充，涵蓋五大 MVP 模組、八大 AI Agent 與資料／資安／AI 三軌治理外觀。以 **Vite + TypeScript** 模組化打造，純前端靜態輸出，部署於 GitHub Pages。

## 技術架構

- **Vite 6 + TypeScript（strict）**：模組化前端，無框架；極簡 typed store + 整頁 render。
- **安全模板**：自製 `html\`\`` tagged-template 自動逃逸內插值，事件以 `{ on: { click: fn } }` 委派，無 inline handler／`window.fn`（消滅 XSS 反模式）。
- **i18n**：`t(key, vars?)` + zh/tao 字典；達悟語未審定條目誠實 fallback 中文並標「待審定」徽章。
- **品質**：ESLint（含 `no-restricted-syntax` 擋 innerHTML）、Prettier、Vitest 單元測試（純邏輯 rbac/risk/consent/knowledge/i18n/html）。
- **CI/CD**：GitHub Actions build → `actions/deploy-pages`，自訂網域 CNAME。

## 開發

```bash
npm install
npm run dev        # 本機開發伺服器
npm run build      # tsc --noEmit && vite build → dist/
npm run preview    # 預覽 production 建置
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run test       # vitest（加 -- --run 跑單次）
```

GitHub Pages：`https://lanyu-health.theoneai.com.tw/`

> **部署設定**：在 GitHub 倉庫 **Settings → Pages → Build and deployment → Source** 選擇 **「GitHub Actions」**。push 到 `main` 後 `.github/workflows/deploy.yml` 會自動 typecheck/lint/test/build 並發佈 `dist/`（含 `CNAME`、`.nojekyll`、`manifest.json`、`assets/`）。

## 五級 RBAC 登入（對應 P11 附件 B）

| 層級 | 角色 | 可見範圍 |
|---|---|---|
| L1 | 照護司核心圈 | 政策視圖、去識別統計、倫理委員會 |
| L2 | PMO／衛生局 | 戰情視圖、PMO 治理看板、預算人力 |
| L3 | 駐點主管 | 駐點視圖、居民全貌（PII）、異常簽核 |
| L4 | FNP 一線 | 已分派個案、家訪 App |
| L5 | 居民 | 自身資料、撤回同意、可攜 |

權限不足時模組會顯示權限牆；知識問答跨層提問會拒答並導正窗口。

## 五大 MVP 模組（醫護端左側導覽）

1. **居民主索引 MPI** — 主索引查詢（三鍵交叉遮罩）、一戶一視圖、同意四層管理＋撤回、重複偵測審核。
2. **受檢與異常追蹤閉環** — 紅橙黃綠四級規則＋SLA、五態狀態機、失聯升級（H4）、家訪派工、複檢提醒。
3. **PMO 治理看板** — 三層指揮節點圖、M1–M9 里程碑 Gantt、跨機構承諾、預算燃燒率、風險登記簿。
4. **風險分層決策儀表板** — 政策／戰情／駐點四視圖切換、三顆數據核彈、三級異常率對比、六部落熱點地圖。
5. **知識問答庫** — K1/K2/K3 三層綁 RBAC、繁中＋達悟語切換、來源引用、信心分級、不知道就說不知道。

## 八大 AI Agent + AI 治理

PMO／排班／外展／分流／追蹤／財務／洞察／問答八卡；每卡標示 HITL 等級（H0–H4，禁止 H5）、模型級、邊界（不可做）、稽核留存、fallback、KPI。AI 草稿抽屜含 XAI「為什麼這個建議」、信心分級、模型版本與 interaction_id。

## 治理與資安

五級 RBAC 矩陣、稽核軌、資安六道防線、MFA／加密標準、離島離線優先 7 天、事件分級應變、接口目錄（EXT）、LLM 邊界負面清單 N1–N9 與 Prompt Injection／幻覺控管。

## 民眾端（L5）

家庭健康卡、AI 健康助理、問卷步驟、健檢預約、結果查看、個資與同意（雙語、可撤回）。

## 仍屬委外（A/B/C 三包）執行

真實後端與資料庫、FHIR/NHI 介接、達悟語顧問審定內容、滲透測試與 AI 紅隊、ISO 對標與 IRB、實際 5,019 筆建檔與 KPI 達標。本原型為 RFP/SOW 功能母本與驗收 DoD 對照基準。
