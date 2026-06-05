import type { AccessKey, AccessLevel, KnowledgeLayerKey } from '../data/types.ts';
import { accessLevels, LEVEL_ORDER } from '../data/access-levels.ts';
import { knowledgeLayers } from '../data/knowledge.ts';

/** 取得目前角色的 RBAC 層級資料（找不到時退回 L4 FNP）。 */
export function currentLevel(accessKey: AccessKey): AccessLevel {
  return accessLevels.find((l) => l.key === accessKey) ?? accessLevels[3]!;
}

/** 是否具備「至少某一治理層級」（數字越小權限越高）。 */
export function hasGov(accessKey: AccessKey, maxKey: AccessKey): boolean {
  return LEVEL_ORDER[accessKey] <= LEVEL_ORDER[maxKey];
}

/** 依 RBAC 計算可見的知識層（K1 公開 / K2 內部 / K3 機敏）。 */
export function visibleKbLayers(accessKey: AccessKey): KnowledgeLayerKey[] {
  return knowledgeLayers
    .filter(([, , , , minKey]) => hasGov(accessKey, minKey as AccessKey))
    .map(([layer]) => layer as KnowledgeLayerKey);
}

/** 該角色是否可檢視指定知識層。 */
export function canViewLayer(accessKey: AccessKey, layer: KnowledgeLayerKey): boolean {
  return visibleKbLayers(accessKey).includes(layer);
}
