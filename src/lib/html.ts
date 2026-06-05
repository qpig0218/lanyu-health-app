import { escapeHtml } from './escape.ts';

/** 已逃逸 / 已驗證安全的 HTML 片段。只能經由 html`` 或 raw() 產生。 */
export class SafeHtml {
  constructor(public readonly value: string) {}
  toString(): string {
    return this.value;
  }
}

/** 明確標記為安全（如 icon SVG、預先逃逸的字串）。慎用。 */
export function raw(value: string): SafeHtml {
  return new SafeHtml(value);
}

/** 事件描述物件：放在標籤屬性位置，由 mount() 委派綁定，不產生 inline handler。 */
export interface EventSpec {
  on: Record<string, (event: Event) => void>;
}

function isEventSpec(value: unknown): value is EventSpec {
  return typeof value === 'object' && value !== null && 'on' in value;
}

export type Interp =
  | string
  | number
  | boolean
  | null
  | undefined
  | SafeHtml
  | readonly Interp[]
  | EventSpec;

let seq = 0;
const pendingHandlers = new Map<string, Record<string, (event: Event) => void>>();

function renderInterp(value: Interp): string {
  if (value == null || value === false || value === true) return '';
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) {
    return (value as readonly Interp[]).map((item) => renderInterp(item)).join('');
  }
  if (isEventSpec(value)) {
    const id = `e${(seq += 1)}`;
    pendingHandlers.set(id, value.on);
    return `data-evt="${id}"`;
  }
  return escapeHtml(value);
}

/** 安全 HTML 樣板。所有內插值預設逃逸；SafeHtml 原樣插入；EventSpec 轉成委派綁定。 */
export function html(strings: TemplateStringsArray, ...values: Interp[]): SafeHtml {
  let out = strings[0] ?? '';
  for (let i = 0; i < values.length; i += 1) {
    out += renderInterp(values[i]) + (strings[i + 1] ?? '');
  }
  return new SafeHtml(out);
}

/** 由 mount() 呼叫：把 root 內的 [data-evt] 綁定對應 handler，並清空待綁定登錄。 */
export function bindPendingEvents(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>('[data-evt]').forEach((el) => {
    const id = el.dataset['evt'];
    if (!id) return;
    const handlers = pendingHandlers.get(id);
    if (!handlers) return;
    for (const [type, handler] of Object.entries(handlers)) {
      el.addEventListener(type, handler);
    }
    el.removeAttribute('data-evt');
  });
  pendingHandlers.clear();
}

/** 測試輔助：目前待綁定的 handler 數量。 */
export function pendingHandlerCount(): number {
  return pendingHandlers.size;
}
