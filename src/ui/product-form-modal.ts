/**
 * product-form-modal.ts - Modal CRUD de Balcão com Galeria Multi-Ângulos (Ctrl+V)
 * Permite cadastrar novos itens, editar caixas/códigos, colar imagens do clipboard
 * e persistir no IndexedDB sem sobrescrita (Gate 8).
 */

import { Product } from '../types';
import { icons } from './icons';
import { convertBlobToWebP, createThumbnailWebP } from '../media/webp-converter';
import { saveProduct, deleteProduct, saveCustomImage } from '../db/indexeddb';

export class ProductFormModal {
  private container: HTMLElement;
  private currentProduct: Product | null = null;
  private currentImages: string[] = [];
  private onSaveCallback: (product: Product) => void;
  private onDeleteCallback: (id: string) => void;

  constructor(
    categories: string[],
    onSave: (product: Product) => void,
    onDelete: (id: string) => void
  ) {
    this.onSaveCallback = onSave;
    this.onDeleteCallback = onDelete;

    this.container = document.createElement('div');
    this.container.id = 'product-crud-modal';
    this.container.className = 'fixed inset-0 z-50 hidden bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto';

    const categoryOptions = categories
      .map((cat) => `<option value="${cat}">${cat}</option>`)
      .join('');

    this.container.innerHTML = `
      <div class="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden my-8">
        <!-- Cabeçalho -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
          <div class="flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-600 text-white">
              ${icons.edit('w-5 h-5')}
            </span>
            <div>
              <h2 id="modal-title" class="text-lg font-black text-slate-800 dark:text-slate-100">
                Editar Produto de Balcão
              </h2>
              <span id="modal-id" class="font-mono text-xs text-slate-400">ID: Novo</span>
            </div>
          </div>
          <button id="modal-close" class="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl transition-colors" aria-label="Fechar">
            ${icons.close('w-5 h-5')}
          </button>
        </div>

        <!-- Formulário -->
        <form id="product-form" class="p-6 space-y-5">
          <!-- Linha 1: Caixa e Código Interno (Destaque Maior) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="block text-xs font-black tracking-wider uppercase text-blue-600 dark:text-blue-400">
                Número da Caixa / Gaveta *
              </label>
              <div class="relative">
                <input type="text" id="input-box" required placeholder="Ex: 940, 10309, 1048B, GAVETA"
                  class="w-full px-4 py-2.5 rounded-xl border-2 border-blue-500/40 focus:border-blue-600 bg-slate-50 dark:bg-slate-900 font-mono text-lg font-black text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-black tracking-wider uppercase text-slate-600 dark:text-slate-300">
                Código Interno da Loja
              </label>
              <input type="text" id="input-internal-code" placeholder="Ex: MU392, MU10309, LT-2340"
                class="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-600 focus:border-blue-600 bg-slate-50 dark:bg-slate-900 font-mono text-lg font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>

          <!-- Linha 2: Categoria e Preço -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="sm:col-span-2 space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Categoria / Seção
              </label>
              <select id="input-category" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                ${categoryOptions}
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Preço Unitário (R$)
              </label>
              <input type="number" step="0.01" min="0" id="input-price" placeholder="0.00"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-sm font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>

          <!-- Linha 3: Descrição Completa -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-600 dark:text-slate-300">
              Descrição e Aplicação da Peça *
            </label>
            <textarea id="input-description" rows="2" required placeholder="Ex: Grampo Superior Bagagito Linha Citroën C3 / C4"
              class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"></textarea>
          </div>

          <!-- Linha 4: Códigos de Referência e Montadoras -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Códigos de Referência (separados por vírgula)
              </label>
              <input type="text" id="input-refcodes" placeholder="Ex: P-185, LF0437, JAHU 08271-9"
                class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Montadoras (separadas por vírgula)
              </label>
              <input type="text" id="input-carmakers" placeholder="Ex: VW, GM, Fiat, Ford, Toyota"
                class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>

          <!-- Galeria de Fotos Multi-Ângulos (Ctrl+V / Drag & Drop) -->
          <div class="space-y-2">
            <label class="block text-xs font-black tracking-wider uppercase text-slate-700 dark:text-slate-300">
              Fotos da Peça (Colar com Ctrl+V ou Arrastar)
            </label>

            <!-- Zona de Drop e Cola -->
            <div id="drop-zone" tabindex="0" class="relative border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 text-center cursor-pointer transition-colors focus:outline-none focus:border-blue-600">
              <input type="file" id="file-input" accept="image/*" multiple class="hidden" />
              <div class="flex flex-col items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400">
                ${icons.camera('w-7 h-7 text-blue-500')}
                <p class="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Clique para anexar, arraste arquivos ou <span class="text-blue-600 dark:text-blue-400 font-black">Cole com Ctrl+V</span>
                </p>
                <p class="text-[11px] text-slate-400">
                  Conversão automática para WebP (quality=96) sobre fundo branco puro
                </p>
              </div>
            </div>

            <!-- Lista de Miniaturas -->
            <div id="thumbnails-list" class="flex flex-wrap gap-2.5 pt-2 min-h-[60px]"></div>
          </div>

          <!-- Rodapé com Botões de Ação -->
          <div class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <div>
              <button type="button" id="btn-delete" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors hidden">
                ${icons.trash('w-4 h-4')}
                <span>Excluir</span>
              </button>
              <button type="button" id="btn-duplicate" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors hidden">
                ${icons.copy('w-4 h-4')}
                <span>Duplicar Peça</span>
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button type="button" id="btn-cancel" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                Cancelar
              </button>
              <button type="submit" id="btn-save" class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md transition-colors">
                ${icons.check('w-4 h-4')}
                <span>Salvar Alterações</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(this.container);
    this.bindEvents();
  }

  private bindEvents() {
    const closeBtn = this.container.querySelector('#modal-close')!;
    closeBtn.addEventListener('click', () => this.close());

    const cancelBtn = this.container.querySelector('#btn-cancel')!;
    cancelBtn.addEventListener('click', () => this.close());

    const form = this.container.querySelector('#product-form') as HTMLFormElement;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSave();
    });

    const deleteBtn = this.container.querySelector('#btn-delete')!;
    deleteBtn.addEventListener('click', () => {
      if (this.currentProduct && confirm('Deseja realmente excluir esta peça do catálogo?')) {
        this.onDeleteCallback(this.currentProduct.id);
        deleteProduct(this.currentProduct.id);
        this.close();
      }
    });

    const duplicateBtn = this.container.querySelector('#btn-duplicate')!;
    duplicateBtn.addEventListener('click', () => {
      if (this.currentProduct) {
        this.openNew({
          ...this.currentProduct,
          id: `custom_${Date.now()}`,
          description: `[CÓPIA] ${this.currentProduct.description}`,
          isCustom: true
        });
      }
    });

    // Upload & Dropzone
    const dropZone = this.container.querySelector('#drop-zone')!;
    const fileInput = this.container.querySelector('#file-input') as HTMLInputElement;

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async () => {
      if (fileInput.files) {
        for (let i = 0; i < fileInput.files.length; i++) {
          await this.processImageFile(fileInput.files[i]);
        }
      }
      fileInput.value = '';
    });

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-blue-600', 'bg-blue-50/20');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-blue-600', 'bg-blue-50/20');
    });

    dropZone.addEventListener('drop', async (e) => {
      const dragEv = e as DragEvent;
      dragEv.preventDefault();
      dropZone.classList.remove('border-blue-600', 'bg-blue-50/20');

      if (dragEv.dataTransfer?.files) {
        for (let i = 0; i < dragEv.dataTransfer.files.length; i++) {
          await this.processImageFile(dragEv.dataTransfer.files[i]);
        }
      }
    });

    // Suporte Universal a Ctrl+V no Modal
    this.container.addEventListener('paste', async (e) => {
      const pasteEv = e as ClipboardEvent;
      const items = pasteEv.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            pasteEv.preventDefault();
            await this.processImageFile(file);
          }
        }
      }
    });
  }

  private async processImageFile(fileOrBlob: Blob | File) {
    try {
      const converted = await convertBlobToWebP(fileOrBlob, 0.96);
      await saveCustomImage(converted.sha256, converted.dataUrl);
      this.currentImages.push(converted.dataUrl);
      this.renderThumbnails();
    } catch (err) {
      alert('Erro ao converter imagem para WebP: ' + err);
    }
  }

  private renderThumbnails() {
    const list = this.container.querySelector('#thumbnails-list')!;
    list.innerHTML = '';

    if (this.currentImages.length === 0) {
      list.innerHTML = `<span class="text-xs text-slate-400 italic">Nenhuma foto anexada. Use Ctrl+V para colar.</span>`;
      return;
    }

    this.currentImages.forEach((imgUrl, idx) => {
      const thumb = document.createElement('div');
      thumb.className = 'relative w-16 h-16 rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden bg-white shadow-sm group';
      thumb.innerHTML = `
        <img src="${imgUrl}" class="w-full h-full object-contain p-1" />
        <button type="button" class="btn-remove-thumb absolute top-0.5 right-0.5 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity" data-idx="${idx}" title="Remover Foto">
          ${icons.close('w-3 h-3')}
        </button>
      `;

      const removeBtn = thumb.querySelector('.btn-remove-thumb')!;
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.currentImages.splice(idx, 1);
        this.renderThumbnails();
      });

      list.appendChild(thumb);
    });
  }

  public openEdit(product: Product) {
    this.currentProduct = product;
    this.currentImages = [...(product.images || [])];

    const titleEl = this.container.querySelector('#modal-title')!;
    titleEl.textContent = 'Editar Peça de Balcão';

    const idEl = this.container.querySelector('#modal-id')!;
    idEl.textContent = `ID: ${product.id}`;

    (this.container.querySelector('#input-box') as HTMLInputElement).value = product.boxNumber || '';
    (this.container.querySelector('#input-internal-code') as HTMLInputElement).value = product.internalCode || '';
    (this.container.querySelector('#input-category') as HTMLSelectElement).value = product.category || '';
    (this.container.querySelector('#input-description') as HTMLTextAreaElement).value = product.description || '';
    (this.container.querySelector('#input-refcodes') as HTMLInputElement).value = (product.refCodes || []).join(', ');
    (this.container.querySelector('#input-carmakers') as HTMLInputElement).value = (product.carmakers || []).join(', ');
    (this.container.querySelector('#input-price') as HTMLInputElement).value = product.price !== null && product.price !== undefined ? String(product.price) : '';

    this.container.querySelector('#btn-delete')?.classList.remove('hidden');
    this.container.querySelector('#btn-duplicate')?.classList.remove('hidden');

    this.renderThumbnails();
    this.container.classList.remove('hidden');
  }

  public openNew(preset?: Partial<Product>) {
    this.currentProduct = null;
    this.currentImages = preset?.images ? [...preset.images] : [];

    const titleEl = this.container.querySelector('#modal-title')!;
    titleEl.textContent = 'Cadastrar Nova Peça no Balcão';

    const idEl = this.container.querySelector('#modal-id')!;
    idEl.textContent = 'ID: Novo (Automático)';

    (this.container.querySelector('#input-box') as HTMLInputElement).value = preset?.boxNumber || '';
    (this.container.querySelector('#input-internal-code') as HTMLInputElement).value = preset?.internalCode || '';
    (this.container.querySelector('#input-category') as HTMLSelectElement).value = preset?.category || '';
    (this.container.querySelector('#input-description') as HTMLTextAreaElement).value = preset?.description || '';
    (this.container.querySelector('#input-refcodes') as HTMLInputElement).value = (preset?.refCodes || []).join(', ');
    (this.container.querySelector('#input-carmakers') as HTMLInputElement).value = (preset?.carmakers || []).join(', ');
    (this.container.querySelector('#input-price') as HTMLInputElement).value = preset?.price !== null && preset?.price !== undefined ? String(preset.price) : '';

    this.container.querySelector('#btn-delete')?.classList.add('hidden');
    this.container.querySelector('#btn-duplicate')?.classList.add('hidden');

    this.renderThumbnails();
    this.container.classList.remove('hidden');
  }

  public close() {
    this.container.classList.add('hidden');
    this.currentProduct = null;
    this.currentImages = [];
  }

  private async handleSave() {
    const boxNumber = (this.container.querySelector('#input-box') as HTMLInputElement).value.trim();
    const internalCode = (this.container.querySelector('#input-internal-code') as HTMLInputElement).value.trim();
    const category = (this.container.querySelector('#input-category') as HTMLSelectElement).value;
    const description = (this.container.querySelector('#input-description') as HTMLTextAreaElement).value.trim();
    const rawRefCodes = (this.container.querySelector('#input-refcodes') as HTMLInputElement).value.trim();
    const rawCarmakers = (this.container.querySelector('#input-carmakers') as HTMLInputElement).value.trim();
    const priceVal = (this.container.querySelector('#input-price') as HTMLInputElement).value.trim();

    const refCodes = rawRefCodes ? rawRefCodes.split(',').map((s) => s.trim()).filter(Boolean) : [];
    const carmakers = rawCarmakers ? rawCarmakers.split(',').map((s) => s.trim()).filter(Boolean) : ['Universal'];
    const price = priceVal ? parseFloat(priceVal) : null;

    let thumb = this.currentImages[0] || '/catalog-images/placeholder.webp';
    if (this.currentImages[0] && this.currentImages[0].startsWith('data:')) {
      // Se for imagem nova criada client-side, gerar miniatura otimizada
      try {
        const fetchRes = await fetch(this.currentImages[0]);
        const blob = await fetchRes.blob();
        thumb = await createThumbnailWebP(blob, 0.90, 320);
      } catch {
        thumb = this.currentImages[0];
      }
    }

    const id = this.currentProduct ? this.currentProduct.id : `custom_${Date.now()}`;
    const sourceDoc = this.currentProduct ? this.currentProduct.sourceDoc : 'Cadastro Manual de Balcão';

    const updatedProduct: Product = {
      id,
      sourceDoc,
      category,
      boxNumber,
      internalCode,
      refCodes,
      description,
      cleanDescription: description,
      carmakers,
      technicalSpecs: this.currentProduct?.technicalSpecs || [],
      images: this.currentImages,
      thumbnail: thumb,
      needsDescriptionReview: false,
      price,
      updatedAt: new Date().toISOString(),
      userEdited: true,
      isCustom: this.currentProduct ? this.currentProduct.isCustom : true
    };

    await saveProduct(updatedProduct);
    this.onSaveCallback(updatedProduct);
    this.close();
  }
}
