export type Role = 'clinical' | 'resident';

/** 從 ?role= 或 hash 解析初始角色，預設 clinical。 */
export function parseInitialRole(): Role {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('role') ?? window.location.hash.replace('#', '');
  return requested === 'resident' ? 'resident' : 'clinical';
}

/** 更新網址 hash 為角色（移除 ?role= 查詢參數），不重新載入頁面。 */
export function syncRoleToUrl(role: Role | ''): void {
  const url = new URL(window.location.href);
  url.searchParams.delete('role');
  url.hash = role;
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

/** 監聽 hashchange，回呼最新角色。 */
export function onHashRole(callback: (role: Role) => void): void {
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'clinical' || hash === 'resident') callback(hash);
  });
}
