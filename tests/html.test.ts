import { describe, it, expect } from 'vitest';
import { html, raw, pendingHandlerCount, type EventSpec } from '../src/lib/html.ts';
import { escapeHtml } from '../src/lib/escape.ts';

describe('html safe template', () => {
  it('逃逸 <script>（防 XSS）', () => {
    const evil = '<script>alert(1)</script>';
    const out = html`<div>${evil}</div>`.value;
    expect(out).not.toContain('<script>');
    expect(out).toContain('&lt;script&gt;');
  });

  it('逃逸屬性中的引號', () => {
    const evil = '" onmouseover="alert(1)';
    const out = html`<div title="${evil}"></div>`.value;
    expect(out).not.toContain('onmouseover="alert(1)"');
    expect(out).toContain('&quot;');
  });

  it('SafeHtml / raw 不被二次逃逸', () => {
    const inner = raw('<b>粗體</b>');
    const out = html`<div>${inner}</div>`.value;
    expect(out).toContain('<b>粗體</b>');
  });

  it('巢狀 html`` 原樣插入', () => {
    const child = html`<span>${'<x>'}</span>`;
    const out = html`<div>${child}</div>`.value;
    expect(out).toBe('<div><span>&lt;x&gt;</span></div>');
  });

  it('陣列內插逐項逃逸並串接', () => {
    const out = html`<ul>${['<a>', '<b>'].map((x) => html`<li>${x}</li>`)}</ul>`.value;
    expect(out).toBe('<ul><li>&lt;a&gt;</li><li>&lt;b&gt;</li></ul>');
  });

  it('EventSpec 不產生 inline handler，改用 data-evt', () => {
    const spec: EventSpec = { on: { click: () => undefined } };
    const out = html`<button ${spec}>x</button>`.value;
    expect(out).not.toContain('onclick');
    expect(out).toContain('data-evt=');
    expect(pendingHandlerCount()).toBeGreaterThan(0);
  });

  it('null / undefined / false 內插為空字串', () => {
    expect(html`<i>${null}${undefined}${false}</i>`.value).toBe('<i></i>');
  });

  it('escapeHtml 處理所有危險字元', () => {
    expect(escapeHtml(`&<>"'`)).toBe('&amp;&lt;&gt;&quot;&#39;');
  });
});
