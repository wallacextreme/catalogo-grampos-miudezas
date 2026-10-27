/**
 * main.ts - Ponto de Entrada da Aplicação de Balcão Offline-First
 * Gerencia estado global, busca instantânea (< 50ms), persistência IndexedDB,
 * modo mural visual e modais de lightbox, CRUD e mapa de caixas.
 */

import { Product, FilterState } from './types';
import { icons } from './ui/icons';
import { SearchEngine } from './search/engine';
import { renderCounterCard, renderMuralCard } from './ui/product-card';
import { Lightbox } from './ui/lightbox';
import { ProductFormModal } from './ui/product-form-modal';
import { BoxMapModal } from './ui/box-map-modal';
import {
  syncStaticCatalogUpdates,
  getAllProducts,
  exportCatalogBackup,
  importCatalogBackup
} from './db/indexeddb';

class BalcaoApp {
  private allProducts: Product[] = [];
  private filteredProducts: Product[] = [];
  private searchEngine: SearchEngine = new SearchEngine();
  private lightbox: Lightbox;
  private productModal: ProductFormModal | null = null;
  private boxMapModal: BoxMapModal;

  private state: FilterState = {
    query: '',
    category: 'all',
    carmaker: 'all',
    status: 'all',
    viewMode: 'grid',
    showPrices: true,
    theme: 'light'
  };

  constructor() {
    this.lightbox = new Lightbox();
    this.boxMapModal = new BoxMapModal((boxNumber) => {
      this.filterByBox(boxNumber);
    });
  }

  public async init() {
    this.initTheme();
    this.bindDOMEvents();
    this.registerServiceWorker();

    try {
      // 1. Carregar seed estático dos .docx extraídos
      const seedResponse = await fetch('./catalog-master-seed.json');
      const seedData = await seedResponse.json();
      const seedProducts: Product[] = seedData.items || [];

      // 2. Sincronizar com IndexedDB preservando edições manuais (Gate 8)
      this.allProducts = await syncStaticCatalogUpdates(seedProducts);
    } catch {
      // Fallback caso offline ou erro na rede: ler direto do IndexedDB
      this.allProducts = await getAllProducts();
    }

    // 3. Inicializar categorias e motor de busca
    this.populateCategories();
    this.searchEngine.indexProducts(this.allProducts);

    // 4. Inicializar modal de produto
    const categories = Array.from(new Set(this.allProducts.map((p) => p.category))).sort();
    this.productModal = new ProductFormModal(
      categories,
      (updatedProduct) => this.handleProductSaved(updatedProduct),
      (deletedId) => this.handleProductDeleted(deletedId)
    );

    // 5. Renderizar lista inicial
    this.applyFilters();
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('balcao_theme') as 'light' | 'dark' | null;
    this.state.theme = savedTheme || 'light';
    this.applyTheme();
  }

  private applyTheme() {
    const root = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');

    if (this.state.theme === 'dark') {
      root.classList.add('dark');
      if (themeIcon) themeIcon.innerHTML = icons.sun('w-4 h-4 text-amber-400');
      if (themeIconMobile) themeIconMobile.innerHTML = icons.sun('w-5 h-5 text-amber-400');
    } else {
      root.classList.remove('dark');
      if (themeIcon) themeIcon.innerHTML = icons.moon('w-4 h-4 text-slate-700');
      if (themeIconMobile) themeIconMobile.innerHTML = icons.moon('w-5 h-5 text-slate-700');
    }
    localStorage.setItem('balcao_theme', this.state.theme);
  }

  private toggleTheme() {
    this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  private populateCategories() {
    const select = document.getElementById('filter-category') as HTMLSelectElement;
    if (!select) return;

    const categories = Array.from(new Set(this.allProducts.map((p) => p.category))).sort();
    select.innerHTML = '<option value="all">Todas as Seções (15 Categorias)</option>';

    categories.forEach((cat) => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      select.appendChild(opt);
    });
  }

