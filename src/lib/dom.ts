import { bindPendingEvents, type SafeHtml } from './html.ts';

/**
 * 把 SafeHtml 掛載到根節點：整頁重繪 + 事件委派綁定。
 * render 前後保存/還原焦點與輸入框 selection，避免整頁重繪丟失焦點（a11y）。
 */
export function mount(root: HTMLElement, view: SafeHtml): void {
  const active = document.activeElement as HTMLElement | null;
  const focusKey = active?.getAttribute('data-focus') ?? null;
  const selStart = (active as HTMLInputElement | null)?.selectionStart ?? null;
  const selEnd = (active as HTMLInputElement | null)?.selectionEnd ?? null;

  // 唯一允許寫入 innerHTML 的位置；內容來自 SafeHtml（已逃逸），故安全。
  // eslint-disable-next-line no-restricted-syntax
  root.innerHTML = view.value;
  bindPendingEvents(root);

  if (focusKey) {
    const next = root.querySelector<HTMLElement>(`[data-focus="${CSS.escape(focusKey)}"]`);
    if (next) {
      next.focus();
      if (selStart != null && selEnd != null && 'setSelectionRange' in next) {
        try {
          (next as HTMLInputElement).setSelectionRange(selStart, selEnd);
        } catch {
          /* 非文字輸入元素，忽略 */
        }
      }
    }
  }
}
