import { createStore } from '../lib/store.ts';
import { createInitialState, type State } from './state.ts';

/** 全域應用程式 store（單例）。訂閱者於 main.ts 連結整頁 render。 */
export const store = createStore<State>(createInitialState());

/** 便捷讀取目前狀態。 */
export function getState(): Readonly<State> {
  return store.get();
}
