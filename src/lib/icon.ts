import { raw, type SafeHtml } from './html.ts';

export type IconName =
  | 'home'
  | 'users'
  | 'clipboard'
  | 'lab'
  | 'alert'
  | 'calendar'
  | 'shield'
  | 'search'
  | 'check'
  | 'arrow'
  | 'chart'
  | 'robot'
  | 'book'
  | 'globe'
  | 'node'
  | 'lock';

/** 由 index.html 的 SVG sprite 取用圖示；回傳 SafeHtml（名稱為固定常數，無 XSS 風險）。 */
export function icon(name: IconName): SafeHtml {
  return raw(`<svg class="icon" aria-hidden="true"><use href="#icon-${name}"></use></svg>`);
}
