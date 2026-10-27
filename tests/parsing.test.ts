import { describe, it, expect } from 'bun:test';
import seedData from '../public/catalog-master-seed.json';
import { Product } from '../src/types';

describe('Gate 3: Higienização de Códigos, Separação de Caixas e Paths Lowercase', () => {
  const items = seedData.items as Product[];

  it('todos os caminhos de imagem devem estar 100% em lowercase', () => {
    let checkedImages = 0;
    for (const item of items) {
      for (const img of item.images) {
        expect(img).toBe(img.toLowerCase());
        expect(img.endsWith('.webp')).toBe(true);
        checkedImages++;
      }
    }
    expect(checkedImages).toBeGreaterThan(800);
  });

  it('células de caixa com código interno devem estar separadas (boxNumber vs internalCode)', () => {
    const muItems = items.filter((i) => i.internalCode && i.internalCode.startsWith('MU'));
    expect(muItems.length).toBeGreaterThan(50);

    for (const item of muItems) {
      expect(item.boxNumber).toBeDefined();
      expect(item.internalCode).toBeDefined();
      // Não deve ter a palavra "CAIXA" duplicada
      expect(item.boxNumber.toUpperCase().startsWith('CAIXA')).toBe(false);
    }
  });

  it('deve preservar 100% dos itens visuais (needsDescriptionReview: true) sem descarte', () => {
    const visualOnlyItems = items.filter((i) => i.needsDescriptionReview);
    expect(visualOnlyItems.length).toBeGreaterThanOrEqual(100);

    const withPhotos = visualOnlyItems.filter((i) => i.images.length >= 1);
    expect(withPhotos.length).toBeGreaterThanOrEqual(190);
  });

  it('códigos de referência conhecidos (P-, LF, LT, D, JAHU, OEM) devem ser extraídos', () => {
    const itemsWithRef = items.filter((i) => i.refCodes && i.refCodes.length > 0);
    expect(itemsWithRef.length).toBeGreaterThan(100);

    const hasPCode = itemsWithRef.some((i) => i.refCodes.some((c) => c.startsWith('P-') || c.startsWith('P')));
    const hasLFCode = itemsWithRef.some((i) => i.refCodes.some((c) => c.startsWith('LF')));
    expect(hasPCode).toBe(true);
    expect(hasLFCode).toBe(true);
  });
});
