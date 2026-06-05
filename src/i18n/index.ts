import { getState } from '../state/store.ts';
import { translate, type Vars } from './translate.ts';
import { zh, type MessageKey } from './zh.ts';
import { taoCertified } from './tao.ts';

export type { MessageKey } from './zh.ts';
export { interpolate, translate } from './translate.ts';

/** 取得目前語言下的翻譯文字（達悟語未審定則 fallback 中文）。 */
export function t(key: MessageKey, vars?: Vars): string {
  return translate(key, getState().lang, zh, taoCertified, vars).text;
}

/** 目前是否因達悟語未審定而退回中文（供 UI 決定是否顯示「待審定」徽章）。 */
export function isPending(key: MessageKey): boolean {
  return translate(key, getState().lang, zh, taoCertified, undefined).pending;
}
