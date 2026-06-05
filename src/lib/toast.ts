import { html, type SafeHtml } from './html.ts';

/**
 * 渲染 toast 提示區（aria-live=polite，螢幕報讀器可即時播報）。
 * 訊息內容由 store 狀態驅動；空字串時不顯示但保留 live region 容器。
 */
export function renderToast(message: string): SafeHtml {
  return html`
    <div class="toast-region" role="status" aria-live="polite" aria-atomic="true">
      ${message ? html`<div class="toast">${message}</div>` : ''}
    </div>
  `;
}
