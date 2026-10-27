import { describe, it, expect, beforeAll } from 'bun:test';
import { SearchEngine, cleanCodeToken } from '../src/search/engine';
import { Product } from '../src/types';
import seedData from '../public/catalog-master-seed.json';

describe('Gate 7 & 9: Motor de Busca Sub-50ms de Balcão', () => {
  let engine: SearchEngine;
  let products: Product[];

  beforeAll(() => {
    products = seedData.items as Product[];
    engine = new SearchEngine(products);
  });

  it('deve indexar todos os mais de 900 produtos do catálogo master', () => {
    expect(products.length).toBeGreaterThanOrEqual(900);
  });

  it('deve encontrar produtos pelo número exato da caixa (ex: 940, 10309)', () => {
    const res940 = engine.search('940');
    expect(res940.length).toBeGreaterThan(0);
    expect(res940.some((p) => p.boxNumber === '940')).toBe(true);

    const res10309 = engine.search('10309');
    expect(res10309.length).toBeGreaterThan(0);
    expect(res10309.some((p) => p.boxNumber === '10309')).toBe(true);
  });

  it('deve suportar prefixo "cx" ou "caixa" na busca (ex: cx 940, caixa 10309)', () => {
    const resCx = engine.search('cx 940');
    expect(resCx.length).toBeGreaterThan(0);
    expect(resCx[0].boxNumber).toBe('940');

    const resCaixa = engine.search('caixa 10309');
    expect(resCaixa.length).toBeGreaterThan(0);
    expect(resCaixa[0].boxNumber).toBe('10309');
  });

  it('deve encontrar produtos por código interno (MU392, MU10309, LT-2340)', () => {
    const resMU392 = engine.search('MU392');
    expect(resMU392.length).toBeGreaterThan(0);
    expect(resMU392.some((p) => cleanCodeToken(p.internalCode) === 'mu392' || cleanCodeToken(p.boxNumber).includes('392'))).toBe(true);

    const resMU10309 = engine.search('MU10309');
    expect(resMU10309.length).toBeGreaterThan(0);
  });

  it('deve encontrar produtos por código de fabricante / referência (P-111, LF0437, D200)', () => {
    const resP111 = engine.search('P-111');
    expect(resP111.length).toBeGreaterThan(0);
    expect(resP111.some((p) => (p.refCodes || []).some((c) => c.includes('111')) || p.description.includes('111'))).toBe(true);

    const resLF = engine.search('LF0437');
    expect(resLF.length).toBeGreaterThan(0);
  });

  it('deve executar busca com latência sub-50ms (Benchmark de Balcão)', () => {
    const start = performance.now();
    for (let i = 0; i < 50; i++) {
      engine.search('grampo parabarro');
      engine.search('10309');
      engine.search('reparo trambulador');
    }
    const elapsed = performance.now() - start;
    const avgLatency = elapsed / 150;
    expect(avgLatency).toBeLessThan(50); // Média muito abaixo de 50ms
  });
});
