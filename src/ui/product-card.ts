/**
 * product-card.ts - Renderizadores de Cards de Balcão e Mural Visual
 * Projetado para máxima velocidade de leitura ocular (< 1 segundo para identificar a caixa).
 */

import { Product } from '../types';
import { icons } from './icons';

export function renderCounterCard(
  product: Product,
  showPrices: boolean,
  onOpenLightbox: (images: string[], index: number, title: string) => void,
  onEditProduct: (product: Product) => void,
  onCopyText: (text: string, label: string) => void
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'group relative flex flex-col bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden';

  const boxDisplay = product.boxNumber || 'S/N';
  const internalCodeDisplay = product.internalCode ? `MU: ${product.internalCode}` : '';
  const primaryThumb = product.thumbnail || (product.images && product.images[0]) || '/catalog-images/placeholder.webp';
  const hasImages = product.images && product.images.length > 0;
  const imageCount = product.images ? product.images.length : 0;

  // Cor do Badge da Caixa baseado no padrão numérico
  let badgeColorClass = 'bg-blue-600 text-white';
  if (boxDisplay.toUpperCase().includes('GAVETA')) {
    badgeColorClass = 'bg-amber-600 text-white';
  } else if (boxDisplay.startsWith('10')) {
    badgeColorClass = 'bg-emerald-600 text-white';
  }

  card.innerHTML = `
    <!-- Topo: Bloco Gigante de Caixa e Código Interno -->
    <div class="flex items-center justify-between p-3.5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xl sm:text-2xl font-black tracking-tight ${badgeColorClass} shadow-sm">
          ${icons.box('w-5 h-5 text-white/90')}
          <span>CX ${boxDisplay}</span>
        </span>
      </div>
      
      <div class="flex items-center gap-1.5">
        ${internalCodeDisplay ? `
          <button class="btn-copy-code inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" title="Clique para copiar código interno">
            <span>${internalCodeDisplay}</span>
            ${icons.copy('w-3.5 h-3.5 text-slate-500')}
          </button>
        ` : ''}

        <button class="btn-quick-edit p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Editar / Adicionar Foto (Ctrl+V)" aria-label="Editar">
          ${icons.edit('w-4 h-4')}
        </button>
      </div>
    </div>

    <!-- Foto Ampla da Peça (Centro) -->
    <div class="relative w-full h-52 bg-white flex items-center justify-center p-3 cursor-pointer group-hover:scale-[1.02] transition-transform duration-200 overflow-hidden border-b border-slate-100 dark:border-slate-700/50">
      <img src="${primaryThumb}" alt="${product.description}" class="img-preview max-w-full max-h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />

      <!-- Indicador de Múltiplos Ângulos -->
      ${imageCount > 1 ? `
        <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-sm flex items-center gap-1">
          ${icons.image('w-3 h-3 text-amber-400')}
          <span>${imageCount} fotos</span>
        </span>
      ` : ''}

      <!-- Badge de Revisão se for Apenas Foto + Caixa -->
      ${product.needsDescriptionReview ? `
        <span class="absolute top-2 left-2 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-amber-500/90 text-white shadow-sm flex items-center gap-1">
          ${icons.alertCircle('w-3 h-3 text-white')}
          <span>Identificação Visual</span>
        </span>
      ` : ''}

      <div class="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span class="p-2 rounded-full bg-slate-900/70 text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
          ${icons.zoomIn('w-5 h-5')}
        </span>
      </div>
    </div>

    <!-- Detalhes, Referências e Aplicação -->
    <div class="p-4 flex-1 flex flex-col justify-between gap-3">
      <div>
        <!-- Categoria -->
        <span class="text-[11px] font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 font-mono line-clamp-1 mb-1">
          ${product.category}
        </span>

        <!-- Descrição Principal Limpa -->
        <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2" title="${product.description}">
          ${product.cleanDescription || product.description}
        </h3>
      </div>

      <!-- Códigos de Referência de Fabricantes -->
      ${product.refCodes && product.refCodes.length > 0 ? `
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${product.refCodes.slice(0, 4).map(code => `
            <button class="btn-copy-ref inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-blue-500 transition-colors" data-code="${code}" title="Copiar ${code}">
              <span>${code}</span>
              ${icons.copy('w-2.5 h-2.5 text-slate-400')}
            </button>
          `).join('')}
        </div>
      ` : ''}

      <!-- Montadoras e Medidas Técnicas -->
      <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400">
        <div class="flex items-center gap-1.5 font-medium line-clamp-1">
          ${icons.car('w-3.5 h-3.5 text-slate-400')}
          <span>${(product.carmakers || ['Universal']).join(', ')}</span>
        </div>

        ${showPrices && product.price !== null ? `
          <span class="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">
            R$ ${product.price.toFixed(2)}
          </span>
        ` : ''}
      </div>
    </div>
  `;

  // Event Listeners
  const imgPreview = card.querySelector('.img-preview')!;
  imgPreview.parentElement?.addEventListener('click', () => {
    if (hasImages) {
      onOpenLightbox(product.images, 0, `CX ${boxDisplay} — ${product.cleanDescription || product.description}`);
    }
  });

  const btnEdit = card.querySelector('.btn-quick-edit');
  btnEdit?.addEventListener('click', (e) => {
    e.stopPropagation();
    onEditProduct(product);
  });

  const btnCopyCode = card.querySelector('.btn-copy-code');
  btnCopyCode?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (product.internalCode) {
      onCopyText(product.internalCode, 'Código Interno');
    }
  });

  const refBtns = card.querySelectorAll('.btn-copy-ref');
  refBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = (btn as HTMLElement).dataset.code;
      if (code) {
        onCopyText(code, 'Código de Referência');
      }
    });
  });

  return card;
}

