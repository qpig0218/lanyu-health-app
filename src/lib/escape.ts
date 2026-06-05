/** HTML 文字內容逃逸（防 XSS）。 */
export function escapeHtml(value: unknown): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** HTML 屬性值逃逸。 */
export function escapeAttr(value: unknown): string {
  return escapeHtml(value);
}