  private bindDOMEvents() {
    // Omnibox Search
    const searchInput = document.getElementById('omnibox-search') as HTMLInputElement;
    const clearBtn = document.getElementById('btn-clear-search')!;

    searchInput?.addEventListener('input', () => {
      this.state.query = searchInput.value;
      if (this.state.query) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
      this.applyFilters();
    });

    clearBtn?.addEventListener('click', () => {
      searchInput.value = '';
      this.state.query = '';
      clearBtn.classList.add('hidden');
      searchInput.focus();
      this.applyFilters();
    });

    // Tecla de atalho '/' para focar a barra de pesquisa sem bloquear ArrowUp/ArrowDown
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });

    // Filtros Rápidos
    const catSelect = document.getElementById('filter-category') as HTMLSelectElement;
    catSelect?.addEventListener('change', () => {
      this.state.category = catSelect.value;
      this.applyFilters();
    });

    const carmakerSelect = document.getElementById('filter-carmaker') as HTMLSelectElement;
    carmakerSelect?.addEventListener('change', () => {
      this.state.carmaker = carmakerSelect.value;
      this.applyFilters();
    });

    const statusSelect = document.getElementById('filter-status') as HTMLSelectElement;
    statusSelect?.addEventListener('change', () => {
      this.state.status = statusSelect.value as FilterState['status'];
      this.applyFilters();
    });

    // Alternador de Visualização: Grade Detalhada vs Mural Visual
    const btnToggleView = document.getElementById('btn-toggle-view')!;
    this.updateViewModeButton();
    btnToggleView?.addEventListener('click', () => {
      this.state.viewMode = this.state.viewMode === 'grid' ? 'mural' : 'grid';
      this.updateViewModeButton();
      this.renderProducts();
    });

    // Toggle de Preços
    const btnTogglePrices = document.getElementById('btn-toggle-prices')!;
    this.updatePricesButton();
    btnTogglePrices?.addEventListener('click', () => {
      this.state.showPrices = !this.state.showPrices;
      this.updatePricesButton();
      this.renderProducts();
      this.showToast(
        this.state.showPrices ? 'Preços visíveis na tela' : 'Preços ocultados (Modo Balcão)',
        this.state.showPrices ? icons.eye('w-4 h-4 text-emerald-400') : icons.eyeOff('w-4 h-4 text-amber-400')
      );
    });

    // Mapa de Caixas
    document.getElementById('btn-box-map')?.addEventListener('click', () => {
      this.boxMapModal.open();
    });

    // Temas
    document.getElementById('btn-toggle-theme')?.addEventListener('click', () => this.toggleTheme());
    document.getElementById('btn-theme-mobile')?.addEventListener('click', () => this.toggleTheme());

    // Nova Peça
    document.getElementById('btn-new-item')?.addEventListener('click', () => {
      this.productModal?.openNew();
    });
    document.getElementById('btn-new-item-mobile')?.addEventListener('click', () => {
      this.productModal?.openNew();
    });

    // Limpar Filtros
    document.getElementById('btn-clear-filters')?.addEventListener('click', () => {
      this.clearAllFilters();
    });

    // Backup & Restore
    document.getElementById('btn-backup')?.addEventListener('click', () => {
      this.handleBackupPrompt();
    });
  }

  private updateViewModeButton() {
    const iconEl = document.getElementById('view-mode-icon');
    const textEl = document.getElementById('view-mode-text');
    if (this.state.viewMode === 'grid') {
      if (iconEl) iconEl.innerHTML = icons.layoutGrid('w-4 h-4 text-blue-600');
      if (textEl) textEl.textContent = 'Mural Visual';
    } else {
      if (iconEl) iconEl.innerHTML = icons.grid('w-4 h-4 text-amber-500');
      if (textEl) textEl.textContent = 'Grade Padrão';
    }
  }

  private updatePricesButton() {
    const iconEl = document.getElementById('prices-icon');
    if (iconEl) {
      iconEl.innerHTML = this.state.showPrices
        ? icons.eye('w-4 h-4 text-slate-700 dark:text-slate-200')
        : icons.eyeOff('w-4 h-4 text-amber-500');
    }
  }

  public applyFilters() {
    const startTime = performance.now();

    this.filteredProducts = this.searchEngine.search(this.state.query, {
      category: this.state.category,
      carmaker: this.state.carmaker,
      status: this.state.status
    });

    const latency = performance.now() - startTime;
    this.updateStats(latency);
    this.renderProducts();
  }

  private updateStats(latencyMs: number) {
    const countEl = document.getElementById('results-count');
    const latencyEl = document.getElementById('search-latency');

    if (countEl) {
      countEl.textContent = `${this.filteredProducts.length} ${this.filteredProducts.length === 1 ? 'peça' : 'peças'}`;
    }

    if (latencyEl) {
      latencyEl.textContent = `${latencyMs.toFixed(1)}ms`;
    }
  }

  private renderProducts() {
    const grid = document.getElementById('products-grid')!;
    const emptyState = document.getElementById('empty-state')!;

    grid.innerHTML = '';

    if (this.filteredProducts.length === 0) {
      emptyState.classList.remove('hidden');
      grid.classList.add('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    grid.classList.remove('hidden');

    // Seletor de layout baseado no viewMode
    if (this.state.viewMode === 'mural') {
      grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4';
    } else {
      grid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6';
    }

    // Renderizar itens (limite de render inicial de 150 para latência zero, expandido sob demanda)
    const itemsToRender = this.filteredProducts.slice(0, 150);

    const onOpenLightbox = (images: string[], index: number, title: string) => {
      this.lightbox.open(images, index, title);
    };

    const onEditProduct = (product: Product) => {
      this.productModal?.openEdit(product);
    };

    const onCopyText = (text: string, label: string) => {
      navigator.clipboard.writeText(text);
      this.showToast(`${label} copiado: ${text}`, icons.check('w-4 h-4 text-emerald-400'));
    };

    const fragment = document.createDocumentFragment();

    itemsToRender.forEach((product) => {
      let cardEl: HTMLElement;
      if (this.state.viewMode === 'mural') {
        cardEl = renderMuralCard(product, onOpenLightbox, onEditProduct);
      } else {
        cardEl = renderCounterCard(product, this.state.showPrices, onOpenLightbox, onEditProduct, onCopyText);
      }
      fragment.appendChild(cardEl);
    });

    grid.appendChild(fragment);
  }

  public filterByBox(boxNumber: string) {
    const searchInput = document.getElementById('omnibox-search') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = `cx ${boxNumber}`;
      this.state.query = `cx ${boxNumber}`;
      document.getElementById('btn-clear-search')?.classList.remove('hidden');
    }
    this.applyFilters();
  }

  private clearAllFilters() {
    const searchInput = document.getElementById('omnibox-search') as HTMLInputElement;
    const catSelect = document.getElementById('filter-category') as HTMLSelectElement;
    const carmakerSelect = document.getElementById('filter-carmaker') as HTMLSelectElement;
    const statusSelect = document.getElementById('filter-status') as HTMLSelectElement;

    if (searchInput) searchInput.value = '';
    if (catSelect) catSelect.value = 'all';
    if (carmakerSelect) carmakerSelect.value = 'all';
    if (statusSelect) statusSelect.value = 'all';

    this.state.query = '';
    this.state.category = 'all';
    this.state.carmaker = 'all';
    this.state.status = 'all';

    document.getElementById('btn-clear-search')?.classList.add('hidden');
    this.applyFilters();
  }

  private handleProductSaved(product: Product) {
    const existingIndex = this.allProducts.findIndex((p) => p.id === product.id);
    if (existingIndex >= 0) {
      this.allProducts[existingIndex] = product;
    } else {
      this.allProducts.unshift(product);
    }
    this.searchEngine.indexProducts(this.allProducts);
    this.applyFilters();
    this.showToast('Peça salva no catálogo com sucesso!', icons.check('w-4 h-4 text-emerald-400'));
  }

  private handleProductDeleted(id: string) {
    this.allProducts = this.allProducts.filter((p) => p.id !== id);
    this.searchEngine.indexProducts(this.allProducts);
    this.applyFilters();
    this.showToast('Peça removida do catálogo.', icons.trash('w-4 h-4 text-red-400'));
  }

  private async handleBackupPrompt() {
    const action = confirm(
      'DESEJA EXPORTAR OU RESTAURAR O BACKUP?\n\n' +
      '[OK] = Exportar Backup Completo com Hash SHA-256 (.json)\n' +
      '[Cancelar] = Selecionar arquivo para Restaurar Backup'
    );

    if (action) {
      // Exportar
      const backup = await exportCatalogBackup();
      const blob = new Blob([backup.jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup_catalogo_miudezas_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast(`Backup de ${backup.totalItems} itens gerado (SHA-256 verificado)`, icons.download('w-4 h-4 text-blue-400'));
    } else {
      // Importar
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.json';
      fileInput.onchange = async () => {
        if (fileInput.files?.[0]) {
          const text = await fileInput.files[0].text();
          const res = await importCatalogBackup(text);
          if (res.success) {
            this.allProducts = await getAllProducts();
            this.searchEngine.indexProducts(this.allProducts);
            this.applyFilters();
            this.showToast(`${res.importedCount} itens restaurados com sucesso!`, icons.check('w-4 h-4 text-emerald-400'));
          } else {
            alert('Falha na restauração do backup: ' + res.error);
          }
        }
      };
      fileInput.click();
    }
  }

  public showToast(message: string, iconSvg: string) {
    const toast = document.getElementById('toast')!;
    const msgEl = document.getElementById('toast-message')!;
    const iconEl = document.getElementById('toast-icon')!;

    msgEl.textContent = message;
    iconEl.innerHTML = iconSvg;

    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2800);
  }

  private registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch((err) => {
        console.warn('SW registration failed:', err);
      });
    }
  }
}

// Inicializar aplicação ao carregar o DOM
window.addEventListener('DOMContentLoaded', () => {
  const app = new BalcaoApp();
  app.init();
});