/**
 * Renderizador de Card para o Modo Mural Visual (Fotos Grandes)
 * Projetado para balconista comparando grampo/peça na mão com as fotos da tela.
 */
export function renderMuralCard(
  product: Product,
  onOpenLightbox: (images: string[], index: number, title: string) => void,
  onEditProduct: (product: Product) => void
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'group relative flex flex-col bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 shadow-sm hover:shadow-2xl transition-all duration-200 overflow-hidden cursor-pointer';

  const boxDisplay = product.boxNumber || 'S/N';
  const primaryThumb = product.thumbnail || (product.images && product.images[0]) || '/catalog-images/placeholder.webp';
  const hasImages = product.images && product.images.length > 0;

  card.innerHTML = `
    <!-- Foto Gigante Central -->
    <div class="relative w-full aspect-square bg-white flex items-center justify-center p-3 overflow-hidden">
      <img src="${primaryThumb}" alt="${product.description}" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200 filter drop-shadow-sm select-none" loading="lazy" />

      <!-- BADGE GIGANTE DA CAIXA NO TOPO -->
      <div class="absolute top-2 left-2 z-10">
        <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-mono text-xl sm:text-2xl font-black bg-blue-600 text-white shadow-lg tracking-tight">
          CX ${boxDisplay}
        </span>
      </div>

      ${product.internalCode ? `
        <div class="absolute top-2 right-2 z-10">
          <span class="px-2 py-1 rounded-lg font-mono text-xs font-black bg-slate-900/80 text-white backdrop-blur-sm shadow-sm">
            ${product.internalCode}
          </span>
        </div>
      ` : ''}

      <div class="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span class="p-3 rounded-full bg-slate-900/80 text-white shadow-xl transform scale-90 group-hover:scale-110 transition-transform">
          ${icons.zoomIn('w-6 h-6 text-amber-400')}
        </span>
      </div>
    </div>

    <!-- Rodapé Compacto -->
    <div class="p-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-800/80">
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
          ${product.cleanDescription || product.description}
        </p>
        <span class="text-[10px] font-mono text-slate-500 dark:text-slate-400">
          ${(product.refCodes || []).slice(0, 2).join(' | ') || product.category}
        </span>
      </div>
      <button class="btn-mural-edit p-1.5 text-slate-400 hover:text-blue-600 rounded-lg transition-colors" title="Editar" aria-label="Editar">
        ${icons.edit('w-4 h-4')}
      </button>
    </div>
  `;

  card.addEventListener('click', () => {
    if (hasImages) {
      onOpenLightbox(product.images, 0, `CX ${boxDisplay} — ${product.cleanDescription || product.description}`);
    }
  });

  const btnEdit = card.querySelector('.btn-mural-edit');
  btnEdit?.addEventListener('click', (e) => {
    e.stopPropagation();
    onEditProduct(product);
  });

  return card;
}
