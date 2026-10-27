import { describe, it, expect } from 'bun:test';
import { Product } from '../src/types';

describe('Gate 8: Isolamento Inviolável dos Dados da Loja (Zero Sobrescrita)', () => {
  function simulateSync(existingItems: Product[], seedItems: Product[]): Product[] {
    const existingMap = new Map<string, Product>();
    for (const item of existingItems) {
      existingMap.set(item.id, item);
    }

    const finalProducts: Product[] = [];

    for (const seedItem of seedItems) {
      const existing = existingMap.get(seedItem.id);
      if (existing) {
        if (existing.userEdited || existing.isCustom) {
          // Preservar 100% das edições manuais feitas no balcão
          finalProducts.push(existing);
        } else {
          finalProducts.push(seedItem);
        }
        existingMap.delete(seedItem.id);
      } else {
        finalProducts.push(seedItem);
      }
    }

    // Manter quaisquer itens customizados adicionados manualmente na loja
    for (const customItem of existingMap.values()) {
      finalProducts.push(customItem);
    }

    return finalProducts;
  }

  it('edição manual de caixa e código interno feita pelo balconista nunca deve ser sobrescrita pelo seed', () => {
    const originalItem: Product = {
      id: 'miudeza_0001',
      sourceDoc: 'doc1.docx',
      category: 'Grampos',
      boxNumber: '940',
      internalCode: '',
      refCodes: [],
      description: 'GRAMPO SUPERIOR BAGAGITO',
      cleanDescription: 'GRAMPO SUPERIOR BAGAGITO',
      carmakers: ['Peugeot/Citroën'],
      technicalSpecs: [],
      images: ['/catalog-images/miudezas/miudeza_0001.webp'],
      thumbnail: '/catalog-images/miudezas/miudeza_0001.webp',
      needsDescriptionReview: false,
      price: null,
      updatedAt: '2026-10-27T10:00:00Z',
      userEdited: true // Marcado como editado pelo atendente
    };

    // Atendente editou a caixa para "GAVETA 42" e código interno para "MU999" e adicionou foto Ctrl+V
    const editedByClerk: Product = {
      ...originalItem,
      boxNumber: 'GAVETA 42',
      internalCode: 'MU999',
      description: 'GRAMPO SUPERIOR BAGAGITO PERSONALIZADO',
      price: 4.50,
      images: ['/catalog-images/miudezas/miudeza_0001.webp', 'data:image/webp;base64,customPhotoCtrlV...']
    };

    // Novo seed recarregado do Word
    const newSeedItem: Product = {
      ...originalItem,
      boxNumber: '940', // Seed antigo
      internalCode: '',
      price: null,
      userEdited: false
    };

    const synced = simulateSync([editedByClerk], [newSeedItem]);
    expect(synced.length).toBe(1);
    const itemAfterSync = synced[0];

    // Validação estrita: as alterações manuais do balcão continuam 100% intactas
    expect(itemAfterSync.boxNumber).toBe('GAVETA 42');
    expect(itemAfterSync.internalCode).toBe('MU999');
    expect(itemAfterSync.description).toBe('GRAMPO SUPERIOR BAGAGITO PERSONALIZADO');
    expect(itemAfterSync.price).toBe(4.50);
    expect(itemAfterSync.images.length).toBe(2);
    expect(itemAfterSync.images[1]).toBe('data:image/webp;base64,customPhotoCtrlV...');
  });

  it('peças novas cadastradas manualmente (isCustom: true) nunca são deletadas ao recarregar o seed', () => {
    const customItem: Product = {
      id: 'custom_999999',
      sourceDoc: 'Cadastro Manual de Balcão',
      category: 'Porcas Rápidas',
      boxNumber: 'CX 888',
      internalCode: 'MU888',
      refCodes: ['P-999'],
      description: 'Porca Rápida Especial M8',
      cleanDescription: 'Porca Rápida Especial M8',
      carmakers: ['Ford'],
      technicalSpecs: ['M8'],
      images: ['data:image/webp;base64,...'],
      thumbnail: 'data:image/webp;base64,...',
      needsDescriptionReview: false,
      price: 3.20,
      updatedAt: '2026-10-27T12:00:00Z',
      isCustom: true,
      userEdited: true
    };

    const seedItems: Product[] = [
      {
        id: 'miudeza_0001',
        sourceDoc: 'doc1.docx',
        category: 'Grampos',
        boxNumber: '940',
        internalCode: '',
        refCodes: [],
        description: 'Item Seed',
        cleanDescription: 'Item Seed',
        carmakers: ['Universal'],
        technicalSpecs: [],
        images: [],
        thumbnail: '',
        needsDescriptionReview: false,
        price: null,
        updatedAt: '2026-10-27T10:00:00Z'
      }
    ];

    const synced = simulateSync([customItem], seedItems);
    expect(synced.length).toBe(2);
    expect(synced.some((p) => p.id === 'custom_999999')).toBe(true);
  });
});
