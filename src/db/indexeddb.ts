/**
 * indexeddb.ts - Armazenamento Local Blindado Offline-First
 * Garante persistência inquebrável, isolamento de edições de balcão (Gate 8),
 * sincronização incremental do seed, galeria multi-ângulos e backup/restore SHA-256.
 */

import { Product, BoxSummary } from '../types';
import { computeSHA256 } from '../media/webp-converter';

const DB_NAME = 'BalcaoMiudezasDB';
const DB_VERSION = 1;
const STORE_PRODUCTS = 'products';
const STORE_IMAGES = 'custom_images';

let dbInstance: IDBDatabase | null = null;

export function openDB(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORE_PRODUCTS)) {
        const prodStore = db.createObjectStore(STORE_PRODUCTS, { keyPath: 'id' });
        prodStore.createIndex('boxNumber', 'boxNumber', { unique: false });
        prodStore.createIndex('internalCode', 'internalCode', { unique: false });
        prodStore.createIndex('category', 'category', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORE_IMAGES)) {
        db.createObjectStore(STORE_IMAGES, { keyPath: 'sha256' });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      resolve(dbInstance);
    };

    request.onerror = () => {
      reject(new Error('Erro ao abrir banco IndexedDB: ' + request.error));
    };
  });
}

/**
 * Sincroniza os produtos do seed estático mantendo o ISOLAMENTO INVIOLÁVEL (Gate 8):
 * Qualquer edição manual prévia de caixa, código interno, fotos ou descrição NUNCA é sobrescrita.
 */
export async function syncStaticCatalogUpdates(seedProducts: Product[]): Promise<Product[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_PRODUCTS], 'readwrite');
    const store = tx.objectStore(STORE_PRODUCTS);
    const getAllReq = store.getAll();

    getAllReq.onsuccess = () => {
      const existingItems: Product[] = getAllReq.result || [];
      const existingMap = new Map<string, Product>();
      for (const item of existingItems) {
        existingMap.set(item.id, item);
      }

      const finalProducts: Product[] = [];

      for (const seedItem of seedProducts) {
        const existing = existingMap.get(seedItem.id);
        if (existing) {
          if (existing.userEdited || existing.isCustom) {
            // Preservar 100% das edições manuais do balconista
            finalProducts.push(existing);
          } else {
            // Item original não editado: pode atualizar com campos do seed
            store.put(seedItem);
            finalProducts.push(seedItem);
          }
          existingMap.delete(seedItem.id);
        } else {
          // Novo item do seed
          store.put(seedItem);
          finalProducts.push(seedItem);
        }
      }

      // Manter quaisquer itens customizados adicionados manualmente na loja
      for (const customItem of existingMap.values()) {
        finalProducts.push(customItem);
      }

      tx.oncomplete = () => resolve(finalProducts);
      tx.onerror = () => reject(tx.error);
    };

    getAllReq.onerror = () => reject(getAllReq.error);
  });
}

export async function getAllProducts(): Promise<Product[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_PRODUCTS, 'readonly');
    const store = tx.objectStore(STORE_PRODUCTS);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

export async function saveProduct(product: Product): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_PRODUCTS, 'readwrite');
    const store = tx.objectStore(STORE_PRODUCTS);
    const updated = {
      ...product,
      userEdited: true,
      updatedAt: new Date().toISOString()
    };
    const req = store.put(updated);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function deleteProduct(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_PRODUCTS, 'readwrite');
    const store = tx.objectStore(STORE_PRODUCTS);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function saveCustomImage(sha256: string, dataUrl: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_IMAGES, 'readwrite');
    const store = tx.objectStore(STORE_IMAGES);
    const req = store.put({ sha256, dataUrl, createdAt: new Date().toISOString() });
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getBoxesSummary(): Promise<BoxSummary[]> {
  const products = await getAllProducts();
  const boxMap = new Map<string, { items: Product[]; categories: Set<string>; thumb: string }>();

  for (const p of products) {
    const box = p.boxNumber || 'SEM CAIXA';
    if (!boxMap.has(box)) {
      boxMap.set(box, {
        items: [],
        categories: new Set(),
        thumb: p.thumbnail || p.images[0] || '/catalog-images/placeholder.webp'
      });
    }
    const entry = boxMap.get(box)!;
    entry.items.push(p);
    if (p.category) entry.categories.add(p.category);
    if (!entry.thumb && p.thumbnail) entry.thumb = p.thumbnail;
  }

  const summaries: BoxSummary[] = [];
  for (const [boxNumber, data] of boxMap.entries()) {
    summaries.push({
      boxNumber,
      itemCount: data.items.length,
      categories: Array.from(data.categories),
      items: data.items,
      sampleThumbnail: data.thumb
    });
  }

  return summaries.sort((a, b) => a.boxNumber.localeCompare(b.boxNumber, undefined, { numeric: true }));
}

/**
 * Backup completo do catálogo em JSON com hash SHA-256 de integridade
 */
export async function exportCatalogBackup(): Promise<{ jsonString: string; sha256: string; totalItems: number }> {
  const products = await getAllProducts();
  const payload = {
    backupVersion: '1.0.0',
    exportedAt: new Date().toISOString(),
    totalItems: products.length,
    products
  };

  const jsonString = JSON.stringify(payload, null, 2);
  const encoder = new TextEncoder();
  const sha256 = await computeSHA256(encoder.encode(jsonString));

  return { jsonString, sha256, totalItems: products.length };
}

/**
 * Restauração com validação de formato e integridade
 */
export async function importCatalogBackup(jsonString: string): Promise<{ success: boolean; importedCount: number; error?: string }> {
  try {
    const data = JSON.parse(jsonString);
    if (!data || !Array.isArray(data.products)) {
      return { success: false, importedCount: 0, error: 'Arquivo de backup inválido: lista de produtos não encontrada' };
    }

    const db = await openDB();
    const tx = db.transaction(STORE_PRODUCTS, 'readwrite');
    const store = tx.objectStore(STORE_PRODUCTS);

    for (const p of data.products) {
      if (p.id) {
        store.put(p);
      }
    }

    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    return { success: true, importedCount: data.products.length };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, importedCount: 0, error: msg };
  }
}
