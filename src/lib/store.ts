export interface Store<S extends object> {
  get(): Readonly<S>;
  set(patch: Partial<S> | ((state: Readonly<S>) => Partial<S>)): void;
  subscribe(listener: (state: Readonly<S>) => void): () => void;
}

/**
 * 極簡 typed store：合併 patch 後以 microtask 去抖，整批通知一次訂閱者。
 * 避免多個 setter 連續呼叫造成重複 render。
 */
export function createStore<S extends object>(initial: S): Store<S> {
  let state = initial;
  const listeners = new Set<(state: Readonly<S>) => void>();
  let scheduled = false;

  function flush(): void {
    scheduled = false;
    for (const listener of listeners) listener(state);
  }

  return {
    get: () => state,
    set(patch) {
      const next = typeof patch === 'function' ? patch(state) : patch;
      state = { ...state, ...next };
      if (!scheduled) {
        scheduled = true;
        queueMicrotask(flush);
      }
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
