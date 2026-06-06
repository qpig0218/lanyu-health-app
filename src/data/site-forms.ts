export type SiteFieldKind = 'text' | 'textarea' | 'time' | 'date' | 'multi';

export interface SiteField {
  id: string;
  label: string;
  prompt?: string;
  kind?: SiteFieldKind;
  options?: readonly string[];
}

export interface SiteSection {
  id: string;
  title: string;
  fields: readonly SiteField[];
}

export interface SiteForm {
  id: string;
  title: string;
  unit: string;
  badge: string;
  headerFields: readonly SiteField[];
  sections: readonly SiteSection[];
}

export type SiteDraft = Record<string, string>;
export type SiteDrafts = Record<string, SiteDraft>;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const SITE_MODE_STORAGE_KEY = 'lanyu-site-mode-drafts-v1';

const headerFields = (id: string): readonly SiteField[] => [
  { id: `${id}-contact`, label: '現場窗口', kind: 'text' },
  { id: `${id}-title`, label: '職稱', kind: 'text' },
  { id: `${id}-phone`, label: '電話', kind: 'text' },
  { id: `${id}-time`, label: '填寫時間', kind: 'time' },
];

const rows = (id: string, prefix: string, labels: readonly string[], prompt?: string): readonly SiteField[] =>
  labels.map((label, index) => ({
    id: `${id}-${prefix}-${String(index + 1).padStart(2, '0')}`,
    label,
    prompt,
    kind: 'textarea' as const,
  }));

const takebacks = (id: string, labels: readonly string[]): readonly SiteField[] =>
  rows(id, 'takeback', labels, '主責/窗口、需補資料、最晚回覆日');

