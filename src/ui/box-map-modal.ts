/**
 * box-map-modal.ts - Visualizador e Mapeador Geral de Caixas
 * Permite ao atendente navegar rapidamente por todas as caixas físicas da loja,
 * ver a quantidade de peças por caixa e imprimir/exportar o mapa de armazenamento.
 */

import { BoxSummary } from '../types';
import { icons } from './icons';
import { getBoxesSummary } from '../db/indexeddb';

export class BoxMapModal {
  private container: HTMLElement;
  private onSelectBoxCallback: (boxNumber: string) => void;

  constructor(onSelectBox: (boxNumber: string) => void) {
    this.onSelectBoxCallback = onSelectBox;

    this.container = document.createElement('div');
    this.container.id = 'box-map-modal';
    this.container.className = 'fixed inset-0 z-50 hidden bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto';

    this.container.innerHTML = `
      <div class="relative w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        <!-- Topo -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
          <div class="flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-600 text-white">
              ${icons.box('w-6 h-6')}
            </span>
            <div>
              <h2 class="text-lg font-black text-slate-800 dark:text-slate-100">
                Mapa Físico de Caixas e Gavetas
              </h2>
              <span id="box-map-count" class="font-mono text-xs text-slate-500">Carregando caixas...</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-print-boxes" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              ${icons.printer('w-4 h-4')}
              <span>Imprimir Mapa</span>
            </button>
            <button id="box-map-close" class="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl transition-colors" aria-label="Fechar">
              ${icons.close('w-5 h-5')}
            </button>
          </div>
        </div>

        <!-- Filtro Rápido de Caixas -->
        <div class="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div class="relative">
            <input type="text" id="box-filter-input" placeholder="Filtrar por número da caixa..."
              class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <span class="absolute left-3 top-2.5 text-slate-400">
              ${icons.search('w-4 h-4')}
            </span>
          </div>
        </div>

        <!-- Grade de Caixas -->
        <div id="boxes-grid" class="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          <!-- Renderizado dinamicamente -->
        </div>
      </div>
    `;

    document.body.appendChild(this.container);
    this.bindEvents();
  }

  private bindEvents() {
    const closeBtn = this.container.querySelector('#box-map-close')!;
    closeBtn.addEventListener('click', () => this.close());

    const printBtn = this.container.querySelector('#btn-print-boxes')!;
    printBtn.addEventListener('click', () => window.print());

    const filterInput = this.container.querySelector('#box-filter-input') as HTMLInputElement;
    filterInput.addEventListener('input', () => {
      this.filterBoxes(filterInput.value.trim().toLowerCase());
    });
  }

  public async open() {
    this.container.classList.remove('hidden');
    const boxes = await getBoxesSummary();
    this.renderBoxes(boxes);
  }

  public close() {
    this.container.classList.add('hidden');
  }

  private currentBoxes: BoxSummary[] = [];

  private renderBoxes(boxes: BoxSummary[]) {
    this.currentBoxes = boxes;
    const countEl = this.container.querySelector('#box-map-count')!;
    countEl.textContent = `${boxes.length} caixas físicas registradas no balcão`;

    this.filterBoxes('');
  }

  private filterBoxes(term: string) {
    const grid = this.container.querySelector('#boxes-grid')!;
    grid.innerHTML = '';

    const filtered = this.currentBoxes.filter((b) =>
      !term || b.boxNumber.toLowerCase().includes(term) || b.categories.some((c) => c.toLowerCase().includes(term))
    );

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="col-span-full py-12 text-center text-sm text-slate-400 font-mono">Nenhuma caixa encontrada com este filtro.</div>`;
      return;
    }

    filtered.forEach((box) => {
      const card = document.createElement('div');
      card.className = 'group relative flex flex-col items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600 transition-all cursor-pointer shadow-sm hover:shadow-md';

      card.innerHTML = `
        <div class="w-full flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
          <span class="px-2.5 py-1 rounded-lg font-mono text-sm font-black bg-blue-600 text-white shadow-sm">
            CX ${box.boxNumber}
          </span>
          <span class="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
            ${box.itemCount} ${box.itemCount === 1 ? 'item' : 'itens'}
          </span>
        </div>

        <div class="w-16 h-16 my-2 flex items-center justify-center overflow-hidden rounded-xl bg-white p-1">
          <img src="${box.sampleThumbnail}" alt="Caixa ${box.boxNumber}" class="max-w-full max-h-full object-contain filter drop-shadow-sm" loading="lazy" />
        </div>

        <div class="w-full text-center">
          <p class="text-[11px] font-semibold text-slate-600 dark:text-slate-300 truncate" title="${box.categories.join(', ')}">
            ${box.categories[0] || 'Miudezas'}
          </p>
        </div>
      `;

      card.addEventListener('click', () => {
        this.onSelectBoxCallback(box.boxNumber);
        this.close();
      });

      grid.appendChild(card);
    });
  }
}
