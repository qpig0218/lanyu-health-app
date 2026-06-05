// 暫接既有全站樣式；P6 將拆分為 src/styles/* 模組化並換膚。
import '../styles.css';
import { mount } from './lib/dom.ts';
import { store, getState } from './state/store.ts';
import { appClassName, renderApp } from './app.ts';
import { showToast } from './state/actions.ts';

const root = document.getElementById('app');

if (root) {
  const renderInto = (target: HTMLElement): void => {
    target.className = appClassName();
    mount(target, renderApp());
  };

  // 訂閱 store：任何狀態變更（microtask 去抖）後整頁重繪。
  store.subscribe(() => renderInto(root));

  // hash 角色切換：在已登入時於 clinical / resident 間切換，並擋住民眾帳號越權。
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    const role = hash === 'resident' ? 'resident' : 'clinical';
    const state = getState();
    if (!state.authenticated) {
      store.set({ loginRole: role, role });
      return;
    }
    if (state.sessionRole === 'resident' && role !== 'resident') {
      window.location.hash = 'resident';
      showToast('民眾帳號無權限進入醫療/護理系統');
      return;
    }
    if (role !== state.role) {
      store.set({ role });
    }
  });

  // 首次渲染。
  renderInto(root);
}