export const siteForms: readonly SiteForm[] = [
  {
    id: 'F-01',
    title: '蘭嶼衛生所一頁式填答表',
    unit: '蘭嶼衛生所',
    badge: '衛生所',
    headerFields: headerFields('F-01'),
    sections: [
      {
        id: 'F-01-required',
        title: '一、當天必答事項',
        fields: rows('F-01', 'required', [
          '名冊與人口',
          '四村分流',
          '居民通知',
          '在地協力',
          '衛生所負荷',
          '場地與設備',
          '檢體與廢棄物',
          '異常追蹤與家訪',
          '文化與信任',
        ], '現場需留下可執行結論'),
      },
      {
        id: 'F-01-decision',
        title: '二、現場需拍板欄位',
        fields: [
          { id: 'F-01-decision-position', label: '蘭嶼衛生所定位', kind: 'multi', options: ['主場地', '副場地', '補檢點', '異常追蹤點', '資料節點', '其他'] },
          { id: 'F-01-decision-order', label: '四村建議服務順序', prompt: '第 1 至第 4 順序', kind: 'textarea' },
          { id: 'F-01-decision-scope', label: '衛生所可承接工作', kind: 'multi', options: ['名冊', '通知', '場地協調', '設備借用', '檢體暫存', '異常追蹤', '家訪銜接'] },
          { id: 'F-01-decision-external', label: '外部團隊必須承接工作', kind: 'multi', options: ['報到行政', '採檢', '影像', '資訊', '場務', '清潔', '交通', '其他'] },
          { id: 'F-01-decision-local', label: '可立即提供之在地窗口', prompt: '管理人/鄉公所、村辦/教會、族語協助', kind: 'textarea' },
        ],
      },
      {
        id: 'F-01-takeback',
        title: '三、帶回確認欄位',
        fields: takebacks('F-01', [
          '名冊缺口與去重規則',
          '場地管理人同意與可用日期',
          '在地人力名單、班次與工作費規則',
          '檢體、冷鏈與感染性廢棄物缺口',
          '異常追蹤、家訪銜接與文化溝通窗口',
        ]),
      },
    ],
  },
  {
    id: 'F-02',
    title: '部桃/醫福會行政 PMO 一頁式填答表',
    unit: '部桃/醫福會行政 PMO',
    badge: '行政 PMO',
    headerFields: headerFields('F-02'),
    sections: [
      {
        id: 'F-02-required',
        title: '一、當天必答事項',
        fields: rows('F-02', 'required', [
          '角色邊界',
          '採購與租用時程',
          '在地服務包',
          '核銷流程',
          '健檢費申報',
          '資料與財務分離',
          'IT MVP',
          '天候備援',
          '會後節點',
        ], '現場需留下可執行結論'),
      },
      {
        id: 'F-02-decision',
        title: '二、現場需拍板欄位',
        fields: [
          { id: 'F-02-decision-scope', label: '部桃承接範圍', kind: 'multi', options: ['採購', '契約', '核銷', '差旅', '後勤', 'IT 委外', '設備驗收', '其他'] },
          { id: 'F-02-decision-excluded', label: '不由部桃承接事項', kind: 'textarea' },
          { id: 'F-02-decision-minimum', label: '採購/租用最低可行包', kind: 'multi', options: ['隔屏', '桌椅', '冷鏈', '條碼', '平板', '印表機', '網路', '備電', '廢棄物容器'] },
          { id: 'F-02-decision-sow', label: '在地協作 SOW', kind: 'textarea', prompt: '需建立/不需建立/待照護司決策；驗收方式' },
          { id: 'F-02-decision-it', label: 'IT MVP 啟動條件', kind: 'multi', options: ['可啟動', '需補需求', '需採購程序', '需資安/個資確認'] },
          { id: 'F-02-decision-weather', label: '天候備援條款', kind: 'multi', options: ['納入契約', '另訂 SOP', '待上級確認'] },
        ],
      },
      {
        id: 'F-02-takeback',
        title: '三、帶回確認欄位',
        fields: takebacks('F-02', [
          '採購/租用清單、估價、決標或交付期程',
          '在地服務包 SOW、驗收方式、付款條件',
          '核銷憑證、月結格式與缺件補正期限',
          '健檢費申報欄位、S/A/B/G 版本、LDCT 加做項目與本島受檢認列',
          'IT MVP 欄位、權限、離線備援與資料分離規格',
          '天候順延、改點、費用認列與通知條款',
        ]),
      },
    ],
  },
  {
    id: 'F-03',
    title: '照護司 PMO 一頁式填答表',
    unit: '照護司/專案辦公室',
    badge: '照護司 PMO',
    headerFields: headerFields('F-03'),
    sections: [
      {
        id: 'F-03-required',
        title: '一、當天必答事項',
        fields: rows('F-03', 'required', [
          '當日最低結論',
          '場地判準',
          '三方責任邊界',
          '政策待決項',
          '量能與排程',
          '風險控管',
          '會後文件',
          '上級裁示',
        ], '現場需留下可執行結論'),
      },
      {
        id: 'F-03-decision',
        title: '二、現場需拍板欄位',
        fields: [
          { id: 'F-03-decision-class', label: '6/9 結論分類', kind: 'multi', options: ['足以進入排程', '需改善後排程', '待重大決策後再排程'] },
          { id: 'F-03-decision-sites', label: '場地初判', kind: 'textarea', prompt: '主場地、副場地、補檢/追蹤點、不可用' },
          { id: 'F-03-decision-volume', label: '每日服務量採用值', kind: 'textarea', prompt: '保守值、上限值、瓶頸站' },
          { id: 'F-03-decision-procurement', label: '採購與後勤是否啟動', kind: 'multi', options: ['立即啟動最低可行包', '改善項目確認後啟動', '待照護司裁示'] },
          { id: 'F-03-decision-policy', label: '健檢項目需裁示事項', kind: 'multi', options: ['兒少 S 版', '成人 A 版', '成人 B 版', '高齡 G 版', 'LDCT 加做包', '腫瘤標記', '本島受檢'] },
          { id: 'F-03-decision-followup', label: '異常追蹤責任原則', kind: 'textarea', prompt: '紅色、黃色、綠色、PMO 回報頻率' },
          { id: 'F-03-decision-record', label: '會後紀錄發送期限', kind: 'multi', options: ['會後 24 小時內', '會後 48 小時內', '其他'] },
        ],
      },
      {
        id: 'F-03-takeback',
        title: '三、帶回確認欄位',
        fields: takebacks('F-03', [
          '健檢項目、年齡分層與政策裁示',
          'LDCT、腫瘤標記、兒少 S 版及本島受檢決策',
          '三方責任邊界表正式版',
          '採購/後勤最低可行包核定',
          '資料治理、同意書與財務/健康資料分離原則',
          '天候備援與逾期風險處理原則',
        ]),
      },
    ],
  },
  {
    id: 'F-04',
    title: '東馬/台東馬偕一頁式填答表',
    unit: '台東馬偕',
    badge: '東馬',
    headerFields: headerFields('F-04'),
    sections: [
      {
        id: 'F-04-required',
        title: '一、當天必答事項',
        fields: rows('F-04', 'required', [
          '健檢方案',
          '成人 B/G 與 LDCT 策略',
          '肺功能',
          '腫瘤標記',
          '甲狀腺',
          '兒少 S 版',
          '現場量能',
          '檢體流程',
          '影像流程',
          '報告與通知',
          'IDS 與轉診',
          '本島受檢',
        ], '現場需留下可執行結論'),
      },
      {
        id: 'F-04-decision',
        title: '二、現場需拍板欄位',
        fields: [
          { id: 'F-04-decision-version', label: '健檢方案正式版', kind: 'multi', options: ['S 已定', 'A 已定', 'B 已定', 'G 已定', '需院內確認'] },
          { id: 'F-04-decision-ldct', label: '成人 B/G 與 LDCT', kind: 'multi', options: ['成人 B 版', '高齡 G 版', 'LDCT 全做', '高風險做', '轉台東做', '待裁示'] },
          { id: 'F-04-decision-thyroid', label: '甲狀腺超音波', kind: 'textarea', prompt: '在島做/回台東做/不列入/待裁示；每人時間' },
          { id: 'F-04-decision-tumor', label: '腫瘤標記', kind: 'textarea', prompt: '列入/不列入/部分列入/待裁示；追蹤責任' },
          { id: 'F-04-decision-staff', label: '派工與站點數', kind: 'textarea', prompt: '醫師、護理、醫檢、放射、超音波、行政；可支援天數' },
          { id: 'F-04-decision-volume', label: '每日服務量', kind: 'textarea', prompt: '保守值、上限值、瓶頸站' },
          { id: 'F-04-decision-sla', label: '報告與異常通知 SLA', kind: 'textarea', prompt: '報告天數、紅色小時、黃色小時、綠色天數' },
        ],
      },
      {
        id: 'F-04-takeback',
        title: '三、帶回確認欄位',
        fields: takebacks('F-04', [
          'S/A/B/G 正式項目表與年齡分層',
          'LDCT、高風險條件與台東端受檢安排',
          '腫瘤標記、偽陽性解釋與追蹤 SOP',
          '兒少 S 版項目與學校/未成年流程',
          '檢體物流、冷鏈、LIS 與報告 SLA',
          '影像設備、PACS/DICOM、遠距判讀與綠色通道',
          '本島受檢流程與報告回流',
        ]),
      },
    ],
  },
  {
    id: 'F-05',
    title: '會議總結頁',
    unit: '照護司/PMO',
    badge: '總結',
    headerFields: [
      { id: 'F-05-recorder', label: '紀錄單位', kind: 'text' },
      { id: 'F-05-time', label: '彙整時間', kind: 'time' },
      { id: 'F-05-host', label: '主持確認', kind: 'text' },
      { id: 'F-05-health', label: '衛生所確認', kind: 'text' },
      { id: 'F-05-buty', label: '部桃確認', kind: 'text' },
      { id: 'F-05-mackay', label: '東馬確認', kind: 'text' },
    ],
    sections: [
      {
        id: 'F-05-summary',
        title: '一、現場結論總表',
        fields: rows('F-05', 'summary', [
          '已確認｜場地可用性與定位',
          '已確認｜報到、抽血、尿液、理學、心電圖、影像、超音波可設站數',
          '已確認｜每日服務量保守值與上限值',
          '已確認｜衛生所、部桃、東馬、照護司責任邊界',
          '已確認｜檢體、影像、報告與異常通知初步流程',
          '待改善｜場地水電、廁所、網路、隱私、冷鏈、無障礙或緊急動線',
          '待改善｜人力、設備、耗材、交通、清潔或在地協作缺口',
          '待改善｜IT MVP、離線備援、資料權限或同意書版本',
          '待改善｜天候備援、檢體後送、停飛停航順延或改點規則',
          '帶回事項｜S/A/B/G 健檢項目正式版與年齡分層',
          '帶回事項｜成人 B/G、LDCT 加做包、高風險條件與台東端安排',
          '帶回事項｜腫瘤標記、甲狀腺超音波、兒少 S 版項目',
          '帶回事項｜採購/租用最低可行包、核銷憑證與在地服務包 SOW',
          '帶回事項｜本島蘭嶼籍居民受檢、資料回流與避免重複受檢流程',
        ], '決議/現況/缺口、主責單位、協辦單位、最晚回覆日、追蹤狀態'),
      },
      {
        id: 'F-05-deliverables',
        title: '二、會後 24 小時內交付確認',
        fields: rows('F-05', 'deliverable', [
          '6/9 勘查會議紀錄',
          '場地照片與配置草圖',
          '場地量能試算表',
          '採購與租用清單',
          '三方責任邊界表',
          '風險與待決事項追蹤表',
        ], '主責單位、交付期限、是否完成'),
      },
    ],
  },
];

