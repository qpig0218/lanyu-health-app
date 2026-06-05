import { html, type SafeHtml } from '../lib/html.ts';
import { icon } from '../lib/icon.ts';
import { getState } from '../state/store.ts';
import type { KnowledgeEntry, KnowledgeLayerKey } from '../data/types.ts';
import { knowledgeLayers } from '../data/knowledge.ts';
import { searchKnowledge } from '../domain/knowledge.ts';
import { visibleKbLayers } from '../domain/rbac.ts';
import { setKbLayer, setKbQuery, showToast, toggleLang } from '../state/actions.ts';

function renderKbCard(e: KnowledgeEntry): SafeHtml {
  const state = getState();
  const body = state.lang === 'tao' && e.tao ? e.tao : e.zh;
  const confCls = e.conf === '高' ? 'green' : e.conf === '中' ? 'yellow' : '';
  return html`
    <article class="kb-card">
      <div class="kb-q"><span class="status-pill">${e.layer}</span><h3>${e.q}</h3></div>
      <p class="kb-a">${body}</p>
      <div class="kb-meta">
        <span class="kb-source">${icon('book')}來源：${e.src}</span>
        <span class="status-pill ${confCls}">信心 ${e.conf}</span>
        ${e.taoCert && e.taoCert !== '—'
          ? html`<span class="tag">達悟語審定：${e.taoCert}</span>`
          : ''}
        <button
          class="xai-btn"
          ${{ on: { click: () => showToast('問答 Agent 邊界：不臨床診斷、不洩個資、不答未審定族語、不編造') } }}
        >${icon('search')}為什麼這個答案？</button>
      </div>
    </article>
  `;
}

export function renderKnowledgeModule(): SafeHtml {
  const state = getState();
  const layers = visibleKbLayers(state.accessKey);
  const activeLayer = state.kbLayer && layers.includes(state.kbLayer as KnowledgeLayerKey)
    ? state.kbLayer
    : 'K1';
  const entries = searchKnowledge(state.accessKey, activeLayer as KnowledgeLayerKey, state.kbQuery);
  return html`
    <section class="module-stage">
      <div class="module-stage-head">
        <div><span class="ai-kicker">模組五・知識問答庫（問答 Agent H0）</span><h2>自然語言查正確答案，對外口徑一致</h2>
          <p>三層 K1/K2/K3 綁 RBAC；每答必附來源與信心分級；不知道就說不知道；達悟語須部落顧問審定。</p></div>
        <button class="gov-pill ${state.lang === 'tao' ? 'active' : ''}" ${{ on: { click: () => toggleLang() } }}>${icon('globe')}${state.lang === 'tao' ? '達悟語' : '中文'}輸入</button>
      </div>
      <div class="kb-layer-tabs">
        ${knowledgeLayers.map(([code, name]) => {
          const allowed = layers.includes(code as KnowledgeLayerKey);
          return html`<button
            class="${activeLayer === code ? 'active' : ''} ${allowed ? '' : 'locked'}"
            ${{
              on: {
                click: allowed
                  ? () => setKbLayer(code)
                  : () =>
                      showToast(
                        `跨層拒答：${code} ${name} 需更高權限，請洽 ${code === 'K3' ? 'PMO' : '駐點'}`,
                      ),
              },
            }}
          >${allowed ? '' : icon('lock')}<strong>${code}</strong><small>${name}</small></button>`;
        })}
      </div>
      <div class="kb-search">${icon('search')}<input
          value="${state.kbQuery || ''}"
          ${{ on: { input: (e: Event) => setKbQuery((e.target as HTMLInputElement).value) } }}
          placeholder="${state.lang === 'tao'
            ? '以達悟語輸入問題…（答覆須審定）'
            : '輸入問題，例如：紅級異常怎麼處理？'}"
          data-focus="kb-search"
        /><button class="btn" ${{ on: { click: () => showToast('問答 Agent（RAG）已檢索，附來源與信心') } }}>${icon('book')}查詢</button></div>
      <div class="module-body">
        <div class="kb-list">
          ${entries.length
            ? entries.map((e) => renderKbCard(e))
            : html`<div class="empty-state">此層暫無命中。問答 Agent 會回覆「不確定，請洽 PMO」而非編造。</div>`}
        </div>
      </div>
    </section>
  `;
}
