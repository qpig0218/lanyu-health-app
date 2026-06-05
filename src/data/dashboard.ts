// 模組四：決策儀表板 — 三顆數據核彈與三級對比。

/** [標題, 主數字, 副數字, 說明] */
export const dataNukes: readonly (readonly [string, string, string, string])[] = [
  ['糖尿病資料底盤', '3.36%', '37.7%', '健保登錄 vs 健檢實測，落差 11 倍'],
  ['罹病提前', '6–8 歲', '提早', '高血壓 6.2 年、糖尿病 6.8 年、中風 7.9 年'],
  ['醫療可近性', '5.81', '人/萬', '每萬人口醫師數，約全國 1/6；113 年空中轉送 38 件'],
];

/** [來源, 數值, 色票] */
export const threeLevelCompare: readonly (readonly [string, number, string])[] = [
  ['健保登錄', 3.36, 'violet'],
  ['全國平均', 9.8, 'sun'],
  ['健檢實測', 37.7, 'reef'],
];
