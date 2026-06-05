import { mount } from './lib/dom.ts';
import { html } from './lib/html.ts';

const root = document.getElementById('app');
if (root) {
  mount(root, html`<div class="boot">Ayoi 蘭嶼健康 — 工程化重構進行中</div>`);
}
