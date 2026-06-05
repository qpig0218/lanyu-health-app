// 中文（zh）為來源語言：所有 UI 文字 key 的權威字典。
// 達悟語（tao）僅收錄已審定條目，其餘自動 fallback 至此。

export const zh = {
  // 語言切換
  'lang.zh': '中文',
  'lang.tao': '達悟語',
  'lang.toggleTitle': '中文 / 達悟語',
  'badge.taoPending': '達悟語待審定',
  'toast.lang.tao': '已切換達悟語（族語答覆須部落顧問審定）',
  'toast.lang.zh': '已切換中文',

  // 民眾端導覽
  'nav.home': '首頁',
  'nav.care': '照護',
  'nav.survey': '問卷',
  'nav.schedule': '預約',
  'nav.results': '結果',

  // 民眾端同意卡
  'consent.title': '我的個資與同意',
  'consent.body': '你的資料、你做主。可隨時撤回，系統 24 小時內封存。',
  'consent.bilingual': '查看雙語同意書',
  'consent.withdraw': '撤回同意',
  'consent.toast.bilingual': '已開啟雙語同意書（達悟語待審定）',
  'consent.toast.withdraw': '撤回已受理：24h 內封存，停止跨機構共享與研究，並通知駐點',

  // 篩選（示範 {var} 內插）
  'roster.filtered': '已篩選 {village}部落名冊',
  'roster.cleared': '已清除部落篩選',
} as const;

export type MessageKey = keyof typeof zh;
