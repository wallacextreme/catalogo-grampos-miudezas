/**
 * lightbox.ts - Visualizador Lightbox com Zoom de Alta Nitidez (50% a 400%)
 * Permite inspecionar detalhes milimétricos de grampos, roscas, presilhas e travas.
 */

import { icons } from './icons';

export class Lightbox {
  private container: HTMLElement;
  private imgElement: HTMLImageElement;
  private currentZoom = 1;
  private images: string[] = [];
  private currentIndex = 0;
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private translateX = 0;
  private translateY = 0;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'counter-lightbox';
    this.container.className = 'fixed inset-0 z-50 hidden bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 select-none';

    this.container.innerHTML = `
      <!-- Barra Superior -->
      <div class="w-full flex items-center justify-between text-white z-10 px-4 py-2 bg-slate-900/60 rounded-xl backdrop-blur-sm">
        <div class="flex items-center gap-3">
          <span class="font-mono text-sm tracking-wider font-bold text-amber-400" id="lb-counter">1 / 1</span>
          <span class="text-xs text-slate-400" id="lb-title"></span>
        </div>
        <div class="flex items-center gap-2">
          <button id="lb-zoom-out" class="p-2 hover:bg-slate-700 rounded-lg transition-colors title='Diminuir Zoom'" aria-label="Diminuir Zoom">
            ${icons.zoomOut('w-5 h-5 text-slate-200')}
          </button>
          <span id="lb-zoom-level" class="font-mono text-xs font-bold text-slate-300 w-12 text-center">100%</span>
          <button id="lb-zoom-in" class="p-2 hover:bg-slate-700 rounded-lg transition-colors title='Aumentar Zoom'" aria-label="Aumentar Zoom">
            ${icons.zoomIn('w-5 h-5 text-slate-200')}
          </button>
          <button id="lb-zoom-reset" class="px-2 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
            Reset
          </button>
          <div class="h-5 w-px bg-slate-700 mx-1"></div>
          <button id="lb-close" class="p-2 hover:bg-red-600 rounded-lg transition-colors text-white" aria-label="Fechar">
            ${icons.close('w-6 h-6')}
          </button>
        </div>
      </div>

      <!-- Área Central de Imagem -->
      <div id="lb-viewport" class="relative flex-1 w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
        <img id="lb-img" src="" alt="Peça em Alta Resolução" class="max-w-[90vw] max-h-[80vh] object-contain transition-transform duration-75 origin-center shadow-2xl rounded-lg bg-white" draggable="false" />
        
        <!-- Navegação Anterior / Próximo -->
        <button id="lb-prev" class="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/70 hover:bg-blue-600 text-white rounded-full transition-colors hidden" aria-label="Foto Anterior">
          ${icons.chevronLeft('w-6 h-6')}
        </button>
        <button id="lb-next" class="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/70 hover:bg-blue-600 text-white rounded-full transition-colors hidden" aria-label="Próxima Foto">
          ${icons.chevronRight('w-6 h-6')}
        </button>
      </div>

      <!-- Barra Inferior de Dica -->
      <div class="text-xs text-slate-400 font-mono py-1">
        Use a roda do mouse ou os botões para zoom (50% a 400%). Arraste para mover. Tecla ESC para sair.
      </div>
    `;

    document.body.appendChild(this.container);

    this.imgElement = this.container.querySelector('#lb-img') as HTMLImageElement;
    this.bindEvents();
  }

  private bindEvents() {
    const closeBtn = this.container.querySelector('#lb-close')!;
    closeBtn.addEventListener('click', () => this.close());

    const zoomInBtn = this.container.querySelector('#lb-zoom-in')!;
    zoomInBtn.addEventListener('click', () => this.adjustZoom(0.25));

    const zoomOutBtn = this.container.querySelector('#lb-zoom-out')!;
    zoomOutBtn.addEventListener('click', () => this.adjustZoom(-0.25));

    const zoomResetBtn = this.container.querySelector('#lb-zoom-reset')!;
    zoomResetBtn.addEventListener('click', () => this.resetZoom());

    const prevBtn = this.container.querySelector('#lb-prev')!;
    prevBtn.addEventListener('click', () => this.navigate(-1));

    const nextBtn = this.container.querySelector('#lb-next')!;
    nextBtn.addEventListener('click', () => this.navigate(1));

    // Zoom via Scroll da Roda do Mouse
    const viewport = this.container.querySelector('#lb-viewport')!;
    viewport.addEventListener('wheel', (e) => {
      const wheelEv = e as WheelEvent;
      wheelEv.preventDefault();
      const delta = wheelEv.deltaY < 0 ? 0.2 : -0.2;
      this.adjustZoom(delta);
    }, { passive: false });

    // Arrastar imagem quando ampliada
    viewport.addEventListener('mousedown', (e) => {
      const mouseEv = e as MouseEvent;
      if (this.currentZoom > 1) {
        this.isDragging = true;
        this.startX = mouseEv.clientX - this.translateX;
        this.startY = mouseEv.clientY - this.translateY;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.translateX = e.clientX - this.startX;
      this.translateY = e.clientY - this.startY;
      this.updateTransform();
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Teclado: ESC para fechar, setas para navegar
    window.addEventListener('keydown', (e) => {
      if (this.container.classList.contains('hidden')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
    });
  }

  public open(images: string[], startIndex = 0, title = '') {
    if (!images || images.length === 0) return;
    this.images = images;
    this.currentIndex = Math.max(0, Math.min(startIndex, images.length - 1));
    const titleEl = this.container.querySelector('#lb-title')!;
    titleEl.textContent = title;
    this.resetZoom();
    this.updateImage();
    this.container.classList.remove('hidden');
  }

  public close() {
    this.container.classList.add('hidden');
    this.resetZoom();
  }

  private updateImage() {
    this.imgElement.src = this.images[this.currentIndex];
    const counterEl = this.container.querySelector('#lb-counter')!;
    counterEl.textContent = `${this.currentIndex + 1} / ${this.images.length}`;

    const prevBtn = this.container.querySelector('#lb-prev') as HTMLElement;
    const nextBtn = this.container.querySelector('#lb-next') as HTMLElement;

    if (this.images.length > 1) {
      prevBtn.classList.remove('hidden');
      nextBtn.classList.remove('hidden');
    } else {
      prevBtn.classList.add('hidden');
      nextBtn.classList.add('hidden');
    }
  }

  private navigate(delta: number) {
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex + delta + this.images.length) % this.images.length;
    this.resetZoom();
    this.updateImage();
  }

  private adjustZoom(delta: number) {
    this.currentZoom = Math.min(4.0, Math.max(0.5, this.currentZoom + delta));
    if (this.currentZoom === 1) {
      this.translateX = 0;
      this.translateY = 0;
    }
    this.updateTransform();
  }

  private resetZoom() {
    this.currentZoom = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.updateTransform();
  }

  private updateTransform() {
    this.imgElement.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.currentZoom})`;
    const zoomLevelEl = this.container.querySelector('#lb-zoom-level')!;
    zoomLevelEl.textContent = `${Math.round(this.currentZoom * 100)}%`;
  }
}