export function fieldsForSiteForm(form: SiteForm): readonly SiteField[] {
  return [...form.headerFields, ...form.sections.flatMap((section) => section.fields)];
}

export function createEmptySiteDrafts(forms: readonly SiteForm[] = siteForms): SiteDrafts {
  return Object.fromEntries(
    forms.map((form) => [
      form.id,
      Object.fromEntries(fieldsForSiteForm(form).map((field) => [field.id, ''])),
    ]),
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function mergeSiteDrafts(saved: unknown, forms: readonly SiteForm[] = siteForms): SiteDrafts {
  const source = isRecord(saved) ? saved : {};
  return Object.fromEntries(
    forms.map((form) => {
      const maybeSavedForm = source[form.id];
      const savedForm: Record<string, unknown> = isRecord(maybeSavedForm) ? maybeSavedForm : {};
      return [
        form.id,
        Object.fromEntries(
          fieldsForSiteForm(form).map((field) => {
            const value = savedForm[field.id];
            return [field.id, typeof value === 'string' ? value : ''];
          }),
        ),
      ];
    }),
  );
}

export function loadSiteDraftsFromStorage(
  storage: StorageLike | undefined,
  forms: readonly SiteForm[] = siteForms,
): SiteDrafts {
  if (!storage) return createEmptySiteDrafts(forms);
  const raw = storage.getItem(SITE_MODE_STORAGE_KEY);
  if (!raw) return createEmptySiteDrafts(forms);
  try {
    return mergeSiteDrafts(JSON.parse(raw), forms);
  } catch {
    return createEmptySiteDrafts(forms);
  }
}

export function saveSiteDraftsToStorage(storage: StorageLike | undefined, drafts: SiteDrafts): void {
  if (!storage) return;
  storage.setItem(SITE_MODE_STORAGE_KEY, JSON.stringify(drafts));
}

export function siteFormCompletion(form: SiteForm, draft: SiteDraft): { filled: number; total: number } {
  const fields = fieldsForSiteForm(form);
  const filled = fields.filter((field) => (draft[field.id] ?? '').trim().length > 0).length;
  return { filled, total: fields.length };
}
