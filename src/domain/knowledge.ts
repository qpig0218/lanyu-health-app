import type { AccessKey, KnowledgeEntry, KnowledgeLayerKey } from '../data/types.ts';
import { knowledgeBase } from '../data/knowledge.ts';
import { canViewLayer } from './rbac.ts';

/**
 * 依 layer + RBAC + query 檢索知識庫（對應問答 Agent H0）。
 * - 角色無權檢視該層 → 回空（跨層拒答，不洩漏）。
 * - 有 query 但無命中 → 回空（由 UI 回「不知道」，絕不編造）。
 */
export function searchKnowledge(
  accessKey: AccessKey,
  layer: KnowledgeLayerKey,
  query: string,
): KnowledgeEntry[] {
  if (!canViewLayer(accessKey, layer)) return [];
  const pool = knowledgeBase.filter((entry) => entry.layer === layer);
  const q = query.trim();
  if (!q) return pool;
  return pool.filter((entry) => entry.q.includes(q) || entry.zh.includes(q));
}

/** 是否有命中（供 UI 決定顯示答案或「目前查無可靠資料」）。 */
export function hasKnowledgeHit(
  accessKey: AccessKey,
  layer: KnowledgeLayerKey,
  query: string,
): boolean {
  return searchKnowledge(accessKey, layer, query).length > 0;
}
